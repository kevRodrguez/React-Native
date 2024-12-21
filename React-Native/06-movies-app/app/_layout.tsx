import "../global.css";

import { View, Text } from 'react-native';
import React from 'react';

import { QueryClient, QueryClientProvider, } from '@tanstack/react-query';
import { Stack } from "expo-router";

//acces de client
const queryClient = new QueryClient();


const RootLayout = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </QueryClientProvider>

  );
}

export default RootLayout