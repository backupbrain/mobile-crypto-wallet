import React, { useState, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import Screen from '../../components/Screen'
import ActiveButton from '../../components/buttons/ActiveButton'
import CreateNewPasswordInput from '../../components/inputs/CreateNewPasswordInput'
import translate from '../../translations'
import PinManager from '../../utils/PinManager'
import { useTheme } from '@react-navigation/native'
import BodyText from '../../components/text/BodyText'

/*
  {route.params?.from == 'load' && <ProgressStepBar steps={3} activeStep={2} />}
  {route.params?.from == 'create' && <ProgressStepBar steps={4} activeStep={3} />}
*/

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
      flex: 1,
      justifyContent: 'space-between'
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
    if (route.params?.firstScreen) {
      navigation.push('CreateWalletIntroView') // TODO: push route.params
    } else {
      navigation.push('WalletHomeViewSet')
    }
  }

  return (
    <Screen>
      <View style={styles.screen}>
        <View>
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
        </View>
        <View>
          <ActiveButton
            title={translate('createAccPin')}
            disabled={!isFormFilled}
            onPress={_onActivityPressHandler}
          />
        </View>
      </View>
    </Screen>
  )
}

export default CreatePinView
