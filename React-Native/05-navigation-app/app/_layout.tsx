import { View, Text, Platform, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import "./global.css";
import { Slot, SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as NavigationBar from 'expo-navigation-bar';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

    //cambiar el color de barra de estado (hora, wifi, bateria) en android e ios
    useEffect(() => {
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor('dark-content');
            NavigationBar.setBackgroundColorAsync('#fff');
        }
        if (Platform.OS === 'ios') {
            StatusBar.setBarStyle('dark-content');
        }
    }, []);

    const [fontsLoaded, error] = useFonts({
        'WorkSans-Black': require('../assets/fonts/WorkSans-Black.ttf'),
        'WorkSans-Light': require('../assets/fonts/WorkSans-Light.ttf'),
        'WorkSans-Medium': require('../assets/fonts/WorkSans-Medium.ttf'),
    });

    useEffect(() => {
        if (error) throw error;

        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, error]);

    if (!fontsLoaded && !error) {
        return null;
    }


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Slot />
        </GestureHandlerRootView>
    );


    //return <Slot />
    //return < Stack />
}

export default RootLayout