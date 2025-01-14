import { View, Text, Pressable, StyleSheet, PressableProps } from 'react-native'
import React from 'react'

interface Props extends PressableProps {
    children: string
}

const ThemedPressable = ({children, ...rest}:Props) => {
  return (
    <Pressable style={styles.btnPrimary} {...rest}>
      <Text
      style={{ color: 'white'}}
      >{children}</Text>
    </Pressable>
  )
}

export default ThemedPressable

const styles = StyleSheet.create({
    btnPrimary: {
        paddingVertical:10,
        paddingHorizontal:20,
        backgroundColor: 'black',
        borderRadius: 100,
        margin: 10,
    }

})