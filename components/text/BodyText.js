import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

const BodyText = (props) => {
  const { colors, dimensions } = useTheme()
  const textAlign = props.textAlign || dimensions.bodyText.textAlign

  const styles = StyleSheet.create({
    container: {
      width: dimensions.bodyText.width,
      paddingVertical: dimensions.bodyText.betweenParagraphPadding,
      textAlign: textAlign
    },
    text: {
      color: colors.bodyText.color,
      fontSize: dimensions.bodyText.fontSize,
      fontWeight: dimensions.bodyText.fontWeight,
      lineHeight: dimensions.bodyText.lineHeight
    }
  })

  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  )
}

export default BodyText
