import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const storedValue = await AsyncStorage.getItem('darkMode');
                if (storedValue !== null) {
                    setIsDarkMode(storedValue === 'true');
                } else {
                    // fallback to system theme
                    const systemTheme = Appearance.getColorScheme();
                    setIsDarkMode(systemTheme === 'dark');
                }
            } catch (error) {
                console.error('Fout bij laden thema:', error);
            }
        };

        loadTheme();
    }, []);

    const toggleTheme = async () => {
        try {
            const newValue = !isDarkMode;
            setIsDarkMode(newValue);
            await AsyncStorage.setItem('darkMode', newValue.toString());
        } catch (error) {
            console.error('Fout bij opslaan thema:', error);
        }
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
