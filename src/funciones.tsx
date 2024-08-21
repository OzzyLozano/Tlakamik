import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import { TouchableWithoutFeedback, Text, View, StyleSheet } from 'react-native'
import routes from './map/routes/routes.json'
import React from 'react'
import themes from './styles/themes.json'

type RootStackParamList = {
  VerRutas: undefined
  Ruta: { route: any }
}

type VerRutasNavigationProp = StackNavigationProp<RootStackParamList, 'VerRutas'>

export const listarRutas = (): JSX.Element => {
  const navigation = useNavigation<VerRutasNavigationProp>()
  return Object.values(routes).map((route, index) => {
    const { info } = route
    if (!info) return null
    return (
      <React.Fragment key={index}>
        <TouchableWithoutFeedback onPress={() => {
          navigation.navigate('Ruta', { route: route })
        } }>
          <View style={[styles.route]}>
            <Text style={[styles.name]}>{info.nombre}</Text>
            <View style={[styles.cross, { backgroundColor: info.color }]} />
          </View>
        </TouchableWithoutFeedback>
      </React.Fragment>
    )
  }).filter(route => route !== null) as unknown as JSX.Element // Filtramos los valores nulos
}

const styles = StyleSheet.create({
  route: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '75%',
    alignSelf: 'center',
    marginTop: 6,
  },
  cross: {
    marginRight: 12,
    borderRadius: 18,
    width: 36,
    height: 36,
  },
  name: {
    fontWeight: '500' as '500', // Aquí el cambio de string a un valor aceptable por React Native
    fontSize: 20,
    color: themes.light.text
  },
})
