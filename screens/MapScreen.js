import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import AppNavigator from "../components/AppNavigator";
import {SafeAreaView} from 'react-native-safe-area-context';

export default function MapScreen() {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
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

        return () => {
            if (watchId.current) watchId.current.remove();
        };
    }, []);

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                {initialRegion && (
                    <MapView
                        style={styles.map}
                        showsUserLocation={true}
                        followsUserLocation={true}
                        region={currentLocation}
                    />
                )}
                <AppNavigator/>
            </View>
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
