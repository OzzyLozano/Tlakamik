import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, { interpolate, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useState } from 'react';

import themes from './../../styles/themes.json'
import routes from '../Map/Routes/routes.json'

type Props = {
  toggleRouteVisibility: (index: number) => void
  showRoutes: boolean[]
}

const BottomSheet = ({toggleRouteVisibility, showRoutes}: Props): React.JSX.Element => {
  const theme = themes.light
  const insets = useSafeAreaInsets()
  const translateY = useSharedValue(0)
  const [panelHeight, setPanelHeight] = useState(1000)
  const OPEN = 0
  const CLOSE = Math.floor(panelHeight - 68)
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

  const displayRoutes = () => {
    return Object.values(routes).map((route, index) => {
      const crossAnimation = useSharedValue({width: 36, height: 36})
      const rotate = useSharedValue(0)
      const rotation = useDerivedValue(() => {
        return interpolate(rotate.value, [0, 45], [0, 45])
      })
      const transformStyle = useAnimatedStyle(() => {
        return {
          transform: [{ rotate: `${(rotation.value)}deg` }]
        }
      })
      const animateCross = useAnimatedStyle(() => {
        return {
          width: withTiming(crossAnimation.value.width, { duration: 500 }),
          height: withTiming(crossAnimation.value.height, { duration: 500 }),
          backgroundColor: withSpring(showRoutes[index] ? route.info.color : '#000', { duration: 300 })
        }
      })
      const startCrossAnimation = () => {
        const getRotation = () => { return showRoutes[index] ? 45: 0 }
        rotate.value = withTiming(getRotation(), { duration: 500 })
        crossAnimation.value = showRoutes[index] ? {width: 8, height: 42} : {width: 36, height: 36}
      }
      const handleRouteVisibility = (index: number) => {
        startCrossAnimation()
        toggleRouteVisibility(index)
      }
      const { info } = route
      if (!info) return null
      else return (
        <React.Fragment key={info.nombre}>
          <TouchableWithoutFeedback style={[styles.route]} onPress={() => {
            handleRouteVisibility(index)
          }}>
            <Animated.Text style={[styles.name, {color: theme.text}]}>{info.nombre}</Animated.Text>
            <Animated.View style={[styles.show]}>
              <Animated.View style={[styles.cross, animateCross, transformStyle, {backgroundColor: info.color}]} />
            </Animated.View>
            {/* <Animated.Text style={[styles.schedule, {color: theme.text}]}>{info.horario}</Animated.Text> */}
          </TouchableWithoutFeedback>
        </React.Fragment>
      )
    })
  }

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View onLayout={ ({nativeEvent}) => {
        const {height} = nativeEvent.layout
        if (height) setPanelHeight(height)
      }}
      style={
        [styles.bottomSheet, animationStyle, {backgroundColor: theme.primary, bottom: insets.bottom}]
      }>
        <View style={[styles.line, {backgroundColor: theme.text}]} />
        <Animated.Text style={[styles.title, {color: theme.text}]}>Rutas Matamoros</Animated.Text>
        <View style={[styles.bottomLine, {backgroundColor: theme.text}]} />
        <View>
          {displayRoutes()}
        </View>
      </Animated.View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  bottomSheet: {
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
    justifyContent: 'space-between',
    width: '80%',
    alignSelf: 'center',
    marginVertical: 10,
    marginHorizontal: 25,
  },
  title: {
    paddingVertical: 8,
    fontWeight: '600',
    fontSize: 28,
    textAlign: 'center',
  },
  bottomLine: {
    width: '90%',
    height: 2,
    alignSelf: 'center',
    borderRadius: 4
  },
  show: {
    marginRight: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cross: {
    borderRadius: 18,
  },
  name: {
    marginRight: 6,
    fontWeight: '500',
    fontSize: 20
  },
  schedule: {
    marginHorizontal: 8,
    fontSize: 20
  },
})

export default BottomSheet
