import React, { useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  useWindowDimensions,
  useColorScheme,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

import { ThemedText } from '@/presentation/theme/components/ThemedText';
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput';
import ThemedButton from '@/presentation/theme/components/ThemedButton';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import ThemedLink from '@/presentation/theme/components/ThemedLink';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';


const LoginScreen = () => {
  const primaryColor = useThemeColor({}, 'primary');
  const textColor = useThemeColor({}, 'text');
  const colorScheme = useColorScheme();

  const { login } = useAuthStore();


  // Secure Text State for Password Field
  const [secureText, setSecureText] = useState(true);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });



  //para bloquear el boton de login
  const [isPosting, setIsPosting] = useState(false)

  const onLogin = async () => {
    const { email, password } = form;
    console.log(email, password)

    if (form.email.length === 0 || form.password.length === 0) {
      return
    }

    setIsPosting(true)
    const wasSuccess = await login(email, password);
    setIsPosting(false);

    if (wasSuccess) {
      router.replace('/(products-app)/(home)')
      return;
    }

    //Alert.alert('Error', 'Credenciales incorrectas')
  }



  return (
    <View className="flex-1">
      {/* Gradient Background */}
      <LinearGradient
        colors={
          colorScheme === 'dark'
            ? [primaryColor, '#5e2ced', 'black']
            : ['#3D64F4', '#17c7bd', 'white']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 0.3, y: 0.4 }}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      />

      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
          {/* Character Image */}
          <View className="items-center">
            <Image
              source={require('@/assets/images/loginCharacter.png')}
              className="w-[100%] h-80 mt-[20%]"
              resizeMode="contain"
            />
          </View>

          {/* Login Text */}
          <View className="mb-5 pt-5">
            <ThemedText className='pt-2' type="title">Ingresar</ThemedText>
            <ThemedText className="text-gray-500 dark:text-white">
              Por favor ingrese para continuar
            </ThemedText>
          </View>

          {/* Input Fields and Buttons */}
          <View className="mt-5">
            <ThemedTextInput
              placeholder="Correo Electrónico"
              keyboardType="email-address"
              autoCapitalize="none"
              icon="mail-outline"

              value={form.email}
              onChangeText={(text) => setForm({ ...form, email: text })}
            />
            <ThemedTextInput
              placeholder="Contraseña"
              secureTextEntry={secureText}
              autoCapitalize="none"
              icon={secureText ? "lock-closed-outline" : "lock-open-outline"}
              rightIcon={secureText ? "eye-off-outline" : "eye-outline"}
              onRightIconPress={() => setSecureText(!secureText)}

              value={form.password}
              onChangeText={(text) => setForm({ ...form, password: text })}
            />

            <ThemedButton
              icon="arrow-forward-outline"
              onPress={onLogin}
              disabled={isPosting}
            >
              Ingresar
            </ThemedButton>

            {/* Registration Link */}
            <View className="flex-row justify-center items-center mt-5">
              <ThemedText style={{ color: textColor }}>
                ¿No tienes una cuenta?
              </ThemedText>

              <ThemedLink onPress={() => { router.push('/auth/register') }} style={{ marginHorizontal: 5 }}>
                Registrarse
              </ThemedLink>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
