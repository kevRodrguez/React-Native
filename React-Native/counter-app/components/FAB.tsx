import {Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

interface FABProps {
    label: string

    //positions
    position?: 'left' | 'right' | 'center';

    //Methods
    onPress?: () => void;
    onLongPress?: () => void;
}


//FLOATING ACTION BUTTON FAB
export default function FAB({
    label,
    onPress,
    onLongPress,
    position = 'right'


}: FABProps) {
  return (
    <Pressable
        
        style={({pressed}) => [
            styles.floatingButton, 
            pressed ? {opacity: 0.7} : {opacity: 1},
            position === 'center' && styles.positionCenter,
            position === 'right' && styles.positionRight,
            position === 'left' && styles.positionLeft,
        ]}
        onPress={onPress}
        onLongPress={onLongPress}

      >
        <Text style={{color: 'white', fontSize: 20}}>{label}</Text>
      </Pressable>
  );
}

const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        bottom: 50,
        //right: 50,
        backgroundColor: '#65558f',
        padding: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.3,
        elevation: 3,
        shadowRadius: 4,
    },

    positionRight: {
        right: 50,
    },

    positionLeft: {
        left: 50,
    },

    positionCenter: {
        //center the button
        left: '50%',
        transform: [{translateX: -50}]
        

        
    }
})