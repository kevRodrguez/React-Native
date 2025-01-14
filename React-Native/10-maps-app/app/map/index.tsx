import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

const MapScreen = () => {
  return (
    <SafeAreaView style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
      }}>
      <View>
        <Text style={{
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 'bold'

        }}>MapScreen</Text>
      </View>
    </SafeAreaView>
  )
}

export default MapScreen