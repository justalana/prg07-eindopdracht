import React, { useContext } from 'react';
import {View, Text, ScrollView, StyleSheet, ImageBackground, TouchableOpacity, Image, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import NavBar from '../components/NavBar';
import { ThemeContext } from '../components/ThemeContext';

export default function HomeScreen() {
    const { isDarkMode } = useContext(ThemeContext);
    const styles = getStyles(isDarkMode);

    const backgroundImage = isDarkMode
        ? require('../assets/library_background_dark.jpg')
        : require('../assets/library_background.jpg');

    return (
        <SafeAreaView style={{flex: 1}}>

            <ImageBackground
                source={backgroundImage}
                style={StyleSheet.absoluteFill}
                resizeMode="stretch"
                blurRadius={1}
            />

            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Welkom!</Text>
                    <Text style={styles.subtitle}>Ontdek hier de locaties van Free Little Libraries bij jou in de buurt</Text>
                </View>
                <NavBar/>
            </ScrollView>
        </SafeAreaView>
    );
}

const getStyles = (isDarkMode) => StyleSheet.create({
    backgroundColor: isDarkMode ? '#1d140d' : '#ede2d8',
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    titleContainer: {
        backgroundColor: isDarkMode ? 'rgba(30,30,30,0.8)' : 'rgba(209, 176, 145, 0.7)',
        borderRadius: 10,
        padding: 15,
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        color: isDarkMode ? '#ede2d8' : '#1d140d',
        fontWeight: 'bold',
        marginVertical: 12,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 24,
        color: isDarkMode ? '#ede2d8' : '#1d140d',
    },
});
