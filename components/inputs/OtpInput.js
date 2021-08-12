import React, { useState, useMemo, createRef, useRef } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import TwoFactorAuth from '../../utils/TwoFactorAuth'
import translate from '../../translations'
import { useTheme } from '@react-navigation/native'

const OtpInput = (props) => {
  const { colors, dimensions } = useTheme()
  const numChars = 6
  const pinInputRefs = useMemo(() => Array(numChars).fill(0).map(i => createRef()), [])
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState(false)
  const twoFactorAuth = useRef(new TwoFactorAuth(translate('pktWallet'), translate('pktWallet')))
  const validatePin = (pin) => {
    const isPinValid = twoFactorAuth.current.isPinValid(pin)
    setPinError(isPinValid)
    if (isPinValid && props.onValidPin) {
      props.onValidPin(pin)
    }
  }
  const updatePin = (text, position) => {
    setPinError(false)
    if (text !== '') {
      if (pin.length > position) {
        const newPin = pin.substr(0, position - 1) + text + pin.substr(position, pin.length)
        setPin(newPin)
      } else {
        setPin(`${pin}${text}`)
      }
      if (position < pinInputRefs.length - 1) {
        pinInputRefs[position + 1].current.focus()
      } else {
        validatePin(pin)
      }
    }
  }
  const deleteChar = (position) => {
    setPinError(false)
    const newPin = pin.substr(0, position)
    setPin(newPin)
    if (position > 0) {
      pinInputRefs[position - 1].current.focus()
    }
  }
  const charAtPosition = (position) => {
    if (position <= pin.length) {
      return pin.substr(position, 1)
    } else {
      return ''
    }
  }

  const styles = StyleSheet.create({
    container: {
      width: '100%'
    },
    inputContainer: {
      width: '100%',
      flexDirection: 'row'
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
      borderBottomWidth: dimensions.inputs.borderBottomWidth,
      textAlign: 'center'
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
  if (pinError && props.error) {
    textInputStyles.push(styles.textInputError)
  } else {
    textInputStyles.push(styles.textInputRegular)
  }

  return (
    <View style={[styles.container, props.style]}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <View style={styles.inputContainer}>
        {pinInputRefs.map((pinInputRef, index) => (
          <TextInput
            key={index}
            ref={pinInputRef}
            onChangeText={(text) => updatePin(text, index)}
            onKeyPress={(nativeEvent) => {
              if (nativeEvent.key === 'Backspace') {
                deleteChar(index)
              }
            }}
            value={charAtPosition(index)}
            autoCompleteType='off'
            autoCorrect={false}
            clearTextOnFocus
            keyboardType='number-pad'
            maxLength={1}
            selectTextOnFocus
            textAlign='center'
            style={textInputStyles}
          />
        ))}
      </View>
      {(!pinError && props.help) && <Text style={[styles.supportingText, styles.helpText]}>{props.help}</Text>}
      {(pinError && props.error) && <Text style={[styles.supportingText, styles.errorText]}>{props.error}</Text>}
    </View>
  )
}

export default OtpInput
