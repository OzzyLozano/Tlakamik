import { View } from 'react-native';

import Map from './Map/Map.tsx'

type Props = {
  latitude: number
  longitude: number
}

const Home = ({latitude, longitude}: Props): React.JSX.Element => {

  return (
    <View style={{flex:1}}>
      <Map latitude={latitude} longitude={longitude} />
    </View>
  )
}

export default Home
