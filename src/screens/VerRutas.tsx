import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import routes from '../map/routes/routes.json'
import themes from '../styles/themes.json'
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  VerRutas: undefined;
  Ruta: { route: any };
};

type VerRutasNavigationProp = StackNavigationProp<RootStackParamList, 'VerRutas'>;

type Props = {
}

const VerRutas = ({}: Props): React.JSX.Element => {
  const navigation = useNavigation<VerRutasNavigationProp>();

  const listarRutas = () => {
    return Object.values(routes).map((route, index) => {
      const { info } = route
      if(!info) return null
      else return (
        <React.Fragment key={index}>
          <TouchableWithoutFeedback onPress={() => {
              navigation.navigate('Ruta', { route: route })
            }}>
            <View style={[styles.item, {backgroundColor: themes.light.card}]}>
              <Text style={[styles.text, {color: themes.light.text}]}>{info.nombre}</Text>
            </View>
          </TouchableWithoutFeedback>
        </React.Fragment>
      )
    })
  }

  return (
      <View style={[styles.container, {backgroundColor: themes.light.background}]}>
        {listarRutas()}
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, 
    alignItems: 'center',
  },
  item: {
    marginTop: 8, 
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 20,
    width: '95%'
  },
  text: {
    fontSize: 20,
  }
})

export default VerRutas
