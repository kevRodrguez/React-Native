import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerContentComponentProps, DrawerItemList } from '@react-navigation/drawer'


const CustomDrawer = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={true}
    >
      <SafeAreaView>
        <View className='flex justify-center items-center mx-3 my-5 p-3 bg-primary rounded-xl'>
          <View className='my-3 justify-center items-center bg-white rounded-full h-24 w-24'>
            <Text className='text-primary font-work-black text-3xl'>
              Kev
            </Text>
          </View>
        </View>

        {/* DrawerItems */}

        <DrawerItemList {...props} />
      </SafeAreaView>
    </DrawerContentScrollView>
  )
}

export default CustomDrawer