import { StyleSheet, useColorScheme} from 'react-native';
import Button from '../components/Button.tsx'
import LowerPanel, { LowerPanelMethods } from '../components/LowerPanel.tsx';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import Animated, {  } from 'react-native-reanimated';
import ColorAnimations from '../styles/ColorAnimations.tsx';
type Props = {
}

const Settings = ({}: Props) => {
  const colorScheme = useColorScheme()

  // agregar referencia de panel (especificaciones se escriben al retornar la funcion)
  const prueba = useRef<LowerPanelMethods>(null)

  const [themeSwitch, setThemeSwitch] = useState<string>('system')
  const lowerPanelWithProps = (props: { ref: React.RefObject<LowerPanelMethods>, title: string, content: string, showThemeSwitch: boolean }) => {
    return React.cloneElement(
      <LowerPanel title={''} content={''} themeSwitch={themeSwitch} setThemeSwitch={setThemeSwitch} showThemeSwitch={true} theme={theme} setTheme={setTheme} />,
      { ...props, themeSwitch, setThemeSwitch }
    )
  }
  const [theme, setTheme] = useState<string | null | undefined>(colorScheme)

  useEffect(() => {
    if (themeSwitch === 'system') setTheme(colorScheme)
  }, [colorScheme, themeSwitch])

  const { backgroundColorAnimation } = ColorAnimations({theme})

  return (
    <Animated.View style={[styles.contenedor, backgroundColorAnimation]}>
      <Button setting='Ajuste' lowerPanelRef={prueba} theme={theme} />

      
      {/* especificaciones del panel para cada ajuste */
      lowerPanelWithProps({
        ref: prueba, title: 'titulo ajuste', content: 'contenido', showThemeSwitch: false})
      }
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