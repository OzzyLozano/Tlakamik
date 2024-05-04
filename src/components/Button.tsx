import { StyleSheet, TouchableWithoutFeedback} from 'react-native';
import { LowerPanelMethods } from './LowerPanel';
import Animated from 'react-native-reanimated';

import theme from '../styles/themes.json'

type Props = {
  lowerPanelRef: React.RefObject<LowerPanelMethods>
  setting: string
}

const Button = ({lowerPanelRef, setting}: Props) => {

  return (
    <TouchableWithoutFeedback onPress={() => {
      lowerPanelRef.current?.open()
      }}>
      <Animated.View style={[styles.container, {backgroundColor: theme.light.card}]}>
        <Animated.Text style={[styles.text, {color: theme.light.text}]}>{setting}</Animated.Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8, 
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 20,
    width: '95%'
  },
  text: {
    fontSize: 20,
  }
})

export default Button
