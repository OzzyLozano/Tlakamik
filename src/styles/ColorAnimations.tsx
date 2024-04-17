import { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import themes from './themes.json'

type Props = {
  theme: string | null | undefined
}

type ThemeAnimations = {
  primaryColorAnimation: () => any;
  backgroundColorAnimation: () => any;
  textColorAnimation: () => any;
};

const ColorAnimations = ({theme}: Props) => {

  const primaryColorAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor: theme === 'dark' ? withTiming(themes.dark.primary) : withTiming(themes.light.primary)
    }
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
  return { primaryColorAnimation, backgroundColorAnimation, textColorAnimation}
}

export default ColorAnimations
