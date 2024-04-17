import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import Home from './src/screens/Home.tsx';
import Routes from './src/screens/Routes.tsx';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Location from './src/permissions/Location.tsx';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import themes from './src/styles/themes.json'
import { NavigationContainer } from '@react-navigation/native';
import Settings from './src/screens/Settings.tsx';

// const StackNav = (): React.JSX.Element => {
//   const Stack = createNativeStackNavigator()

//   return (
//     <Stack.Navigator>
//       <Stack.Screen name='Inicio' component={Home} />
//       <Stack.Screen name='Configuracion' component={Settings} />
//     </Stack.Navigator>
//   )
// }

const App = (): React.JSX.Element => {
  const colorScheme = useColorScheme()
  const [themeSwitch, setThemeSwitch] = useState<string>('system')
  const [theme, setTheme] = useState<string | null | undefined>(colorScheme)
  const handleThemeChange = (selectedTheme: string) => {
    setThemeSwitch(selectedTheme);
    setTheme(selectedTheme);
  }
  useEffect(() => {
    if (themeSwitch === 'system') setTheme(colorScheme)
  }, [colorScheme, themeSwitch])

  useEffect(() => {
    if(themeSwitch === 'light') handleThemeChange('dark')
    else if(themeSwitch === 'dark') handleThemeChange('light')
  }, [ themeSwitch ])

  const drawerOption = theme === 'dark' ? {
    drawerActiveBackgroundColor: themes.dark.primary, 
    drawerInactiveBackgroundColor: themes.dark.card,
    drawerActiveTintColor: themes.dark.text,
    drawerInactiveTintColor: themes.dark.text,
    drawerStyle: {backgroundColor: themes.dark.background}
  } : {
    drawerActiveBackgroundColor: themes.light.primary, 
    drawerInactiveBackgroundColor: themes.light.card,
    drawerActiveTintColor: themes.light.text,
    drawerInactiveTintColor: themes.light.text,
    drawerStyle: {backgroundColor: themes.light.background}
  }
  const headerOption = theme === 'dark' ? {
    headerStyle: {backgroundColor: themes.dark.background},
    headerTintColor: themes.dark.text
  } : {
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
