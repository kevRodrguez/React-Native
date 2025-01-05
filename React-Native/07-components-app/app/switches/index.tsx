import ThemedView from '@/presentation/shared/ThemedView';
import ThemedCard from '@/presentation/shared/ThemedCard';
import ThemedSwitch from '@/presentation/shared/ThemedSwitch';
import { useState } from 'react';
import { View, Text, Switch } from 'react-native';

const Switches = () => {

  const [state, setState] = useState(
    {
      isActive: true,
      isHungry: false,
      isHappy: true,
    }
  );


  return (
    <ThemedView margin className='mt-2'>
      <ThemedCard>
        {/* <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={state.isActive ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(value) => setState({ ...state, isActive: value })}
          value={state.isActive}
        /> */}

        <ThemedSwitch
          text='Activo'
          onValueChange={(value) => setState({ ...state, isActive: value })}
          value={state.isActive}
          className='mb-3'
        />

        <ThemedSwitch
          text='Hambriento'
          onValueChange={(value) => setState({ ...state, isHungry: value })}
          value={state.isHungry}
          className='mb-3'
        />

        <ThemedSwitch
          text='Contento'
          onValueChange={(value) => setState({ ...state, isHappy: value })}
          value={state.isHappy}
          className='mb-3'
        />
      </ThemedCard>

    </ThemedView>
  );
};
export default Switches;
