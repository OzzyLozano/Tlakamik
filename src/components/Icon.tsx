import { Canvas, Circle, Group, LinearGradient, Mask } from "@shopify/react-native-skia"
import { useEffect } from "react"
import { StyleSheet } from "react-native"
import { useDerivedValue, useSharedValue, withSpring, withTiming } from "react-native-reanimated"

type Props = {
  theme: string | null | undefined
}

const RADIUS = 18
const Icon = ({theme}: Props) => {
  const gradientColor1 = useSharedValue('#ff4467')
  const gradientColor2 = useSharedValue('#ff8e0b')
  const cy = useSharedValue(0)
  const mask = useSharedValue(0)

  const colors = useDerivedValue(() => {
    return [gradientColor1.value, gradientColor2.value]
  })
  
  useEffect(() => {
    if (theme === 'light') {
      cy.value = withTiming(0)
      mask.value = withTiming(0)
      gradientColor1.value = withTiming('#ff4467')
      gradientColor2.value = withTiming('#ff8e0b')
    } else {
      cy.value = withSpring(RADIUS/2, {duration: 2000})
      mask.value = withSpring(RADIUS, {duration: 2000})
      gradientColor1.value = withTiming('#8371ff')
      gradientColor2.value = withTiming('#86bfff')
    }
  }, [gradientColor1, gradientColor2, theme])

  return (
    <Canvas style={styles.contenedor}>
      <Mask mode="luminance" mask={
        <Group>
          <Circle color={'white'} cx={RADIUS} cy={RADIUS} r={RADIUS} />
          <Circle color={'black'} cx={RADIUS} cy={cy} r={mask} />
        </Group>
      }>
        <Circle cx={RADIUS} cy={RADIUS} r={RADIUS} />
        <LinearGradient colors={colors} transform={[{rotate: -90}]} origin={{x: RADIUS, y: RADIUS}} start={{x:0, y:0}} end={{x: RADIUS*2, y: RADIUS*2}} />
      </Mask>
    </Canvas>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    transform: [{rotate: '45deg'}],
    margin: 7
  },
})

export default Icon
