import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, ScrollView, StyleSheet, View } from 'react-native';
import Map from './Map.tsx'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './Routes/Types.tsx';

const HomeScreen= (): React.JSX.Element => {
  const HomeStack = createNativeStackNavigator();

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name='Ciudad, Estado' component={ Home } />
      <HomeStack.Screen name='Ruta' component={ Routes } />
      <HomeStack.Screen name='Map' component={ Map } />
    </HomeStack.Navigator>
  )
}

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Home = ({navigation}: Props): React.JSX.Element => {
  return (
    <ScrollView>
      <View style={styles.contenedor}>
        <View style={styles.vistaRuta}>
          <Button title='Ruta 1' onPress={() => navigation.navigate('Ruta')} />
        </View>
        <View style={styles.vistaRuta}>
          <Button title='Ruta 2' onPress={() => navigation.navigate('Ruta')} />
        </View>
      </View>
    </ScrollView>
  )
}

const Routes = (): React.JSX.Element => {
  return (
    <View style={{flex:1}}>
      <View style={{flex:1}}>
        <Map />
      </View>
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
