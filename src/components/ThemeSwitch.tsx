import { useEffect } from 'react';
import { Appearance, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import ColorAnimations from '../styles/ColorAnimations';

type Props = {
  setThemeSwitch: React.Dispatch<React.SetStateAction<string>>
  themeSwitch: string
  theme: string | null | undefined
  setTheme: React.Dispatch<React.SetStateAction<string | null | undefined>>
}

const ThemeSwitch = ({setThemeSwitch, themeSwitch, theme, setTheme}: Props) => {
  const colorScheme = Appearance.getColorScheme()
  const {width} = useWindowDimensions()
  const SWITCH_CONTAINER_WIDTH = width * 0.8
  const SWITCH_WIDTH = width * 0.8 / 3
  const translateX = useSharedValue(0)
  
  const translateAnimation = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}]
    }
  })
  
  const { primaryColorAnimation, backgroundColorAnimation, textColorAnimation } = ColorAnimations({theme})

  const handleThemeChange = (selectedTheme: string) => {
    setThemeSwitch(selectedTheme);
    setTheme(selectedTheme);
  }

  useEffect(() => {
    if(themeSwitch === 'system') translateX.value = withSpring(SWITCH_WIDTH * 0)
    else if(themeSwitch === 'light') translateX.value = withSpring(SWITCH_WIDTH * 1)
    else if(themeSwitch === 'dark') translateX.value = withSpring(SWITCH_WIDTH * 2)
  }, [SWITCH_WIDTH, themeSwitch, translateX])

  return (
    <>
      <Animated.View style={[styles.contenedor, {width: SWITCH_CONTAINER_WIDTH}, primaryColorAnimation]}>
        <View style={[styles.slideContainer, {width: SWITCH_WIDTH}]}>
          <Animated.View style={[styles.slide, {width: width*.7/3}, translateAnimation, backgroundColorAnimation]} />
        </View>
        <Pressable style={styles.button} onPress={() => {
          setThemeSwitch('system')
          if(colorScheme) setTheme(colorScheme)
        }}>
          <Animated.Text style={[styles.textButton, textColorAnimation]}>Sistema</Animated.Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => {
          handleThemeChange('light')
        }}>
          <Animated.Text style={[styles.textButton, textColorAnimation]}>Claro</Animated.Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => {
          handleThemeChange('dark')
        }}>
          <Animated.Text style={[styles.textButton, textColorAnimation]}>Oscuro</Animated.Text>
        </Pressable>
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    marginTop: 20,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    overflow: 'hidden'
  },
  button: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    fontWeight: '500',
    textAlign: 'center'
  },
  slideContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    padding: 23,
    borderRadius: 100
  },
})

export default ThemeSwitch
