import ThemedCard from '@/presentation/shared/ThemedCard';
import ThemedInput from '@/presentation/shared/ThemedInput';
import ThemedText from '@/presentation/shared/ThemedText';
import ThemedView from '@/presentation/shared/ThemedView';
import { useState } from 'react';
import { View, Text, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

const isIOS = Platform.OS === 'ios';

const TextInputsScreen = () => {

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
  });

  return (
    // esto es para que el teclado no tape los inputs
    <KeyboardAvoidingView
      behavior={isIOS ? 'height' : undefined}
    //style={{ flex: 1 }}
    >

      <ScrollView>

        <ThemedView margin>

          <ThemedCard className='mb-2'>
            <ThemedInput
              placeholder="Nombre Completo"
              autoCapitalize={'words'}
              autoComplete={'name'}

              onChangeText={(text) => setForm({ ...form, name: text })}
            />

            <ThemedInput
              placeholder="Correo Electronico"
              autoCorrect={false}
              autoComplete={'email'}
              keyboardType={'email-address'}

              onChangeText={(text) => setForm({ ...form, name: text })}
            />

            <ThemedInput
              placeholder="Celular"
              autoCorrect={false}
              autoComplete={'tel'}
              keyboardType={'phone-pad'}

              onChangeText={(text) => setForm({ ...form, name: text })}
            />


          </ThemedCard>


          <ThemedCard className='mb-4'>
            <ThemedText> {JSON.stringify(form, null, 2)} </ThemedText>
          </ThemedCard>

          <ThemedCard className='mb-4'>
            <ThemedText> {JSON.stringify(form, null, 2)} </ThemedText>
          </ThemedCard>

          <ThemedCard className='mb-4'>
            <ThemedText> {JSON.stringify(form, null, 2)} </ThemedText>
          </ThemedCard>

          <ThemedCard className='mb-4'>
            <ThemedText> {JSON.stringify(form, null, 2)} </ThemedText>
          </ThemedCard>



          <ThemedCard
            // para dar mas espacio de scroll para que no tape el input
            style={{ marginBottom: isIOS ? 100 : 20 }}
          >

            <ThemedInput
              placeholder="Celular"
              autoCorrect={false}
              autoComplete={'tel'}
              keyboardType={'phone-pad'}

              onChangeText={(text) => setForm({ ...form, name: text })}
            />
          </ThemedCard>
        </ThemedView>

      </ScrollView>
    </KeyboardAvoidingView>

  );
};
export default TextInputsScreen;
