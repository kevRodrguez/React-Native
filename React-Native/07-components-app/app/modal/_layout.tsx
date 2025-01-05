import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';


const ModalLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="modal-window"
        options={{
          presentation: 'modal', //fullscreenmodal
        }}
      />

      <Stack.Screen
        name="modal-window-2"
        options={{
          presentation: 'modal', //fullscreenmodal
        }}
      />
    </Stack>
  )
}

export default ModalLayout