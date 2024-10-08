import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import map_styles from '../styles/map_styles.json'
import routes from '../map/routes/routes.json'
import { useBottomSheet } from '../map/BottomSheetContext'
import themes from './../styles/themes.json'
import { listarRutas } from '../funciones.tsx'

const Home = (): React.JSX.Element => {
  const { showBottomSheet } = useBottomSheet()
  const initRegion = {
    latitude: 25.85028,
    longitude: -97.50444,
    latitudeDelta: .08,
    longitudeDelta: .08,
  }

  // Establecer estilo del mapa
  const mapStyle = map_styles.default;

  useEffect(() => {
    showBottomSheet('Rutas Matamoros', listarRutas)
  }, [showBottomSheet])

  const renderRoutes = () => {
    return Object.values(routes).map((route, index) => {
      const { info } = route
      if (!info) return null
      else return (
        <React.Fragment key={index}>
          <Polyline 
            coordinates={[...route.ruta]}
            strokeWidth={4}
            strokeColor={info.color} />
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  route: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '75%',
    alignSelf: 'center',
    marginTop: 6,
  },
  cross: {
    marginRight: 12,
    borderRadius: 18,
    width: 36,
    height: 36,
  },
  name: {
    fontWeight: '500',
    fontSize: 20,
    color: themes.light.text
  },
});

export default Home
