import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';

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

  return (
    <View style={{flex: 1}}>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={initRegion}
        style={StyleSheet.absoluteFill}
        showsUserLocation={true}
        followsUserLocation={true}
        onRegionChange={handleRegionChange}
        onRegionChangeComplete={handleRegionChangeComplete}
      >
        <Marker
          coordinate={{ latitude: 25.87972, longitude: -97.50417 }}
          title="H. Matamoros"
          description="Marker Description"
        />
      </MapView>
    </View>
  )
}

export default Map
