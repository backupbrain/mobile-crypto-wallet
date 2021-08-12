import React, { useState, useEffect } from 'react'
import { TextInput, View, StyleSheet } from 'react-native'
import BodyText from '../text/BodyText'
import { useTheme } from '@react-navigation/native'

const GenericTextInput = (props) => {
  const { colors, dimensions } = useTheme()
  const [text, setText] = useState('')
  const placeholder = props.placeholder || props.label

  useEffect(() => {
    if (props.initialValue) {
      setText(props.initialValue)
    }
  }, [props.initialValue, setText])

  const styles = StyleSheet.create({
    container: {
      width: dimensions.inputs.width
    },
    label: {
      paddingBottom: dimensions.inputs.labelPaddingBottom,
      color: colors.inputs.labelColor
    },
    textInput: {
      width: '100%',
      backgroundColor: colors.inputs.backgroundColor,
      color: colors.inputs.color,
      paddingHorizontal: dimensions.inputs.paddingHorizontal,
      paddingVertical: dimensions.inputs.paddingVertical,
      borderRadius: dimensions.inputs.borderRadius,
      borderTopWidth: dimensions.inputs.borderTopWidth,
      borderLeftWidth: dimensions.inputs.borderLeftWidth,
      borderRightWidth: dimensions.inputs.borderRightWidth,
      borderBottomWidth: dimensions.inputs.borderBottomWidth
    },
    textInputRegular: {
      borderTopColor: colors.inputs.borderTopColor,
      borderLeftColor: colors.inputs.borderLeftColor,
      borderRightColor: colors.inputs.borderRightColor,
      borderBottomColor: colors.inputs.borderBottomColor
    },
    textInputError: {
      borderTopColor: colors.inputs.borderTopErrorColor,
      borderLeftColor: colors.inputs.borderLeftErrorColor,
      borderRightColor: colors.inputs.borderRightErrorColor,
      borderBottomColor: colors.inputs.borderBottomErrorColor
    },
    helpText: {
      color: colors.inputs.helpTextColor
    },
    errorText: {
      color: colors.inputs.errorTextColor
    },
    supportingText: {
      paddingTop: dimensions.inputs.supportingTextPaddingTop,
      paddingHorizontal: dimensions.inputs.supportingTextPaddingHorizontal
    }
  })

  const textInputStyles = [styles.textInput]
  if (props.error) {
    textInputStyles.push(styles.textInputError)
  } else {
    textInputStyles.push(styles.textInputRegular)
  }

  return (
    <View style={[styles.container, props.style]}>
      {props.label && <BodyText style={styles.label}>{props.label}</BodyText>}
      <TextInput
        style={textInputStyles}
        placeholder={placeholder}
        value={text}
        onChangeText={(text) => {
          setText(text)
          if (props.onChangeText) {
            props.onChangeText(text)
          }
        }}
      />
      {(props.help && !props.error) && <BodyText style={[styles.helpText, styles.supportingText]}>{props.help}</BodyText>}
      {props.error && <BodyText style={[styles.errorText, styles.supportingText]}>{props.error}</BodyText>}
    </View>
  )
}

export default GenericTextInput
