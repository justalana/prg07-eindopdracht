import React, {useContext, useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemeContext } from '../components/ThemeContext';
import NavBar from "../components/NavBar";
import {LibrariesContext} from '../components/Libraries';

export default function LocationsListScreen() {
    const {libraries} = useContext(LibrariesContext);
    const navigation = useNavigation();
    const [favorites, setFavorites] = useState([]);

    const { isDarkMode } = useContext(ThemeContext);
    const styles = getStyles(isDarkMode);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const storedFavorites = await AsyncStorage.getItem('favorites');
                if (storedFavorites) {
                    setFavorites(JSON.parse(storedFavorites));
                }
            } catch (e) {
                console.error('Fout bij laden favorieten', e);
            }
        };
        loadFavorites();
    }, []);

    const toggleFavorite = async (id) => {
        let updatedFavorites = [];

        if (favorites.includes(id)) {
            updatedFavorites = favorites.filter((favId) => favId !== id);
        } else {
            updatedFavorites = [...favorites, id];
        }

        setFavorites(updatedFavorites);
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={24} color={isDarkMode ? "#ede2d8" : "#333"}/>
                    <Text style={styles.backText}>Terug naar kaart</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                {libraries.map((item) => {
                    const isFavorite = favorites.includes(item.id);

                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.itemContainer}
                            onPress={() => navigation.navigate('Map', {selectedLibrary: item})}
                        >
                            <View style={styles.itemHeader}>
                                <View style={{flex: 1}}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.address}>{item.address}</Text>
                                </View>
                                <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                                    <Icon
                                        name="heart"
                                        size={24}
                                        color={isFavorite ? 'red' : '#ccc'}
                                    />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
            <NavBar/>
        </SafeAreaView>
    );

}

const getStyles = (isDarkMode) => StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderColor: isDarkMode ? '#444' : '#79a78b',
        backgroundColor: isDarkMode ? '#1e1e1e' : '#79a78b',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        marginLeft: 6,
        fontSize: 16,
        color: isDarkMode ? '#ede2d8' : '#1d140d',
    },
    container: {
        padding: 16,
        paddingBottom: 40,
        marginBottom: 40,
        backgroundColor: isDarkMode ? '#121212' : '#70665a',
    },
    itemContainer: {
        backgroundColor: isDarkMode ? '#2a2a2a' : '#ede2d8',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        shadowColor: '#1d140d',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    itemHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: isDarkMode ? '#ede2d8' : '#333',
    },
    address: {
        fontSize: 14,
        color: isDarkMode ? '#aaa' : '#666',
        marginTop: 4,
    },
});
