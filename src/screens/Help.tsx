import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import axios from 'axios'

import themes from '../styles/themes.json'

type Props = {
}

const Home = ({}: Props): React.JSX.Element => {
  const {width} = useWindowDimensions()
  const [reason, setReason] = useState('')
  const [email, setEmail] = useState('')
  const [msj, setMsj] = useState('')
  const url = ''

  const handleSubmit = async () => {
    try {
      await axios.post(url, {
        motivo: reason,
        correo: email,
        mensaje: msj
      })
      Alert.alert('Formulario enviado', 'Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.')
    } catch (error) {
      console.error('Error al enviar el formulario:', error)
      Alert.alert('Oh no:(', 'Ocurrió un error al enviar el formulario. Por favor, inténtalo de nuevo más tarde.')
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.card, {width: width*.9}]}>
        <Text style={styles.text}>Contactarnos</Text>
      </View>
      <View style={[styles.form, {width: width*.9}]}>
        <View style={styles.formTitle}>
          <Text style={styles.text}>Déjanos un Comentario</Text>
        </View>

        <View style={styles.formItem}>
          <Text style={styles.label}>Motivo:</Text>
          <TextInput 
            style={[styles.input, {width: width*.6}]}
            value={reason}
            onChangeText={setReason}
            placeholder="Motivo de su Mensaje"
          />
        </View>

        <View style={styles.formItem}>
          <Text style={styles.label}>Correo:</Text>
          <TextInput 
            style={[styles.input, {width: width*.6}]}
            value={email}
            onChangeText={setEmail}
            placeholder="Ingrese su Correo"
            keyboardType='email-address'
          />
        </View>

        <View style={styles.formItem}>
          <Text style={styles.label}>Mensaje:</Text>
          <TextInput 
            style={[styles.input, styles.textArea, {width: width*.6}]}
            value={msj}
            onChangeText={setMsj}
            placeholder="Deje aquí su mensaje"
            multiline={true}
            numberOfLines={4}
          />
        </View>

        <View style={styles.btn}>
          <Button title='Enviar' onPress={handleSubmit} />
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.light.background,
  },
  text: {
    color: themes.light.text,
    fontSize: 24,
    textAlign: 'center',
  },
  card: {
    alignSelf: 'center',
    backgroundColor: themes.light.card,
    padding: 20,
    marginTop: 15,
    borderRadius: 30,
  },
  form: {
    alignSelf: 'center',
    backgroundColor: themes.light.card,
    paddingVertical: 20,
    marginTop: 15,
    borderRadius: 16,
  },
  formTitle: {
    marginBottom: 12,
  },
  formItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: themes.light.card,
    paddingHorizontal: 12,
    marginVertical: 12,
    borderRadius: 16,
  },
  label: {
    fontSize: 20,
    color: themes.light.text,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: themes.light.border,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  btn: {
    alignSelf: 'center',
    width: '69%'
  },
})

export default Home
