import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react'
import { TextInput, View, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import BodyText from '../text/BodyText'
import translate from '../../translations'
import { useTheme } from '@react-navigation/native'
import EyeOpen from '../images/EyeOpen'
import EyeClosed from '../images/EyeClosed'

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
      flexGrow: 1,
      paddingHorizontal: dimensions.inputs.paddingHorizontal,
      paddingVertical: dimensions.inputs.paddingVertical,
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
      paddingHorizontal: dimensions.inputs.paddingVertical,
      justifyContent: 'center'
    }
  })

  const getTextInputStyle = () => {
    const textInputStyles = [styles.textInput]
    if (props.error) {
      textInputStyles.push(styles.textInputError)
    } else {
      textInputStyles.push(styles.textInputRegular)
    }
    return textInputStyles
  }

  const _buttonOnPressHandler = () => {
    setDoHide(!doHide)
    doHidePassword = !doHidePassword
  }

  const getKeyboardType = () => {

    if (!props.keyboardType)
      return 'default'
    if (props.keyboardType === 'numeric')
      return Platform.OS === 'android' ? 'numeric' : 'number-pad'
    else
      return props.keyboardType
  }


  return (
    <View style={[styles.container, props.style]}>
      {props.label && <BodyText style={styles.label}>{props.label}</BodyText>}
      <View style={getTextInputStyle()}>
        <TextInput
          ref={textRef}
          secureTextEntry={doHide}
          style={styles.input}
          placeholder={props.placeholder}
          value={text}
          autoCapitalize='none'
          keyboardType={getKeyboardType()}
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
        <TouchableOpacity
          onPress={_buttonOnPressHandler}
          style={styles.showHideButton}
        >
          {doHide ? <EyeClosed color={colors.bodyText.color} /> : <EyeOpen color={colors.bodyText.color} />}
        </TouchableOpacity>
      </View>
      {/* Double negative needed to prevent warning */}
      {(!!props.help && !props.error) && <BodyText style={[styles.helpText, styles.supportingText]}>{props.help}</BodyText>}
      {!!props.error && <BodyText style={[styles.errorText, styles.supportingText]}>{props.error}</BodyText>}
    </View>
  )
}

export default forwardRef(PasswordInput)
