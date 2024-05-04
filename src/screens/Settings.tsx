import { StyleSheet} from 'react-native';
import { LowerPanelMethods } from '../components/LowerPanel.tsx';
import { useRef } from 'react';
import React from 'react';
import Animated, {  } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Button from '../components/Button.tsx'
import themes from '../styles/themes.json'

type Props = {
}

const Settings = ({}: Props) => {
  const insets = useSafeAreaInsets()
  // agregar referencia de panel (especificaciones se escriben al retornar la funcion)
  const prueba = useRef<LowerPanelMethods>(null)

  return (
    <Animated.View style={[styles.contenedor, {backgroundColor: themes.light.background}]}>
      <Button setting='Ajuste' lowerPanelRef={prueba} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, 
    alignItems: 'center',
  }
})

export default Settings
