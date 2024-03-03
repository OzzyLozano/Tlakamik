import { View } from 'react-native';
import Location from '../permissions/Location.tsx';
import Map from './Map/Map.tsx';

const Home = (): React.JSX.Element => {
  return (
    <View style={{flex:1}}>
      <Location />
      <Map />
    </View>
  )
}

export default Home
