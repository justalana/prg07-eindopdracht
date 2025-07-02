import React, {useState, useEffect, useRef, useContext} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import NavBar from "../components/NavBar";
import {SafeAreaView} from 'react-native-safe-area-context';
import { LibrariesContext } from '../components/Libraries';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from "@react-navigation/native";

export default function MapScreen() {
    const navigation = useNavigation();
    const [currentLocation, setCurrentLocation] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const { libraries } = useContext(LibrariesContext)
    const watchId = useRef();

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
                    <Icon name="list" size={24} color="#333" />
                    <Text style={styles.headerButtonText}>Lijst</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                {initialRegion ? (
                    <MapView
                        style={styles.map}
                        showsUserLocation={true}
                        followsUserLocation={true}
                        region={currentLocation}
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
                                    pinColor="red"
                                />
                            ))}
                    </MapView>
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>📍 Locatie ophalen...</Text>
                    </View>
                )}
            </View>
            <NavBar />
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    headerContainer: {
        position: 'absolute',
        top: 40,
        left: 16,
        right: 16,
        zIndex: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerButton: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 8,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    headerButtonText: {
        marginLeft: 6,
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
});
