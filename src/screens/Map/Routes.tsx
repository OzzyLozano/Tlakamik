import { useState } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import MapView, { Marker, Polyline, Region } from 'react-native-maps';
import map_styles from '../../styles/map_styles.json'
import routes from '../Map/Routes/routes.json'

const Map = (): React.JSX.Element => {

  const origin = { latitude: 25.87972, longitude: -97.50417 } // Coordenadas de origen
  const destination = { latitude: 25.843449, longitude: -97.453398 } // Coordenadas de destino

  const [location, setLocation] = useState({
    latitude: 25.87972,
    longitude: -97.50417
  })
  const initRegion = {
    latitude: (origin.latitude + destination.latitude) / 2,
    longitude: (origin.longitude + destination.longitude) / 2,
    latitudeDelta: Math.abs(origin.latitude - destination.latitude) * 1.5,
    longitudeDelta: Math.abs(origin.longitude - destination.longitude) * 1.5,
  }
  const handleRegionChange = (region:Region) => {
    setLocation({
      latitude: region.latitude,
      longitude: region.longitude
    })
  }
  const handleRegionChangeComplete = (region:Region) => {
    setLocation({
      latitude: region.latitude,
      longitude: region.longitude
    })
  }

  // Establecer estilos del mapa según el modo claro/oscuro
  const mapStyle = useColorScheme() === 'dark' ? map_styles.aubergine : map_styles.retroMapStyle;

  // Definir puntos intermedios para la ruta personalizada
  const customRoutePoints = routes.prueba

  return (
    <View style={{flex:1}}>
      <View style={styles.container}>
        <MapView
          initialRegion={initRegion}
          style={StyleSheet.absoluteFillObject}
          showsUserLocation={true}
          followsUserLocation={true}
          onRegionChange={handleRegionChange}
          onRegionChangeComplete={handleRegionChangeComplete}
          customMapStyle={mapStyle}
        >
          <Marker coordinate={origin} title="Origen" />
          <Marker coordinate={destination} title="Destino" />
          
          <Polyline coordinates={[...customRoutePoints]} strokeWidth={3} strokeColor="#0096FF" />
        </MapView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default Map
