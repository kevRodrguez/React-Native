import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const TabsLayout = () => {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: 'blue',
            //headerShown: false, //stack
            tabBarActiveBackgroundColor: '#f0f0f0',
            tabBarInactiveBackgroundColor: 'white',

        }}>
            <Tabs.Screen
                name="(stack)"
                options={{
                    title: 'Stack',
                    tabBarIcon: ({ color }) => <Ionicons size={28} name="person-add-outline" color={color} />,
                    animation: 'shift',
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="home/index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <Ionicons size={28} name="home-outline" color={color} />,
                    animation: 'shift',
                }}
            />
            <Tabs.Screen
                name="favorites/index"
                options={{
                    title: 'Favorites',
                    tabBarIcon: ({ color }) => <Ionicons size={28} name="star-outline" color={color} />,
                    animation: 'shift',
                }}
            />

        </Tabs>


    );
}

export default TabsLayout