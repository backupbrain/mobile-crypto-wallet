import React, { useState } from 'react'
import { Text, TextInput, View, StyleSheet } from 'react-native'

const GenericTextInput = (props) => {
  const [text, setText] = useState('')
  return (
    <View style={styles.object}>
      <TextInput
        style={styles.textInput}
        placeholder={props.placeholder}
        value={text}
        onChangeText={(text) => {
          setText(text)
          if (props.onChangeText) {
            props.onChangeText(text)
          }
        }}
      />
      {props.help && <Text style={styles.helpText}>{props.help}</Text>}
      {props.error && <Text style={styles.errorText}>{props.error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  object: {
    paddingBottom: '16px',
    width: '100%'
  },
  textInput: {
    backgroundColor: '#F1F2F4',
    color: '#424A52',
    paddingHorizontal: '20px',
    paddingVertical: '16px',
    width: '100%',
    borderRadius: 6
  },
  helpText: {
    color: '#666',
    paddingTop: '10px',
    paddingHorizontal: '6px'
  },
  errorText: {
    color: '#600',
    paddingTop: '10px',
    paddingHorizontal: '6px'
  }
})

export default GenericTextInput
