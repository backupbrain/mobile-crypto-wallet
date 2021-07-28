import React, { useState, useRef, useMemo, createRef } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import TwoFactorAuth from '../../utils/TwoFactorAuth'
import translate from '../../translations'

const OtpInput = (props) => {
  const numChars = 6
  const pinInputRefs = useMemo(() => Array(numChars).fill(0).map(i => createRef()), [])
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState(false)
  const twoFactorAuth = new TwoFactorAuth(translate('pktWallet'), translate('pktWallet'))
  const validatePin = (pin) => {
    const isPinValid = twoFactorAuth.isPinValid(pin)
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
  return (
    <View style={styles.container}>
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
            style={styles.charInput}
          />
        ))}
      </View>
      {(!pinError && props.help) && <Text style={styles.helpText}>{props.help}</Text>}
      {(pinError && props.error) && <Text style={styles.errorText}>{props.error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row'
  },
  charInput: {
    backgroundColor: '#F1F2F4',
    color: '#424A52',
    paddingVertical: '16px',
    width: '100%',
    borderRadius: 6,
    marginRight: '10px',
    textAlign: 'center'
  },
  label: {
    paddingBottom: '10px'
  },
  helpText: {
    color: '#666',
    paddingTop: '10px',
    paddingHorizontal: '6px'
  },
  errorText: {
    color: '#600',
    paddingTop: '10px',
    paddingHorizontal: '6px'
  }
})

export default OtpInput
