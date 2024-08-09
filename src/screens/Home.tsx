import { StyleSheet, View } from 'react-native';

import Map from '../map/Map.tsx'
import { SearchBar } from 'react-native-screens';

type Props = {
  latitude: number
  longitude: number
}

const Home = ({latitude, longitude}: Props): React.JSX.Element => {

  return (
    <View style={{flex:1}}>
      <View style={styles.searchBar}>
        <SearchBar 
          placeholder='Buscar una dirección'
        >

        </SearchBar>
      </View>
      <Map latitude={latitude} longitude={longitude} />
    </View>
  )
}

const styles = StyleSheet.create({
  searchBar: {
    height: 80
  }
})

export default Home
