import { LayoutChangeEvent, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import React, { useCallback, useEffect, useState } from 'react'
import themes from './../styles/themes.json'

export type BottomSheetProps = {
  renderThis: () => JSX.Element
  title: string
}

const BottomSheet = ({ title, renderThis }: BottomSheetProps): React.JSX.Element => {
  const theme = themes.light
  const insets = useSafeAreaInsets()
  const [panelHeight, setPanelHeight] = useState<number>(1000)
  const translateY = useSharedValue(0)
  const heightSharedValue = useSharedValue(panelHeight)

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    if (height) {
      setPanelHeight(height)
      heightSharedValue.value = height
      console.log(heightSharedValue, height)
    }
  }, [heightSharedValue])

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      const OPEN = 0
      const CLOSE = heightSharedValue.value - 64
      if (event.translationY < 0) 
        translateY.value = withSpring(OPEN, { damping: 100, stiffness: 400 })
       else 
        translateY.value = withSpring(CLOSE, { damping: 100, stiffness: 400 })
    })
    .onEnd(() => {
      const OPEN = 0
      const CLOSE = heightSharedValue.value - 64
      if (translateY.value > 50) 
        translateY.value = withSpring(CLOSE, { damping: 100, stiffness: 400 })
       else 
        translateY.value = withSpring(OPEN, { damping: 100, stiffness: 400 })
    })

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}]
    }
  })

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        onLayout={handleLayout}
        style={[
          styles.bottomSheet,
          animationStyle,
          { backgroundColor: theme.primary, bottom: insets.bottom },
        ]}
      >
        <View style={[styles.line]} />
        <Text style={[styles.title]}>{title}</Text>
        <View style={[styles.bottomLine]} />
        <View>
          {renderThis()}
        </View>
      </Animated.View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    alignSelf: 'center',
    width: '95%',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 40,
    marginBottom: 10,
    maxHeight: 300,
  },
  line: {
    width: '20%',
    height: 4,
    alignSelf: 'center',
    borderRadius: 4,
    backgroundColor: themes.light.text,
  },
  title: {
    paddingVertical: 8,
    fontWeight: '600',
    fontSize: 28,
    textAlign: 'center',
    color: themes.light.text,
  },
  bottomLine: {
    width: '85%',
    height: 2,
    alignSelf: 'center',
    borderRadius: 4,
    backgroundColor: themes.light.text,
  },
})

export default BottomSheet
