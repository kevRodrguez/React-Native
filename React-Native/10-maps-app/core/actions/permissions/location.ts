import * as Location from 'expo-location'
import { PermissionStatus } from '@/infraestructure/interfaces/location'
import { Alert, Linking } from 'react-native'

export const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status != 'granted') {
        //TODO MANDAR A LLAMAR UN MANUAL PERMISSION REQUEST
        if (status === 'denied') {
            manualPermissionRequest()
        }
        return PermissionStatus.DENIED
    }
    return PermissionStatus.GRANTED
}

export const checkLocationPermission = async (): Promise<PermissionStatus> => {
    const { status } = await Location.getForegroundPermissionsAsync()

    switch (status) {
        case 'granted':
            return PermissionStatus.GRANTED
        case 'denied':
            return PermissionStatus.DENIED
        default:
            return PermissionStatus.UNDETERMINED
    }
}

const manualPermissionRequest = async () => {
    //lanzar los ajustes de la aplicacion para enviar a la persona que lo active manualmente

    Alert.alert(
        'Permisos de ubicación',
        'Para poder continuar, necesitamos que habilites los permisos de ubicación en la aplicación',
        [
            {
                text: 'Ajustes',
                onPress: () => {
                    //Location.requestForegroundPermissionsAsync()
                    Linking.openSettings()
                }
            },
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancel Pressed'),
                style: 'destructive'
            }
        ]
    )
}