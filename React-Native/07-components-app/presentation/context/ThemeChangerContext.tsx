import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from "nativewind";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from "@/constants/Colors";



interface ThemeChangerContextType {
    currentTheme: 'light' | 'dark'
    isSystemTheme: boolean

    bgColor: string

    toggleTheme: () => void
    setSystemTheme: () => void
}

const ThemeChangerContext = createContext<ThemeChangerContextType>({} as ThemeChangerContextType)

// Custom hook para acceder al ThemeChangerContext

export const useThemeChangerContext = () => {
    const ThemeChanger = useContext(ThemeChangerContext)

    return ThemeChanger;
}

//Provider; objeto o funcional component que envolverá a los componentes que necesiten acceder al contexto

export const ThemeChangerProvider = ({ children }: PropsWithChildren) => {

    //usar o useThemeColor o usar nativewind
    const { colorScheme, setColorScheme } = useColorScheme();

    const [isDarkMode, setisDarkMode] = useState(colorScheme === 'dark');
    const [isSystemThemeEnabled, setisSystemThemeEnabled] = useState(true);

    const currentTheme = isSystemThemeEnabled ? colorScheme : isDarkMode ? 'dark' : 'light';

    const backgroundColor = isDarkMode
        ? Colors.dark.background
        : Colors.light.background;

    useEffect(() => {
        AsyncStorage.getItem('selected-theme').then((theme) => {
            if (!theme) return;

            setisDarkMode(theme === 'dark');
            setisSystemThemeEnabled(theme === 'system');
            setColorScheme(theme as 'light' | 'dark' | 'system');
        })

    }, [])


    return (

        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

            <ThemeChangerContext.Provider
                value={{
                    currentTheme: currentTheme ?? 'light',
                    isSystemTheme: isSystemThemeEnabled,
                    bgColor: backgroundColor,


                    toggleTheme: async () => {
                        setisDarkMode(!isDarkMode)
                        setColorScheme(isDarkMode ? 'light' : 'dark')
                        setisSystemThemeEnabled(false);

                        //TODO guardar en Storage
                        await AsyncStorage.setItem('selected-theme', isDarkMode ? 'light' : 'dark')

                    },
                    setSystemTheme: async () => {
                        setisSystemThemeEnabled(true)
                        setColorScheme('system')

                        //TODO guardar en Storage
                        await AsyncStorage.setItem('selected-theme', 'system')
                    }
                }}
            >
                {children}
            </ThemeChangerContext.Provider>
        </ThemeProvider>




    )

}