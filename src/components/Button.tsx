import { StyleSheet, TouchableWithoutFeedback} from 'react-native';
import { LowerPanelMethods } from './LowerPanel';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import themes from '../styles/themes.json'

type Props = {
  lowerPanelRef: React.RefObject<LowerPanelMethods>
  setting: string
  theme: string | null | undefined
}

const Button = ({lowerPanelRef, setting, theme}: Props) => {
  const backgroundColorAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor: theme === 'dark' ? withTiming(themes.dark.card) : withTiming(themes.light.card)
    }
  })
  const textColorAnimation = useAnimatedStyle(() => {
    return {
      color: theme === 'dark' ? withTiming(themes.dark.text) : withTiming(themes.light.text)
    }
  })

  return (
    <TouchableWithoutFeedback onPress={() => {
      lowerPanelRef.current?.open()
      }}>
      <Animated.View style={[styles.contenedor, backgroundColorAnimation]}>
        <Animated.Text style={[styles.texto, textColorAnimation]}>{setting}</Animated.Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    marginTop: 8, 
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 20,
    width: '95%'
  },
  texto: {
    fontSize: 20,
  }
})

export default Button
