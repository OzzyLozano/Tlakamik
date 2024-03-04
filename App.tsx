import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './src/screens/Home.tsx';
import Settings from './src/screens/Settings.tsx';
import themes from './src/styles/themes.json'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const StackNav = (): React.JSX.Element => {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={Home} />
    </Stack.Navigator>
  )
}

const App = (): React.JSX.Element => {
  const Drawer = createDrawerNavigator()
  return (
    <>
      <NavigationContainer theme={useColorScheme() === 'dark' ? DarkTheme : LightTheme}>
        <Drawer.Navigator 
        initialRouteName='Home' 
        screenOptions={{
          drawerActiveBackgroundColor:'#FAF9F6', 
          drawerInactiveBackgroundColor:'#36454F'
        }}>
          <Drawer.Screen name='Tlakamik' component={Home} />
          <Drawer.Screen name='¿Como llegar?' component={Home} />
          <Drawer.Screen name='Ajustes' component={Settings} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}

const DarkTheme = {
  dark: true,
  colors: themes.dark,
};
const LightTheme = {
  dark: false,
  colors: themes.light,
};

export default App;
