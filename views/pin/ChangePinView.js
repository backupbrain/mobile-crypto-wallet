import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Screen from '../../components/Screen'
import ActiveButton from '../../components/buttons/ActiveButton'
import PasswordInput from '../../components/inputs/PasswordInput'
import CreateNewPasswordInput from '../../components/inputs/CreateNewPasswordInput'
import translate from '../../translations'
import AppConstants from '../../utils/AppConstants'
import PinManager from '../../utils/PinManager'
import { useTheme } from '@react-navigation/native'

const ChangePinView = ({ navigation, route }) => {
  const { dimensions } = useTheme()
  const pinManager = useRef(new PinManager())
  const currentPinRef = useRef()
  const newPinRef = useRef()
  const [storedPin, setStoredPin] = useState('')
  const [currentPin, setCurrentPin] = useState('')
  const [pin1, setPin1] = useState('')
  const [pin2, setPin2] = useState('')
  const [isFormFilled, setisFormFilled] = useState('')
  const getStoredCurrentPin = async () => {
    const pin = await pinManager.get()
    return pin
  }
  const isCurrentPinCorrect = (pin) => {
    return pin === storedPin
  }
  const verifyFormFilled = (currentPin, pin1, pin2) => {
    let isFormFilled = false
    if (isCurrentPinCorrect(currentPin) && pin1.length === 4 && pin1 === pin2) {
      isFormFilled = true
    }
    setisFormFilled(isFormFilled)
    return isFormFilled
  }
  const changePin = () => {
    pinManager.current.set(pin1)
    setStoredPin(pin1)
    currentPinRef.current.clear()
    newPinRef.current.clear()
  }
  useEffect(() => {
    // if no PIN is set, force the user to create a new PIN
    const loadStoredPin = async () => {
      const pin = await getStoredCurrentPin()
      setStoredPin(pin)
      if (pin === undefined) {
        navigation.navigate('CreatePinView')
      }
    }
    loadStoredPin()
  }, [])

  const styles = StyleSheet.create({
    screen: {
      paddingHorizontal: dimensions.screen.paddingHorizontal,
      paddingVertical: dimensions.screen.paddingVertical
    },
    container: {
      marginBottom: dimensions.screen.paddingVertical
    },
    developer: {
      border: '1px solid #f00',
      marginBottom: dimensions.screen.paddingVertical,
      paddingHorizontal: dimensions.screen.paddingHorizontal,
      paddingVertical: dimensions.screen.paddingVertical
    }
  })

  return (
    <Screen>
      <View style={styles.screen}>
        <View style={styles.container}>
          <PasswordInput
            ref={currentPinRef}
            maxLength={4}
            placeholder={translate('currentPin')}
            onChangeText={(text) => {
              setCurrentPin(text)
              verifyFormFilled(text, pin1, pin2)
            }}
          />
          <CreateNewPasswordInput
            ref={newPinRef}
            maxLength={4}
            passwordPlaceholder={translate('pin')}
            passwordHelp={translate('pinHelpText')}
            passwordVerifyPlaceholder={translate('verifyPin')}
            passwordVerifyHelp=''
            onPasswordChangeText={(text) => {
              setPin1(text)
              verifyFormFilled(currentPin, text, pin2)
            }}
            onPasswordVerifyChangeText={(text) => {
              setPin2(text)
              verifyFormFilled(currentPin, pin1, text)
            }}
            onPasswordsMatch={(doPasswordsMatch, password) => {}}
          />
          {AppConstants.DEVELOPER_MODE && <Text style={styles.developer}>Current PIN: {storedPin}</Text>}
        </View>
        <ActiveButton
          title={translate('changePin')}
          disabled={!isFormFilled}
          onPress={() => {
            changePin()
            // TODO: set alert notifying user that pin has been changed
          }}
        />
      </View>
    </Screen>
  )
}

export default ChangePinView
