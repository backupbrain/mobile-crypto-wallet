import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

const BodyText = (props) => {
  const { colors, dimensions } = useTheme()

  const styles = StyleSheet.create({
    text: {
      color: colors.bodyText.color,
      fontSize: dimensions.bodyText.fontSize,
      fontWeight: dimensions.bodyText.fontWeight,
      fontFamily: dimensions.bodyText.fontFamily,
      textAlign: props.align || dimensions.bodyText.textAlign
    }
  })

  return (
    <Text style={[styles.text, props.style]}>{props.children}</Text>
  )
}

export default BodyText
