import { View, Text, SafeAreaView } from 'react-native'
import { StyleSheet } from 'react-native'
import MapView,  {PROVIDER_GOOGLE}from 'react-native-maps'
import React from 'react'

const MapScreen = () => {
  return (

    <View style={styles.container}>
      <MapView
        style={styles.map}

        //13.992722, -89.545335
        //provider={PROVIDER_GOOGLE}
        
        initialRegion={{
          latitude: 13.992722,
          longitude: -89.545335,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        // showsPointsOfInterest={false}
      />
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'red',
  },

  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
