import React, {useState, useEffect, useRef, useContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import NavBar from "../components/NavBar";
import {SafeAreaView} from 'react-native-safe-area-context';
import { LibrariesContext } from '../contexts/Libraries';

export default function MapScreen() {
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
            <View style={styles.container}>
                {initialRegion ? (
                    <MapView
                        style={styles.map}
                        showsUserLocation={true}
                        initialRegion={initialRegion}
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
});
