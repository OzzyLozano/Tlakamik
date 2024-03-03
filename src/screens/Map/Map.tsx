import { useState } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import MapView, { Region } from 'react-native-maps';
import map_styles from '../../styles/map_styles.json'

const Map = (): React.JSX.Element => {
  const [location, setLocation] = useState({
    latitude: 25.87972,
    longitude: -97.50417
  })
  const initRegion = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
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
  const colorScheme = useColorScheme();

  // Establecer estilos del mapa según el modo claro/oscuro
  const mapStyle = colorScheme === 'dark' ? map_styles.darkMapStyle : map_styles.retroMapStyle;

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
