import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

function Map(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <MapView
      showsUserLocation={true}
        style={styles.map}
        initialRegion={{
          latitude: 25.87972,
          longitude: -97.50417,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 25.87972, longitude: -97.50417 }}
          title="Marker Title"
          description="Marker Description"
        />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map
