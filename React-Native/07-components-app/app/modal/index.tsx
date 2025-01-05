import ThemedButton from '@/presentation/shared/ThemedButton';
import ThemedView from '@/presentation/shared/ThemedView';
import { Link, router } from 'expo-router';
import { View, Text } from 'react-native';

const ModalScreen = () => {
  return (
    <ThemedView className='flex-1 justify-center items-center'>
      <Link asChild href='/modal/modal-window' className='mx-4 items-center justify-center'>
        <Text className='text-light-text dark:text-dark-text my-2 text-xl items-center justify-center'>
          Open Modal
        </Text>
      </Link>


      <ThemedButton
        onPress={() => { router.push('/modal/modal-window') }}
        className='mx-4 m-5' 
        
      >
        Abrir Modal
      </ThemedButton>
    </ThemedView>
  );
};
export default ModalScreen;
