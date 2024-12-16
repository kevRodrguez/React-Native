import { View, Text } from 'react-native'
import React from 'react'
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import CustomDrawer from '../../components/shared/CustomDrawer';


const DrawerLayout = () => {
    return (
        <Drawer
            //drawer content remplaza Drawer.Screen y deja de renderizarlo.
            drawerContent={CustomDrawer}

            screenOptions={{
                overlayColor: 'rgba(0,0,0,0.5)',
                drawerActiveTintColor: 'indigo',
                headerShadowVisible: false,
                headerShown: false,

                drawerStyle: {
                    backgroundColor: 'white',
                    width: '65%',
                },

                sceneStyle: {
                    backgroundColor: 'white',
                },
                
            }}
        >
            <Drawer.Screen
                name="user/index" // This is the name of the page and must match the url from root
                options={{
                    drawerLabel: 'User',
                    title: 'Usuario',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons
                            name="person"
                            size={size}
                            color={color} />
                    ),
                    
                }}
            />
            <Drawer.Screen
                name="schedule/index" // This is the name of the page and must match the url from root
                options={{
                    drawerLabel: 'Horario',
                    title: 'Horarios',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons
                            name="calendar"
                            size={size}
                            color={color} />
                    ),
                }}
            />

            <Drawer.Screen
                name="(tabs)" // This is the name of the page and must match the url from root
                options={{
                    headerShown: false,
                    drawerLabel: 'Stack & Tabs',
                    title: 'Stacks',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons
                            name="file-tray-stacked"
                            size={size}
                            color={color} />
                    ),
                }}
            />
        </Drawer>
    )
}

export default DrawerLayout