import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import themes from './src/styles/themes.json'
import { NavigationContainer } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import Home from './src/screens/Home.tsx'
import Routes from './src/screens/Routes.tsx'
import Settings from './src/screens/Settings.tsx'
import Location from './src/Permissions/Location.tsx'
import Help from './src/screens/Help.tsx'

const App = (): React.JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState(25.87972);
  const [longitude, setLongitude] = useState(-97.50417);
  useEffect(() => {
    let locationTimeout: NodeJS.Timeout
    const getInitLocation = async () => {
      try {
        locationTimeout = setTimeout(() => {
          Geolocation.getCurrentPosition(
            position => {
              clearTimeout(locationTimeout);
              setLatitude(position.coords.latitude);
              setLongitude(position.coords.longitude);
              setLoading(false);
            },
            error => {
              clearTimeout(locationTimeout);
              console.log(error);
              setLoading(false);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          )
          setLoading(false);
        }, 1000)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    getInitLocation()
  }, [])
  
  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer, {backgroundColor: themes.light.card}]}>
        <ActivityIndicator size="large" color={themes.light.primary} />
      </View>
    )
  }

  const drawerOption = {
    drawerActiveBackgroundColor: themes.light.primary, 
    drawerInactiveBackgroundColor: themes.light.card,
    drawerActiveTintColor: themes.light.text,
    drawerInactiveTintColor: themes.light.text,
    drawerStyle: {backgroundColor: themes.light.background}
  }
  const headerOption = {
    headerStyle: {backgroundColor: themes.light.primary},
    headerTintColor: themes.light.text
  }
  const Drawer = createDrawerNavigator()

  try {
    if (<Location />) {
      return (
        <>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{flex : 1}}>
            <Location />
            <NavigationContainer >
                <Drawer.Navigator 
                initialRouteName='VerRutas' 
                screenOptions={ drawerOption }>
                  <Drawer.Screen name='Tlakamik' options={headerOption}>
                    {() => <Home latitude={latitude} longitude={longitude} />}
                  </Drawer.Screen>
                  <Drawer.Screen name='VerRutas' component={Routes} options={headerOption} />
                  {/* <Drawer.Screen name='Configuracion' component={Settings} options={headerOption} /> */}
                  <Drawer.Screen name='Ayuda' component={Help} options={headerOption} />
                </Drawer.Navigator>
              </NavigationContainer>
          </GestureHandlerRootView>
        </SafeAreaProvider>
        </>
      )
    } else {
      return (
        <>
        
        </>
      )
    }
  } catch (error) {
    return (
      <>
      
      </>
    )
  }
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

export default App;
