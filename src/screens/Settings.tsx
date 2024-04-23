import { StyleSheet} from 'react-native';
import Button from '../components/Button.tsx'
import { LowerPanelMethods } from '../components/LowerPanel.tsx';
import { useRef } from 'react';
import React from 'react';
import Animated, {  } from 'react-native-reanimated';
type Props = {
}

const Settings = ({}: Props) => {
  // agregar referencia de panel (especificaciones se escriben al retornar la funcion)
  const prueba = useRef<LowerPanelMethods>(null)

  return (
    <Animated.View style={[styles.contenedor]}>
      <Button setting='Ajuste' lowerPanelRef={prueba} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1, 
    alignItems: 'center',
  }
})

export default Settings
// 49:26