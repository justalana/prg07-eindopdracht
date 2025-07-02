import React from 'react';
import {View, Text, ScrollView, StyleSheet, ImageBackground, TouchableOpacity, Image, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import AppNavigator from '../components/AppNavigator';

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
                <Text style={styles.title}>📚 Free Little Libraries</Text>
                <Text style={styles.subtitle}>Discover, share & enjoy community book spots near you!</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Map')}
                >
                    <Text style={styles.buttonText}>📍 Find Nearby Libraries</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('AddLibrary')}
                >
                    <Text style={styles.buttonText}>➕ Add a New Library</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Favorites')}
                >
                    <Text style={styles.buttonText}>❤️ View Favorites</Text>
                </TouchableOpacity>

                <AppNavigator/>
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
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginVertical: 12,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 24,
        color: '#555',
    },
    button: {
        backgroundColor: '#4a90e2',
        padding: 14,
        borderRadius: 10,
        marginVertical: 8,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});