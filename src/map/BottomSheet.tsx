import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import themes from './../styles/themes.json'

type BottomSheetProps = {
  renderThis: () => JSX.Element[];
}

const BottomSheet = ({ renderThis }: BottomSheetProps): React.JSX.Element => {
  const theme = themes.light
  const insets = useSafeAreaInsets()
  const [panelHeight, setPanelHeight] = useState(1000)
  const OPEN = 0
  const CLOSE = Math.floor(panelHeight - 68)
  const translateY = useSharedValue(0)
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
  
  return (
    <>
    <GestureDetector gesture={gesture}>
      <Animated.View onLayout={ ({nativeEvent}) => {
        const {height} = nativeEvent.layout
        if (height) setPanelHeight(height)
      }}
      style={
        [styles.bottomSheet, animationStyle, {backgroundColor: theme.primary, bottom: insets.bottom}]
      }>
        <View style={[styles.line]} />
        <Text style={[styles.title]}>Rutas Matamoros</Text>
        <View style={[styles.bottomLine]} />
        <View>
          {renderThis()}
        </View>
      </Animated.View>
    </GestureDetector>
    </>
  )
}

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    width: '97%',
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 40,
    marginBottom: 10
  },
  line: {
    width: '20%',
    height: 4,
    alignSelf: 'center',
    borderRadius: 4,
    backgroundColor: themes.light.text
  },
  title: {
    paddingVertical: 8,
    fontWeight: '600',
    fontSize: 28,
    textAlign: 'center',
    color: themes.light.text
  },
  bottomLine: {
    width: '85%',
    height: 2,
    alignSelf: 'center',
    borderRadius: 4,
    backgroundColor: themes.light.text
  },
})

export default BottomSheet
