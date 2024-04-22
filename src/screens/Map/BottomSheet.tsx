import { Dimensions, StyleSheet, useColorScheme } from 'react-native';
import themes from './../../styles/themes.json'
import { Gesture, GestureDetector, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Routes from './Routes/routes.json'
import { useState } from 'react';

const BottomSheet = (): React.JSX.Element => {
  const theme = useColorScheme() === 'dark' ? themes.dark : themes.light
  const insets = useSafeAreaInsets()
  const translateY = useSharedValue(0)
  const [panelHeight, setPanelHeight] = useState(1000)
  const OPEN = 0
  const CLOSE = panelHeight * .6  + insets.bottom
  const gesture = Gesture.Pan().onUpdate((event) => {
    if (event.translationY < 0)
      translateY.value = withSpring(OPEN, {damping: 100, stiffness: 400})
    else 
      translateY.value = withSpring(CLOSE, {damping: 100, stiffness: 400})
  }).onEnd(() => {
    if (translateY.value > 50)
      translateY.value = withSpring(CLOSE, {damping: 100, stiffness: 400})
    else
      translateY.value = withSpring(OPEN, {damping: 100, stiffness: 400})
  })

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}]
    }
  })

  const route = Routes.prueba.info

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View onLayout={ ({nativeEvent}) => {
        const {height} = nativeEvent.layout
        if (height) setPanelHeight(height)
      }
      } style={[styles.container, animationStyle, {backgroundColor: theme.background, bottom: insets.bottom}]}>
        <Animated.View style={[styles.line, {backgroundColor: theme.text}]} />
        <Animated.Text style={[styles.title, {color: theme.text}]}>Rutas Matamoros</Animated.Text>
        <TouchableWithoutFeedback style={[styles.route]} onPress={() => {
          route.show = !route.show
        }}>
          <Animated.View style={[styles.icon, {backgroundColor: route.color}]} />
          <Animated.Text style={[styles.name, {color: theme.text}]}>{route.nombre}</Animated.Text>
          <Animated.Text style={[styles.schedule, {color: theme.text}]}>{route.horario}</Animated.Text>
        </TouchableWithoutFeedback>
      </Animated.View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '97%',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 40,
    marginBottom: 10
  },
  line: {
    width: '20%',
    height: 4,
    alignSelf: 'center',
    borderRadius: 4
  },
  route: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    paddingTop: 12,
    fontWeight: '600',
    fontSize: 28
  },
  icon: {
    paddingHorizontal: 10,
    width: 35,
    height: 35,
    borderRadius: 18
  },
  name: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontWeight: '500',
    fontSize: 20
  },
  schedule: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 20
  },
})

export default BottomSheet
