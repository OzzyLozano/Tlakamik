import { StyleSheet, View } from 'react-native';
import { SearchBar } from 'react-native-screens';
import Map from '../map/Map.tsx'
import themes from '../styles/themes.json'

type Props = {
  latitude: number
  longitude: number
}

const Home = ({latitude, longitude}: Props): React.JSX.Element => {

  return (
    <View style={{flex:1}}>
      <View style={[styles.header, {backgroundColor: themes.light.card}]}>
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
  header: {
    height: '8%'
  },
  searchBar: {
    
  },
})

export default Home
