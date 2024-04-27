import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import map_styles from '../../styles/map_styles.json'

type Props = {
}

const Map = ({}: Props): React.JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  useEffect(() => {
    const getInitLocation = async () => {
      try {
        await Geolocation.getCurrentPosition(
          position => {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
            setLoading(false)
          },
          error => {},
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        )
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    getInitLocation()
  }, [])
  
  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }
  const initRegion = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.008,
    longitudeDelta: 0.008,
  }

  // Establecer estilos del mapa según el modo claro/oscuro
  const mapStyle = map_styles.retroMapStyle

  return (
    <View style={{flex:1}}>
      <View style={styles.container}>
        <MapView
          initialRegion={initRegion}
          style={StyleSheet.absoluteFillObject}
          showsUserLocation={true}
          followsUserLocation={true}
          customMapStyle={mapStyle}
        >
        </MapView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Map
