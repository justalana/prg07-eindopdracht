import {StatusBar} from 'expo-status-bar';
import {Settings, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {LittleLibraries} from './components/Libraries';
import {ThemeProvider} from "./components/ThemeContext";

import HomeScreen from './screens/HomeScreen';
import MapScreen from "./screens/MapScreen";
import LocationsListScreen from "./screens/LocationsListScreen";
import SettingsScreen from "./screens/SettingsScreen";


const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <LittleLibraries>
                    <NavigationContainer>
                        <Stack.Navigator screenOptions={{headerShown: false}}>
                            <Stack.Screen name="Home" component={HomeScreen}/>
                            <Stack.Screen name="Map" component={MapScreen}/>
                            <Stack.Screen name="LocationsList" component={LocationsListScreen}/>
                            <Stack.Screen name="Settings" component={SettingsScreen}/>
                        </Stack.Navigator>
                    </NavigationContainer>
                </LittleLibraries>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
