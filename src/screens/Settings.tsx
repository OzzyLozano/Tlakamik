import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';

const Settings= () => {
  const SettingsStack = createNativeStackNavigator();

  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name='Settings' component={ NormalSettings } />
      <SettingsStack.Screen name='AdvancedSettings' component={ AdvancedSettings } />
    </SettingsStack.Navigator>
  )
}

const NormalSettings = () => {
  return (
    <View>
      <Text style={{textAlign:'center'}}>Ajustes</Text>
    </View>
  )
}

const AdvancedSettings = () => {
  return (
    <View>
      <Text style={{textAlign:'center'}}>Ajustes Avanzados</Text>
    </View>
  )
}

export default Settings
