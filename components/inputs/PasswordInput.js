import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react'
import { Text, TextInput, View, StyleSheet } from 'react-native'
import translate from '../../translations'
import { useTheme } from '@react-navigation/native'

const PasswordInput = (props, ref) => {
  const { colors, dimensions } = useTheme()
  const textRef = useRef()
  const [text, setText] = useState('')
  const [doHide, setDoHide] = useState(true)
  let doHidePassword = true
  useImperativeHandle(ref, () => ({
    clear: () => textRef.current.clear()
  }))

  const styles = StyleSheet.create({
    container: {
      width: dimensions.inputs.width
    },
    label: {
      paddingBottom: dimensions.inputs.labelPaddingBottom,
      color: colors.inputs.labelColor
    },
    textInput: {
      flexDirection: 'row',
      width: '100%',
      backgroundColor: colors.inputs.backgroundColor,
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
    input: {
      paddingVertical: dimensions.inputs.paddingVertical,
      paddingLeft: dimensions.inputs.paddingHorizontal,
      paddingRight: dimensions.horizontalSpacingBetweenItemsShort,
      textAlign: 'right',
      flexGrow: 1,
      color: colors.inputs.color
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
    },
    showHideButton: {
      paddingVertical: dimensions.inputs.paddingVertical,
      paddingRight: dimensions.inputs.paddingHorizontal,
      color: colors.link.color,
      paddingLeft: dimensions.horizontalSpacingBetweenItems
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
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <View style={textInputStyles}>
        <TextInput
          ref={textRef}
          secureTextEntry={doHide}
          style={styles.input}
          placeholder={props.placeholder}
          value={text}
          onChangeText={(text) => {
            if (props.maxLength && props.maxLength > 0) {
              text = text.substr(0, props.maxLength)
            }
            setText(text)
            if (props.onChangeText) {
              props.onChangeText(text)
            }
          }}
        />
        <Text
          style={styles.showHideButton}
          onPress={() => {
            setDoHide(!doHide)
            doHidePassword = !doHidePassword
          }}
        >
          {doHide ? translate('show') : translate('hide')}
        </Text>
      </View>
      {props.help && !props.error && <Text style={[styles.supportingText, styles.helpText]}>{props.help}</Text>}
      {props.error && <Text style={[styles.supportingText, styles.errorText]}>{props.error}</Text>}
    </View>
  )
}

export default forwardRef(PasswordInput)
