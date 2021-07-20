import * as React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

const LinkButton = (props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
  },
  buttonText: {
    color: '#4174DE'
  }
})

export default LinkButton
