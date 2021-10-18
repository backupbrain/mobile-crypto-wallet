import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

const HeaderText = (props) => {
  const { colors, dimensions } = useTheme()

  const styles = StyleSheet.create({
    text: {
      color: colors.headerText.color,
      fontSize: dimensions.headerText.fontSize,
      fontWeight: dimensions.headerText.fontWeight,
      lineHeight: dimensions.headerText.lineHeight,
      textAlign: dimensions.headerText.textAlign,
      fontFamily:dimensions.headerText.fontFamily
    }
  })

  return (
    <Text style={[styles.text, props.style]}>{props.children}</Text>
  )
}

export default HeaderText
