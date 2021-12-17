import React, { useState, useRef } from 'react'
import { View, StyleSheet } from 'react-native'
import Screen from '../../components/Screen'
import BodyText from '../../components/text/BodyText'
import CreateNewPasswordInput from '../../components/inputs/CreateNewPasswordInput'
import ActivityButton from '../../components/buttons/ActiveButton'
import Checkbox from '../../components/buttons/Checkbox'
import translate from '../../translations'
import PassphraseManager from '../../utils/PassphraseManager'
import { useTheme } from '@react-navigation/native'

const CreatePassphraseView = ({ navigation, route }) => {
  const { dimensions } = useTheme()
  const passphraseManager = useRef(new PassphraseManager())
  const [passphrase, setPassphrase] = useState('')
  const [doPassphrasesMatch, setDoPassphrasesMatch] = useState(null)
  const [isFormFilled, setIsFormFilled] = useState(false)
  const [isPasswordRecoveryCertifyChecked, _setIsPasswordRecoveryCertifyChecked] = useState(false)
  const [isPasswordStoredChecked, _setIsPasswordStoredChecked] = useState(false)
  const verifyFormFilled = (password, doPassphrasesMatch, isPasswordRecoveryCertifyChecked, isPasswordStoredChecked) => {
    if (password.length > 0 && doPassphrasesMatch && isPasswordRecoveryCertifyChecked && isPasswordStoredChecked) {
      setIsFormFilled(true)
    } else {
      setIsFormFilled(false)
    }
  }
  const savePassphrase = (passphrase) => {
    passphraseManager.current.set(passphrase)
  }

  const styles = StyleSheet.create({
    screen: {
      justifyContent: 'space-between',
      flex: 1
    },
    inputContainer: {
      paddingVertical: dimensions.paddingVertical
    },
    checkbox: {
      marginRight: dimensions.horizontalSpacingBetweenItems,
      marginTop: 2
    }
  })

  const setIsPasswordStoredChecked = (isPasswordStoredChecked) => {
    _setIsPasswordStoredChecked(isPasswordStoredChecked)
    verifyFormFilled(passphrase, doPassphrasesMatch, isPasswordRecoveryCertifyChecked, isPasswordStoredChecked)
    console.log(`setIsPasswordStoredChecked(${isPasswordStoredChecked})`)
  }

  const setIsPasswordRecoveryCertifyChecked = (isPasswordRecoveryCertifyChecked) => {
    _setIsPasswordRecoveryCertifyChecked(isPasswordRecoveryCertifyChecked)
    verifyFormFilled(passphrase, doPassphrasesMatch, isPasswordRecoveryCertifyChecked, isPasswordStoredChecked)
    console.log(`setIsPasswordRecoveryCertifyChecked(${isPasswordRecoveryCertifyChecked})`)
  }

  const _onPasswordChangeHandler = (text) => {
    setPassphrase(text)
  }

  const _onPasswordVerifyChangeHandler = (text) => { }

  const _onPasswordMatchHandler = (doPassphrasesMatch, password) => {
    setDoPassphrasesMatch(doPassphrasesMatch)
    verifyFormFilled(password, doPassphrasesMatch, isPasswordStoredChecked, isPasswordStoredChecked)
  }

  const _onActivityPressHandler = () => {
    savePassphrase(passphrase)
    if (route.params?.firstScreen) {
      navigation.push('CreatePinView') // TODO: push route.params
    } else {
      navigation.push('WalletHomeViewSet')
    }
  }

  return (
    <Screen>
      <View style={styles.screen}>
        <View>
          <BodyText>{translate('whyPassphrase')}</BodyText>
          <View style={styles.inputContainer}>
            <CreateNewPasswordInput
              passwordPlaceholder={translate('newPassphrase')}
              passwordHelp={translate('passwordHelpText')}
              passwordVerifyPlaceholder={translate('verifyPassword')}
              passwordVerifyHelp={translate('verifyPasswordHelpText')}
              onPasswordChangeText={_onPasswordChangeHandler}
              onPasswordVerifyChangeText={_onPasswordVerifyChangeHandler}
              onPasswordsMatch={_onPasswordMatchHandler}
            />
          </View>
          <View>
            <Checkbox
              onValueChange={(value) => setIsPasswordRecoveryCertifyChecked(value)}
              label={translate('passphraseWarningCheckbox')}
            />
            <Checkbox
              onValueChange={(value) => setIsPasswordStoredChecked(value)}
              label={translate('iHaveSavedMyPassword')}
            />
          </View>
        </View>
        <View>
          <ActivityButton
            title={translate('createPassphrase')}
            onPress={_onActivityPressHandler}
            disabled={!isFormFilled}
          />
        </View>
      </View>
    </Screen>
  )
}

export default CreatePassphraseView
