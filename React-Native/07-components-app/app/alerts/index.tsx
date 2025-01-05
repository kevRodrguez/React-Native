import ThemedButton from '@/presentation/shared/ThemedButton';
import React from 'react';
import { StyleSheet, Button, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const AlertsScreen = () => {
  const createTwoButtonAlert = () =>
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);

  const createThreeButtonAlert = () =>
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Ask me later',
        onPress: () => console.log('Ask me later pressed'),
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);

  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1 justify-center items-center'>
        <ThemedButton
          onPress={createTwoButtonAlert}
          className='mb-5'
        >
          2 - Button Alert
        </ThemedButton>

        <ThemedButton
          onPress={createThreeButtonAlert}
          className='mb-5'
        >
          3 - Button Alert
        </ThemedButton>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};


export default AlertsScreen;
