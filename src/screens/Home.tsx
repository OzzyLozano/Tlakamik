import { StyleSheet, View } from 'react-native';

import Map from './Map/Map.tsx'
import { SearchBar } from 'react-native-screens';

type Props = {
  latitude: number
  longitude: number
}

const Home = ({latitude, longitude}: Props): React.JSX.Element => {

  return (
    <View style={{flex:1}}>
      <Map latitude={latitude} longitude={longitude} />
      {/* <View style={styles.searchBar}>
        <SearchBar 
          placeholder='Buscar una dirección'
        >

        </SearchBar>
      </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  searchBar: {
    height: 100
  }
})

export default Home
