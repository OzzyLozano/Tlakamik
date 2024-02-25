import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import Settings from "../screens/Settings";

const Tabs = () => {
  const Tab = createBottomTabNavigator()

  return (
      <Tab.Navigator>
        <Tab.Screen name='Transportes' component={HomeScreen} />
        <Tab.Screen name='Settings' component={Settings} />
      </Tab.Navigator>
  )
}

export default Tabs
