import React, { createContext, useState, useEffect } from "react";
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const url = Constants.expoConfig?.extra?.apiUrl;

export const LibrariesContext = createContext({ libraries: [] });

export const LittleLibraries = ({ children }) => {
    const [libraries, setLibraries] = useState([]);

    const loadFromCache = async () => {
        try {
            const cached = await AsyncStorage.getItem("libraries");
            if (cached) {
                setLibraries(JSON.parse(cached));
            }
        } catch (e) {
            console.error("Fout bij laden van cache:", e);
        }
    };

    const fetchLibraries = async () => {
        try {
            const response = await fetch(url, {
                headers: { 'Accept': 'application/json' }
            });

            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

            const jsonData = await response.json();
            if (!jsonData.libraries) throw new Error("Geen 'libraries' gevonden!");

            setLibraries(jsonData.libraries);
            await AsyncStorage.setItem("libraries", JSON.stringify(jsonData.libraries));
        } catch (e) {
            console.error("Fout bij ophalen van online data:", e.message);
            await loadFromCache();
        }
    };

    useEffect(() => {
        const checkConnectionAndLoad = async () => {
            await loadFromCache();

            const state = await NetInfo.fetch();
            if (state.isConnected) {
                await fetchLibraries();
            } else {
                console.log("Geen internet, blijf bij offline data");
            }
        };

        checkConnectionAndLoad();
    }, []);

    return (
        <LibrariesContext.Provider value={{ libraries }}>
            {children}
        </LibrariesContext.Provider>
    );
};
