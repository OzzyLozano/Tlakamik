import React, { useCallback, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import themes from '../styles/themes.json'
import map_styles from '../styles/map_styles.json'
import MapView, { Polyline } from 'react-native-maps'
import BackArrow from '../components/BackArrow'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { useBottomSheet } from '../map/BottomSheetContext'

type RootStackParamList = {
  VerRutas: undefined
  Ruta: { route: any }
}
type RutaProp = RouteProp<RootStackParamList, 'Ruta'>
interface Salida {
  salida: string;
  llegada: string;
}

const Ruta = (): React.JSX.Element => {
  const { showBottomSheet, hideBottomSheet } = useBottomSheet()
  const route = useRoute<RutaProp>()
  const { route: routeInfo } = route.params

  const initRegion = {
    latitude: 25.85028,
    longitude: -97.50444,
    latitudeDelta: .06,
    longitudeDelta: .06,
  }
  const mapStyle = map_styles.default
  const navigation = useNavigation()

  const mostrarSalidas = () => {
    return Object.values(routeInfo?.info.salidas as Salida[]).map((salida, index) => {
      const { salida: hSalida, llegada } = salida
      if (!salida) return null
      else return (
        <React.Fragment key={index}>
          <View style={[styles.div]}>
            <Text style={[styles.horas]}>{hSalida} - {llegada}</Text>
          </View>
        </React.Fragment>
      )
    })
  }
  
  const mostrarInfo = useCallback(() => (
    <ScrollView style={{maxHeight: '85%'}}>
      <View style={[styles.div]}>
        <Text style={[styles.name]}>Horario: </Text>
        <Text style={[styles.name]}>{routeInfo?.info.horario}</Text>
      </View>
      <View style={[styles.div]}>
        <Text style={[styles.name]}>Ruta: </Text>
        <Text style={[styles.name]}>{routeInfo?.info.NoRuta}</Text>
      </View>
      <View style={[styles.div]}>
        <Text style={[styles.name]}>Salidas - Llegadas</Text>
      </View>
      <View style={{marginBottom: 0}}>
        {mostrarSalidas()}
      </View>
    </ScrollView>
  ), [routeInfo])

  useEffect(() => {
    showBottomSheet(routeInfo?.info.nombre, mostrarInfo)
    return () => {
      hideBottomSheet()
    }
  }, [routeInfo, showBottomSheet, hideBottomSheet])

  return (
    <View style={[styles.container, {backgroundColor: themes.light.background}]}>
      <View style={[styles.header, {backgroundColor: themes.light.card}]}>
        <TouchableOpacity style={[styles.backbtn]} onPress={() => {
          hideBottomSheet()
          navigation.goBack()
          return true
        }}>
          <BackArrow />
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    height: '8%',
    width: '100%'
  },
  map: {
    height: '92%'
  },
  backbtn: {
    marginRight: 10,
  },
  div: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '75%',
    alignSelf: 'center',
    marginTop: 6,
  },
  name: {
    fontWeight: '500' as '500', // Aquí el cambio de string a un valor aceptable por React Native
    fontSize: 16,
    color: themes.light.text
  },
  horas: {
    fontSize: 16,
    color: themes.light.text
  },
})

export default Ruta
