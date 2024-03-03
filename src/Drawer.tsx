import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';

const Drawer = ():React.JSX.Element => {
  const drawer = createDrawerNavigator()

  return (
    <drawer.Navigator initialRouteName='Home' >
      <drawer.Screen name='Home' component={HomeScreen} />
      <drawer.Screen name='Routes' component={HomeScreen} />
      <drawer.Screen name='Notifications' component={HomeScreen} />
      <drawer.Screen name='Settings' component={HomeScreen} />
    </drawer.Navigator>
  )
}

export default Drawer