import React, { useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import themes from '../styles/themes.json'

const ArrowComponent = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  return (
    <View style={[styles.backbtn, {backgroundColor: themes.light.background}]}>
      <Animated.View style={[styles.arrow, { transform: [{ scale: scaleAnim }] }]}>
        <View style={[styles.arrowTop, styles.arrowPart]} />
        <View style={[styles.arrowBottom, styles.arrowPart]} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  backbtn: {
    padding: 14,
    borderRadius: 14,
  },
  arrow: {
    height: 14,
    width: 14,
    transform: [{ translateX: -50 }, { translateY: -50 }],
    right: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowPart: {
    width: '100%',
    height: 2,
    backgroundColor: themes.light.border,
  },
  arrowTop: {
    transform: [{ rotate: '45deg' }],
    top: '40%',
  },
  arrowBottom: {
    transform: [{ rotate: '-45deg' }],
    bottom: '40%',
  },
});

export default ArrowComponent;
