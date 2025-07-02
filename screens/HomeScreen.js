import React from 'react';
import {View, Text, ScrollView, StyleSheet, ImageBackground, TouchableOpacity, Image, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import NavBar from '../components/NavBar';

export default function HomeScreen() {
    return (
        <SafeAreaView style={{flex: 1}}>

            <ImageBackground
                source={require('../assets/librabry_background.jpg')}
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

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    titleContainer: {
        backgroundColor: 'rgba(209, 176, 145, 0.7)',
        borderRadius: 10,
        padding: 15,
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        color: '#1d140d',
        fontWeight: 'bold',
        marginVertical: 12,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 24,
        color: '#1d140d',
    },
});