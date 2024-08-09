import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';

import map_styles from '../styles/map_styles.json'
import routes from './routes/routes.json'
import BottomSheet from './BottomSheet'

const Map = () => {
  const [showRoutes, setShowRoutes] = useState(Object.values(routes).map(() => true))

  const toggleRouteVisibility = (index: number) => {
    setShowRoutes(prevShowRoutes => {
      const updatedShowRoutes = [...prevShowRoutes];
      updatedShowRoutes[index] = !updatedShowRoutes[index];
      return updatedShowRoutes;
    })
  }
  const initRegion = {
    latitude: 25.85028,
    longitude: -97.50444,
    latitudeDelta: .08,
    longitudeDelta: .08,
  }

  // Establecer estilo del mapa
  const mapStyle = map_styles.default;

  const renderRoutes = () => {
    return Object.values(routes).map((route, index) => {
      const { info } = route
      if (!info) return null
      else return (
        <React.Fragment key={info.nombre}>
          {showRoutes[index] && (
            <Polyline 
            coordinates={[...route.ruta]}
            strokeWidth={4}
            strokeColor={info.color} />
          )}
        </React.Fragment>
      )
    }, [])
  }

  return (
    <View style={styles.container}>
        <MapView
          initialRegion={initRegion}
          style={StyleSheet.absoluteFillObject}
          showsUserLocation={true}
          followsUserLocation={true}
          customMapStyle={mapStyle}
        >
          {renderRoutes()}
        </MapView>
        <BottomSheet toggleRouteVisibility={toggleRouteVisibility} showRoutes={showRoutes} />
    </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
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
