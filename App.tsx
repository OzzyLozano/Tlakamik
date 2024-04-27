import React, {  } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import themes from './src/styles/themes.json'
import { NavigationContainer } from '@react-navigation/native';

import Home from './src/screens/Home.tsx'
import Routes from './src/screens/Routes.tsx'
import Settings from './src/screens/Settings.tsx'
import Location from './src/permissions/Location.tsx'

const App = (): React.JSX.Element => {

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

  return (
    <>
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex : 1}}>
        <NavigationContainer >
            <Drawer.Navigator 
            initialRouteName='Tlakamik' 
            screenOptions={ drawerOption }>
              <Drawer.Screen name='Tlakamik' component={Home} options={headerOption} />
              <Drawer.Screen name='Ver Rutas' component={Routes} options={headerOption} />
              <Drawer.Screen name='Configuracion' component={Settings} options={headerOption} />
            </Drawer.Navigator>
          </NavigationContainer>
        <Location />
      </GestureHandlerRootView>
    </SafeAreaProvider>
    </>
  )
}

export default App;
