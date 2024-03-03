import { StyleSheet, Text, View } from 'react-native';

const Settings= () => {

  return (
    <View style={styles.contenedor}>
      <Text>Ajustes</Text>
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

export default Settings
