import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, StyleSheet, Text, View } from 'react-native';
import Map from './Map.tsx'
import { StackNavigationProp } from '@react-navigation/stack';

const HomeScreen= (): React.JSX.Element => {
  const HomeStack = createNativeStackNavigator();

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name='Home' component={ Home } />
      <HomeStack.Screen name='Routes' component={ Routes } />
      <HomeStack.Screen name='Map' component={ Map } />
    </HomeStack.Navigator>
  )
}
type RootStackParamList = {
  Home: undefined;
  Routes: undefined;
};
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
interface Props {
  navigation: HomeScreenNavigationProp;
}

const Home: React.FC<Props> = ({navigation}): React.JSX.Element => {
  return (
    <View style={styles.contenedor}>
      <View style={styles.vistaRuta}>
        <Button title='Ruta 1' onPress={() => navigation.navigate('Routes')} />
      </View>
      <View style={styles.vistaRuta}>
        <Button title='Ruta 2' onPress={() => navigation.navigate('Routes')} />
      </View>
    </View>
  )
}

const Routes = (): React.JSX.Element => {
  return (
    <View style={{flex:1}}>
      <>
        <View style={{flex:1}}>
          <Map />
        </View>
      </>
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1, 
    marginTop: 8, 
    alignItems: 'center'
  },
  vistaRuta: {
    width: '90%', 
    marginBottom: 8
  }
})

export default HomeScreen
