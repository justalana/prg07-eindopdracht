import React, {useContext, useEffect} from 'react';
import {View, Text, Switch, StyleSheet, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import { authenticateWithBiometrics } from '../components/Biometrics';
import {ThemeContext} from '../components/ThemeContext';
import NavBar from "../components/NavBar";

export default function SettingsScreen() {
    const {isDarkMode, toggleTheme} = useContext(ThemeContext);
    const styles = getStyles(isDarkMode);
    const navigation = useNavigation();

    useEffect(() => {
        const checkBiometrics = async () => {
            const success = await authenticateWithBiometrics();
            if (!success) {
                Alert.alert(
                    'Toegang geweigerd',
                    'Je hebt je niet kunnen authenticeren.',
                    [{text: 'OK', onPress: () => navigation.navigate('Home')}]
                );
            }
        };

        checkBiometrics();
    }, []);

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.label}>Donkere modus</Text>
                    <Switch
                        value={isDarkMode}
                        onValueChange={toggleTheme}
                        thumbColor={isDarkMode ? '#bbb' : '#fff'}
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                    />
                </View>
            </View>
            <NavBar />
        </SafeAreaView>
    );
}

const getStyles = (isDarkMode) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: isDarkMode ? '#1d140d' : '#ede2d8',
        padding: 20,
        justifyContent: 'center',
    },
    label: {
        fontSize: 18,
        color: isDarkMode ? '#ede2d8' : '#1d140d',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
