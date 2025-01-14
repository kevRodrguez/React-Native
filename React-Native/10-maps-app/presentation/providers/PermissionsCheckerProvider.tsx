import React, { PropsWithChildren, useEffect } from 'react'

import { PermissionStatus } from '@/infraestructure/interfaces/location'
import { router } from 'expo-router'
import { usePermissionsStore } from '../store/usePermissions'
import { AppState } from 'react-native'

const PermissionsCheckerProvider = ({ children }: PropsWithChildren) => {

    const { locationStatus, checkLocationPermission } = usePermissionsStore()

    useEffect(() => {
        if (locationStatus === PermissionStatus.GRANTED) {
            console.log('Location permission granted')
            router.replace('/map')
        }
        else if (locationStatus != PermissionStatus.CHECKING) {
            console.log('Location permission checking')
            router.replace('/permissions')
        }
    }, [locationStatus])

    useEffect(() => {
        checkLocationPermission()
    }, [])

    //TODO: estar pendiente cuando el estado de la app cambia
    useEffect(() => {
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'active') {
                checkLocationPermission()
            }

            console.log('nextAppState:', nextAppState)
        })

        return () => {
            subscription.remove()
        }

    }, [])




    return <>{children}</>
}

export default PermissionsCheckerProvider