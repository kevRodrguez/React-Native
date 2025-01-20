import React, { useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  useWindowDimensions,
  useColorScheme,
  Image,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/presentation/theme/components/ThemedText';
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput';
import ThemedButton from '@/presentation/theme/components/ThemedButton';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import ThemedLink from '@/presentation/theme/components/ThemedLink';
import { router } from 'expo-router';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';

const RegisterScreen = () => {
  const { height } = useWindowDimensions();
  const primaryColor = useThemeColor({}, 'primary');
  const textColor = useThemeColor({}, 'text');
  const colorScheme = useColorScheme();

  const { register } = useAuthStore();

  // Secure Text State for Password Field
  const [secureText, setSecureText] = useState(true);

  //para bloquear el boton de login
  const [isPosting, setIsPosting] = useState(false)

  //State para register
  const [registerAccount, setRegisterAccount] = useState({
    email: '',
    password: '',
    fullName: '',
  });

  const onRegister = async () => {
    const { email, password, fullName } = registerAccount;
    console.log(email, password, fullName)

    if (registerAccount.email.length === 0 || registerAccount.password.length === 0 || registerAccount.fullName.length === 0) {
      return
    }

    setIsPosting(true)
    const wasSuccess = await register(email, password, fullName);
    setIsPosting(false);

    if (wasSuccess) {
      //router.replace('/(products-app)/(home)')
      router.replace('/auth/login')
      return;
    }
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
            <ThemedText className='pt-2' type="title">Crear cuenta</ThemedText>
            <ThemedText className="text-gray-500 dark:text-white">
              Cree su cuenta para Continuar
            </ThemedText>
          </View>

          {/* Input Fields and Buttons */}
          <View className="mt-5">

            <ThemedTextInput
              placeholder="Nombre Completo"
              autoCapitalize="words"
              icon="person-outline"
              onChangeText={(text) => setRegisterAccount({ ...registerAccount, fullName: text })}
            />

            <ThemedTextInput
              placeholder="Correo Electrónico"
              keyboardType="email-address"
              autoCapitalize="none"
              icon="mail-outline"
              onChangeText={(text) => setRegisterAccount({ ...registerAccount, email: text })}
            />

            <ThemedTextInput
              placeholder="Contraseña"
              secureTextEntry={secureText}
              autoCapitalize="none"
              icon={secureText ? "lock-closed-outline" : "lock-open-outline"}
              rightIcon={secureText ? "eye-off-outline" : "eye-outline"}
              onRightIconPress={() => setSecureText(!secureText)}
              onChangeText={(text) => setRegisterAccount({ ...registerAccount, password: text })}
            />

            <ThemedButton
              icon="arrow-forward-outline"
              onPress={onRegister}
              disabled={isPosting}
            >Crear cuenta</ThemedButton>

            {/* Registration Link */}
            <View className="flex-row justify-center items-center mt-5">
              <ThemedText style={{ color: textColor }}>
                ¿Ya tienes cuenta?
              </ThemedText>

              <ThemedLink onPress={() => { router.dismiss() }} style={{ marginHorizontal: 5 }}>
                Inicia sesión
              </ThemedLink>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;
