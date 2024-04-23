import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useState } from 'react';

import themes from './../../styles/themes.json'
import routes from '../Map/Routes/routes.json'

type Props = {
  toggleRouteVisibility: (routeName: string) => void
}

const BottomSheet = ({toggleRouteVisibility}: Props): React.JSX.Element => {
  const numberOfRoutes = Object.keys(routes).length === 1 ? 1:Object.keys(routes).length
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
    return Object.values(routes).map(route => {
      const { info } = route
      if (!info) return null
      else return (
        <React.Fragment>
          <TouchableWithoutFeedback style={[styles.route]} onPress={() => {
            toggleRouteVisibility(info.nombre)
          }}>
            <Animated.View style={[styles.icon, {backgroundColor: info.color}]} />
            <Animated.Text style={[styles.name, {color: theme.text}]}>{info.nombre}</Animated.Text>
            <Animated.Text style={[styles.schedule, {color: theme.text}]}>{info.horario}</Animated.Text>
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
      }
      } style={[styles.bottomSheet, animationStyle, {backgroundColor: theme.background, bottom: insets.bottom}]}>
        <Animated.View style={[styles.line, {backgroundColor: theme.text}]} />
          <Animated.Text style={[styles.title, {color: theme.text}]}>Rutas Matamoros</Animated.Text>
          {displayRoutes()}
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
  },
  title: {
    paddingVertical: 8,
    fontWeight: '600',
    fontSize: 28
  },
  icon: {
    marginHorizontal: 12,
    marginVertical: 3,
    width: 36,
    height: 36,
    borderRadius: 18
  },
  name: {
    marginHorizontal: 12,
    fontWeight: '500',
    fontSize: 20
  },
  schedule: {
    marginHorizontal: 12,
    fontSize: 20
  },
})

export default BottomSheet
