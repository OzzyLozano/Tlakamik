import { StyleSheet} from 'react-native';
import LowerPanel, { LowerPanelMethods } from '../components/LowerPanel.tsx';
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

  const lowerPanelWithProps = (props: { ref: React.RefObject<LowerPanelMethods>, title: string, content: string, showThemeSwitch: boolean }) => {
    return React.cloneElement(
      <LowerPanel title={''} content={''} theme={undefined} />,
      { ...props}
    )
  }

  return (
    <Animated.View style={[styles.contenedor, {backgroundColor: themes.light.background}]}>
      <Button setting='Ajuste' lowerPanelRef={prueba} />
      {/* especificaciones del panel para cada ajuste */
      lowerPanelWithProps({
        ref: prueba, title: 'titulo ajuste', content: 'contenido', showThemeSwitch: false})
      }
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
