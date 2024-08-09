import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

import map_styles from '../styles/map_styles.json'

type Props = {
  latitude: number
  longitude: number
}

const Map = ({latitude, longitude}: Props): React.JSX.Element => {
  const initRegion = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  }

  // Establecer estilos del mapa
  const mapStyle = map_styles.default

  return (
    <View style={[styles.container]}>
        <MapView
          initialRegion={initRegion}
          style={StyleSheet.absoluteFillObject}
          showsUserLocation={true}
          followsUserLocation={true}
          customMapStyle={mapStyle}
        >
        </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Map
