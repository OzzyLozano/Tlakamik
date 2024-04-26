import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Polyline, Region } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation'

import map_styles from '../../styles/map_styles.json'
import routes from '../Map/Routes/routes.json'
import BottomSheet from './BottomSheet'

const Map = () => {
  Geolocation.setRNConfiguration({
      skipPermissionRequests: true,
      authorizationLevel: 'auto',
      enableBackgroundLocationUpdates: true,
      locationProvider: 'auto'
    }
  )
  Geolocation.getCurrentPosition(
    position => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    },
    error => {
      console.log(error.code, error.message);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
  

  const origin = { latitude: 25.85476, longitude: -97.52567 } // Coordenadas de origen
  const destination = { latitude: 25.84425, longitude: -97.47932 } // Coordenadas de destino
  const [showRoutes, setShowRoutes] = useState(Object.values(routes).map(() => true))

  const toggleRouteVisibility = (index: number) => {
    setShowRoutes(prevShowRoutes => {
      const updatedShowRoutes = [...prevShowRoutes];
      updatedShowRoutes[index] = !updatedShowRoutes[index];
      return updatedShowRoutes;
    })
  }
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

  // Establecer estilo del mapa
  const mapStyle = map_styles.retroMapStyle;

  const renderRoutes = () => {
    return Object.values(routes).map((route, index) => {
      const { info } = route
      if (!info) return null
      else return (
        <React.Fragment key={info.nombre}>
          {showRoutes[index] && (
            <Polyline 
            coordinates={[...info.route]}
            strokeWidth={4}
            strokeColor={info.color} />
          )}
        </React.Fragment>
      )
    }, [])
  }

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
          {renderRoutes()}
        </MapView>
        <BottomSheet toggleRouteVisibility={toggleRouteVisibility} showRoutes={showRoutes} />
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
  bottomSheet: {
    position: 'absolute',
    width: '97%',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 40,
    marginBottom: 10
  },
  line: {
    width: '20%',
    height: 4,
    alignSelf: 'center',
    borderRadius: 4
  },
  route: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    paddingTop: 12,
    fontWeight: '600',
    fontSize: 28
  },
  icon: {
    paddingHorizontal: 10,
    width: 35,
    height: 35,
    borderRadius: 18
  },
  name: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontWeight: '500',
    fontSize: 20
  },
  schedule: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 20
  },
});

export default Map
