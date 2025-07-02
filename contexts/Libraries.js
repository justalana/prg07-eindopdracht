import React, { createContext, useState, useEffect } from "react";
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const url = Constants.expoConfig?.extra?.apiUrl;

export const LibrariesContext = createContext({ libraries: [] });

export const LittleLibraries = ({children}) => {
    const [libraries, setLibraries] = useState([])

    const fetchLibraries = async () => {
        try {
            const result = await fetch(url, {
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!result.ok) throw new Error(`HTTP Error: ${result.status}`);
            const jsonData = await result.json();
            // console.log("Parsed JSON:", jsonData);

            if (!jsonData.libraries) throw new Error("Geen 'libraries' gevonden!");
            setLibraries(jsonData.libraries);
            await AsyncStorage.setItem("libraries", JSON.stringify(jsonData.libraries));
        } catch (e) {
            console.error("Fout bij ophalen data:", e.message);

            try {
                const cached = await AsyncStorage.getItem("libraries");
                if (cached) {
                    setLibraries(JSON.parse(cached));
                    console.log("Offline data geladen uit AsyncStorage");
                }
            } catch (storageError) {
                console.error("Fout bij lezen van cache:", storageError);
            }
        }
    };

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            if (state.isConnected) {
                fetchLibraries();
            } else {
                (async () => {
                    const cached = await AsyncStorage.getItem("libraries");
                    if (cached) {
                        setLibraries(JSON.parse(cached));
                    }
                })();
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <LibrariesContext.Provider value={{ libraries }}>
            {children}
        </LibrariesContext.Provider>
    );
}