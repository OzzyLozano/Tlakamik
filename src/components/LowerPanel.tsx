import { StyleSheet, useWindowDimensions } from 'react-native';
import BackDrop from './BackDrop.tsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import ThemeSwitch from './ThemeSwitch.tsx';
import Icon from './Icon.tsx';
import themes from '../styles/themes.json'

export interface LowerPanelMethods {
  open: () => void
  close: () => void
}
type Props = {
  title: string
  content: string
  themeSwitch: string
  setThemeSwitch: React.Dispatch<React.SetStateAction<string>>
  showThemeSwitch: boolean
  theme: string | null | undefined
  setTheme: React.Dispatch<React.SetStateAction<string | null | undefined>>
}

const LowerPanel = forwardRef<LowerPanelMethods, Props>((props, ref) => {
  const {title, content, themeSwitch, setThemeSwitch, showThemeSwitch, theme, setTheme} = props
  const insets = useSafeAreaInsets()
  const [panelHeight, setPanelHeight] = useState(1000)
  const {width} = useWindowDimensions()
  const OPEN = 0
  const CLOSE = panelHeight + insets.bottom
  const translateY = useSharedValue(CLOSE)

  const open = useCallback(() => {
    translateY.value = withTiming(OPEN)
  }, [translateY])
  const close = useCallback(() => {
    translateY.value = withTiming(CLOSE)
  }, [CLOSE, translateY])
  useImperativeHandle(ref, () => ({ open, close }), [open, close])

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}]
    }
  })

  const pan = Gesture.Pan().onUpdate((event) => {
    if (event.translationY < 0) 
      translateY.value = withSpring(OPEN, {damping: 200, stiffness: 800})
    else 
      translateY.value = withSpring(event.translationY, {damping: 100, stiffness: 600})
  }).onEnd(() => {
    if (translateY.value > 30)
      translateY.value = withSpring(CLOSE, {damping: 100, stiffness: 600})
    else
      translateY.value = withSpring(OPEN, {damping: 100, stiffness: 600})
  })

  const backgroundColorAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor: theme === 'dark' ? withTiming(themes.dark.background) : withTiming(themes.light.background)
    }
  })
  const textColorAnimation = useAnimatedStyle(() => {
    return {
      color: theme === 'dark' ? withTiming(themes.dark.text) : withTiming(themes.light.text)
    }
  })
  const lineColorAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor: theme === 'dark' ? withTiming(themes.dark.text) : withTiming(themes.light.text)
    }
  })

  return (
    <>
      <BackDrop translateY={translateY} openHeight={OPEN} closeHeight={CLOSE} close={close} />
      <GestureDetector gesture={pan}>
        <Animated.View 
          onLayout={({nativeEvent}) => {
            const {height} = nativeEvent.layout
            if (height) {
              setPanelHeight(height)
              translateY.value = withTiming(height + insets.bottom)
            }
          }}
          style={[styles.contenedor, {width: width*.92, bottom: insets.bottom}, animationStyle, backgroundColorAnimation]}>
          <Animated.View style={[styles.line, lineColorAnimation]} />
          {showThemeSwitch && <Icon theme={theme} />}
          <Animated.Text style={[styles.titulo, textColorAnimation]}>{title}</Animated.Text>
          <Animated.Text style={[styles.text, textColorAnimation]}>{content}</Animated.Text>
          {showThemeSwitch && <ThemeSwitch setThemeSwitch={setThemeSwitch} themeSwitch={themeSwitch} theme={theme} setTheme={setTheme} />}
        </Animated.View>
      </GestureDetector>
    </>
  )
})

const styles = StyleSheet.create({
  contenedor: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 40,
    borderRadius: 35
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 20
  },
  line: {
    position: 'absolute',
    top: 8,
    width: 60,
    height: 4,
    borderRadius: 8
  }
})

export default LowerPanel
