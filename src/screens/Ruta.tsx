import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import themes from '../styles/themes.json'
import map_styles from '../styles/map_styles.json'
import MapView, { Polyline } from 'react-native-maps'

type RootStackParamList = {
  VerRutas: undefined
  Ruta: { route: any }
}

type RutaRouteProp = RouteProp<RootStackParamList, 'Ruta'>

const Ruta = () => {
  const route = useRoute<RutaRouteProp>()
  const { route: routeInfo } = route.params

  const initRegion = {
    latitude: 25.85028,
    longitude: -97.50444,
    latitudeDelta: .06,
    longitudeDelta: .06,
  }
  const mapStyle = map_styles.default

  return (
    <View style={[styles.container, {backgroundColor: themes.light.background}]}>
      <View style={[styles.header, {backgroundColor: themes.light.card}]}>
        <Text style={[styles.text, {color: themes.light.text}]}>{routeInfo?.info.nombre}</Text>
      </View>
      <View style={[styles.map]}>
        <MapView
          initialRegion={initRegion}
          style={StyleSheet.absoluteFillObject}
          showsUserLocation={true}
          followsUserLocation={true}
          customMapStyle={mapStyle}>
          
          {(
            <Polyline 
            coordinates={[...routeInfo.ruta]}
            strokeWidth={4}
            strokeColor={routeInfo.info.color} />
          )}
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontSize: 20,
  },
  header: {
    paddingHorizontal: 12,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    height: '8%',
    width: '100%'
  },
  map: {
    height: '92%'
  },
})

export default Ruta
