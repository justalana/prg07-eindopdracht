import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

export default function AppNavigator() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Map')}>
                <Icon name="map" size={32} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
                <Icon name="home" size={32} color="#000" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#79a78b',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        zIndex: 999,
    },
    navItem: {
        flex: 1, // zorgt dat elke knop 1/4 inneemt nu
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
});