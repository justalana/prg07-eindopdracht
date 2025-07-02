import React, { useContext } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { ThemeContext } from '../components/ThemeContext';

export default function SettingsScreen() {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? '#121212' : '#fff',
            padding: 20,
            justifyContent: 'center',
        },
        label: {
            fontSize: 18,
            color: isDarkMode ? '#fff' : '#000',
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.label}>Donkere modus</Text>
                <Switch
                    value={isDarkMode}
                    onValueChange={toggleTheme}
                    thumbColor={isDarkMode ? '#bbb' : '#fff'}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                />
            </View>
        </View>
    );
}
