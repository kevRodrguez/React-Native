import { View, Text, Pressable, PressableProps } from 'react-native'
import React from 'react'

interface Props extends PressableProps {
  className?: string
  onPress?: () => void
  children: String
}


const ThemedButton = ({ className, children, ...rest }: Props) => {
  return (
    <Pressable
      className={`bg-light-primary dark:bg-dark-primary items-center rounded-xl px-6 py-2 active:opacity ${className} `}
      {...rest}
    >
      <Text className='text-white text-2xl'>{children}</Text>
    </Pressable>
  )
}

export default ThemedButton