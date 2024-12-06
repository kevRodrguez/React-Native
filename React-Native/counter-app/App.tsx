import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import FAB from './components/FAB';

export default function App() {
  const [count, setCount] = useState(10)

  return (
    <View style={styles.container}>
      <Text style = {[styles.textTop]}>Counter App</Text>

      <Text style={styles.textHuge}>{count}</Text>

      {/* <Pressable
        style={styles.floatingButton}
        onPress={() => setCount(count + 1)}
        onLongPress={() => setCount(0)}
      >
        <Text style={{color: 'white', fontSize: 20}}>+1</Text>
      </Pressable> */}

      <FAB 
        label='+1'
        onPress={() => setCount(count + 1)}
        onLongPress={() => setCount(0)}
        position='right'
      />

      <FAB 
        label='-1'
        onPress={() => setCount(count - 1)}
        onLongPress={() => setCount(0)}
        position='left'
      />

<FAB 
        label='reset'
        onPress={() => setCount(0)}
        position='center'
      />



      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textHuge: {
    fontSize: 90,
    fontWeight: 'bold',
  },

  //send text to the upper part of the view
  textTop: {
    position: 'absolute',
    top: 150,
    fontSize: 30,
    fontWeight: 'bold',
  },

  
});

