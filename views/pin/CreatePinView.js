import React, { useState, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import Screen from '../../components/Screen'
import ActiveButton from '../../components/buttons/ActiveButton'
import CreateNewPasswordInput from '../../components/inputs/CreateNewPasswordInput'
import translate from '../../translations'
import PinManager from '../../utils/PinManager'
import { useTheme } from '@react-navigation/native'
import BodyText from '../../components/text/BodyText'

const CreatePinView = ({ navigation, route }) => {
  const { dimensions } = useTheme()
  const pinManager = useRef(new PinManager())
  const [pin1, setPin1] = useState('')
  const [pin2, setPin2] = useState('')
  const [isFormFilled, setisFormFilled] = useState(false)
  const verifyFormFilled = (pin1, pin2) => {
    let isFormFilled = false
    if (pin1.length === 4 && pin1 === pin2) {
      isFormFilled = true
    }
    setisFormFilled(isFormFilled)
    return isFormFilled
  }
  const savePin = () => {
    pinManager.current.set(pin1)
  }


  const styles = StyleSheet.create({
    screen: {
      paddingHorizontal: dimensions.screen.paddingHorizontal,
      paddingVertical: dimensions.screen.paddingVertical
    },
    inputContainer: {
      paddingVertical: dimensions.paddingVertical,
      paddingBottom: dimensions.paddingVertical
    }
  })


  const _onNewPasswordChangeHandler = (text) => {
    setPin1(text)
    verifyFormFilled(text, pin2)
  }

  const _onNewPasswordVerifyChangeHandler = (text) => {
    setPin2(text)
    verifyFormFilled(pin1, text)
  }

  const _onNewPasswordMatchHandler = (doPasswordsMatch, password) => { }

  const _onActivityPressHandler = () => {
    savePin()
    navigation.navigate('WalletHomeViewSet')

  }

  return (
    <Screen>
      <View style={styles.screen}>
        <BodyText>{translate('createPinIntro')}</BodyText>
        <View style={styles.inputContainer}>
          <CreateNewPasswordInput
            maxLength={4}
            passwordPlaceholder={translate('pin')}
            passwordHelp={translate('pinHelpText')}
            passwordVerifyPlaceholder={translate('verifyPin')}
            passwordVerifyHelp={translate('retypeNewPin')}
            onPasswordChangeText={_onNewPasswordChangeHandler}
            onPasswordVerifyChangeText={_onNewPasswordVerifyChangeHandler}
            onPasswordsMatch={_onNewPasswordMatchHandler}
            keyboardType='numeric'
          />
        </View>
        <ActiveButton
          title={translate('createPin')}
          disabled={!isFormFilled}
          onPress={_onActivityPressHandler}
        />
      </View>
    </Screen>
  )
}

export default CreatePinView
