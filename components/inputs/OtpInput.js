import React, { useState, useMemo, createRef, useEffect } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import BodyText from '../text/BodyText'
import TwoFactorAuth from '../../utils/TwoFactorAuth'
import translate from '../../translations'
import { useTheme } from '@react-navigation/native'

const OtpInput = (props) => {
  const { colors, dimensions } = useTheme()
  const numChars = 6
  const pinInputRefs = useMemo(() => Array(numChars).fill(0).map(i => createRef()), [])
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState(false)

  // REDUNDANT :
  /* const [twoFactorAuth, setTwoFactorAuth] = useState(null)
  const [is2FaInitialized, setIs2FaInitialized] = useState(false)
  const [, setIs2FaReady] = useState(false) 
  const user = translate('pktWallet')
  const service = translate('pktWallet') */

  const validatePin = (pin) => {
    const isPinValid = TwoFactorAuth.isPinValid(pin,props.secret)
    setPinError(!isPinValid)
    if (isPinValid && props.onValidPin) {
      props.onValidPin(pin)
    }
  }
  const updatePin = (text, position) => {
    setPinError(false)
    let newPin
    if (text !== '') {
      if (pin.length > position) {
        newPin = pin.substr(0, position - 1) + text + pin.substr(position, pin.length)
        setPin(newPin)
      } else {
        newPin = `${pin}${text}`
        setPin(newPin)
      }
      if (position < pinInputRefs.length - 1) {
        pinInputRefs[position + 1].current.focus()
      } else {
        validatePin(newPin)
      }
    }
  }
  const deleteChar = (position) => {
    setPinError(false)
    const newPin = pin.substr(0, position-1)
    setPin(newPin)
    if (position > 0) {
      pinInputRefs[position - 1].current.focus()
    }
  }
  const charAtPosition = (position) => {
    if (pin[position]) {
      return pin.substr(position, 1)
    } else {
      return ''
    }
  }

  // REDUNDANT :
  /* useEffect(() => {
    const initializeTwoFactorAuth = async () => {
      if (!is2FaInitialized) {
        const twoFactorAuth = new TwoFactorAuth(user, service)
        setTwoFactorAuth(twoFactorAuth)
        setIs2FaInitialized(true)
        await twoFactorAuth.initialize()
        setIs2FaReady(true)
      }
    }
    initializeTwoFactorAuth()
  }, [is2FaInitialized]) */

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
      textAlign: 'center',
      outlineStyle: 'none'
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
      {props.label && <BodyText style={styles.label}>{props.label}</BodyText>}
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
      {(!pinError && props.help) && <BodyText style={[styles.supportingText, styles.helpText]}>{props.help}</BodyText>}
      {(pinError && props.error) && <BodyText style={[styles.supportingText, styles.errorText]}>{props.error}</BodyText>}
    </View>
  )
}

export default OtpInput
