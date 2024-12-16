import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, Redirect } from 'expo-router'

const App = () => {

  //return <Redirect href="/(stack)/home" />
  //return <Redirect href="/tabs/(stack)/home" />
  return <Redirect href="/home" />

  // return (
  //   <SafeAreaView className=''>r
  //     <View className='flex-auto mt-10 justify-center'>

  //       <Text className='text-4xl font-work-black text-primary' >Hola mundo</Text>

  //       <Text className='text-3xl font-work-medium text-secondary-300'>Hola mundo</Text>

  //       <Text className='text-2xl font-work-light text-tertiary'>Hola mundo</Text>

  //       <Text className='text-xl'>Hola mundo</Text>

  //       <Link href={'/products'}>
  //         Productos
  //       </Link>
  //     </View>
  //   </SafeAreaView>
  // )
}

export default App