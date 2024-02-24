import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import Settings from "../screens/Settings";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useColorScheme } from 'react-native';

const Tabs = () => {
  const Tab = createBottomTabNavigator()

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='HomePages' component={HomeScreen} />
        <Tab.Screen name='Settings' component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Tabs
