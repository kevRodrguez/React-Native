import { useEffect } from 'react';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useThemeColor } from '@/hooks/useThemeColor';
import { allRoutes } from '@/constants/Routes';

import "../global.css";
import { ThemeChangerProvider } from '@/presentation/context/ThemeChangerContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  //usar o useThemeColor o usar nativewind
  const backgroundColor = useThemeColor({}, 'background');
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: backgroundColor }}>

      {/* <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}> */}
      <ThemeChangerProvider>

        <Stack
          screenOptions={{
            headerShown: true,
            headerShadowVisible: false,
            contentStyle: { backgroundColor: backgroundColor },
            headerStyle: { backgroundColor: backgroundColor },

          }}
        >
          <Stack.Screen name='index' options={{
            title: '',
          }} />

          {allRoutes.map((route) => (
            <Stack.Screen
              key={route.name}
              name={route.name}
              options={{
                title: route.title,
                headerShown: route.title.includes('Slides') ? false : true,
              }}
            />
          ))}

        </Stack>
      </ThemeChangerProvider>
      {/* </ThemeProvider> */}
    </GestureHandlerRootView>
  );
}
