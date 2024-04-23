import { StyleSheet, TouchableWithoutFeedback} from 'react-native';
import { LowerPanelMethods } from './LowerPanel';
import Animated, {  } from 'react-native-reanimated';

type Props = {
  lowerPanelRef: React.RefObject<LowerPanelMethods>
  setting: string
}

const Button = ({lowerPanelRef, setting}: Props) => {

  return (
    <TouchableWithoutFeedback onPress={() => {
      lowerPanelRef.current?.open()
      }}>
      <Animated.View style={[styles.contenedor]}>
        <Animated.Text style={[styles.texto]}>{setting}</Animated.Text>
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
