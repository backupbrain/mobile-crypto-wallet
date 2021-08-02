import * as React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

const LinkButton = (props) => {
  const { colors, dimensions } = useTheme()

  const styles = StyleSheet.create({
    button: {
    },
    buttonText: {
      fontWeight: dimensions.link.fontWeight,
      textTransform: dimensions.link.textTransform,
      textAlign: dimensions.link.textAlign,
      textDecoration: dimensions.link.textDecoration,
      color: colors.link.color
    }
  })

  return (
    <TouchableOpacity style={[styles.button, props.style]} onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  )
}

export default LinkButton
