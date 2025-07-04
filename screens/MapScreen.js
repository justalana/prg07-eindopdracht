import React, {useState, useEffect, useRef, useContext} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';

import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

import NavBar from "../components/NavBar";
import { LibrariesContext } from '../components/Libraries';
import { ThemeContext } from '../components/ThemeContext';
import darkMapStyle from '../styles/darkMapStyle';

export default function MapScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const mapRef = useRef(null);

    const [currentLocation, setCurrentLocation] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const { libraries } = useContext(LibrariesContext)
    const watchId = useRef();

    const { isDarkMode } = useContext(ThemeContext);
    const styles = getStyles(isDarkMode);

    useEffect(() => {
        if (route.params?.selectedLibrary && initialRegion && mapRef.current) {
            const timeout = setTimeout(() => {
                const { latitude, longitude } = route.params.selectedLibrary;

                const region = {
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                };

                mapRef.current.animateToRegion(region, 1000);
            }, 500);

            return () => clearTimeout(timeout);
        }
    }, [route.params?.selectedLibrary, initialRegion]);

    useEffect(() => {
        const requestPermission = async () => {
            const {granted} = await Location.requestForegroundPermissionsAsync();

            if (!granted) {
                setErrorMsg("Access denied");
                return;
            }

            try {
                watchId.current = await Location.watchPositionAsync(
                    {
                        accuracy: Location.Accuracy.High,
                        timeInterval: 5000,
                        distanceInterval: 5,
                    },
                    (newLocation) => {
                        const coords = {
                            latitude: newLocation.coords.latitude,
                            longitude: newLocation.coords.longitude,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        };
                        setCurrentLocation(coords);
                        if (!initialRegion) setInitialRegion(coords);
                    }
                );
            } catch {
                setErrorMsg("Something went wrong");
            }
        };

        requestPermission();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('LocationsList')}
                    style={styles.headerButton}
                >
                    <Icon name="list" size={24} color="#1d140d" />
                    <Text style={styles.headerButtonText}>Lijst</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                {initialRegion ? (
                        <MapView
                            ref={mapRef}
                            style={styles.map}
                            showsUserLocation={true}
                            followsUserLocation={true}
                            initialRegion={initialRegion}
                            customMapStyle={isDarkMode ? darkMapStyle : []}
                        >


                    {libraries.length > 0 &&
                            libraries.map((item) => (
                                <Marker
                                    key={item.id}
                                    coordinate={{
                                        latitude: item.latitude,
                                        longitude: item.longitude,
                                    }}
                                    title={item.name}
                                    description={item.address}
                                    pinColor= {isDarkMode ? '#79a78b' : "#9d674d"}
                                />
                            ))}
                    </MapView>
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Locatie ophalen...</Text>
                    </View>
                )}
            </View>
            <NavBar />
        </SafeAreaView>
    );

}

const getStyles = (isDarkMode) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: isDarkMode ? '#1d140d' : '#ede2d8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    headerContainer: {
        position: 'absolute',
        bottom: 100,
        right: 16,
        zIndex: 10,
    },
    headerButton: {
        backgroundColor: isDarkMode ? 'rgba(40,40,40,0.9)' : 'rgba(255,255,255,0.9)',
        borderRadius: 8,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#1d140d',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    headerButtonText: {
        marginLeft: 6,
        fontSize: 16,
        color: isDarkMode ? '#ede2d8' : '#1d140d',
        fontWeight: '500',
    },
    loadingText: {
        color: isDarkMode ? '#ede2d8' : '#1d140d',
    },
});

