import React from 'react';
import Tabs from "./src/tabs/Tabs.tsx";
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Text, useColorScheme } from 'react-native';
import Location from "./src/Permissions/Location.tsx";

const DarkTheme = {
  dark: true,
  colors: {
    primary: 'rgb(197, 123, 237)',
    background: 'rgb(60, 60, 60)',
    card: 'rgb(45, 45, 45)',
    text: 'rgb(255, 255, 255)',
    border: 'rgb(0, 0, 0)',
    notification: 'rgb(255, 69, 58)',
  },
};

const App = (): React.JSX.Element => {

  return (
    <>
      <NavigationContainer theme={useColorScheme() === 'dark' ? DarkTheme : DefaultTheme}>
        <Tabs />
      </NavigationContainer>
    </>
  );
}

export default App;
