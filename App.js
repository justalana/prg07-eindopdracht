import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { LittleLibraries } from './contexts/Libraries';

import HomeScreen from './screens/HomeScreen';
import MapScreen from "./screens/MapScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <LittleLibraries>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name="Home" component={HomeScreen}/>
                    <Stack.Screen name="Map" component={MapScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </LittleLibraries>
    );
}
