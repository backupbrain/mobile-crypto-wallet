import React, { useState, useRef } from 'react'
import { View, StyleSheet } from 'react-native'
import Screen from '../../components/Screen'
import PasswordInput from '../../components/inputs/PasswordInput'
import CreateNewPasswordInput from '../../components/inputs/CreateNewPasswordInput'
import ActivityButton from '../../components/buttons/ActiveButton'
import BodyText from '../../components/text/BodyText'
import translate from '../../translations'
import AdaptiveStorage from '../../utils/AdaptiveStorage'
import PassphraseManager from '../../utils/PassphraseManager'
import AppConstants from '../../utils/AppConstants'
import { useTheme } from '@react-navigation/native'

const ChangePassphraseView = ({ navigation, route }) => {
  const { dimensions } = useTheme()
  const passphraseManager = useRef(new PassphraseManager())
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassphrase, setnewPassphrase] = useState('')
  const [_doPassphrasesMatch, setdoPassphrasesMatch] = useState(null)
  const [isFormFilled, setIsFormFilled] = useState(false)
  const getCurrentPassword = async () => {
    const password = await AdaptiveStorage.get(AppConstants.PASSPHRASE_KEY)
    return password
  }
  const systemPassword = getCurrentPassword()
  const verifyFormFilled = (currentPassword, newPassphrase, doPassphrasesMatch) => {
    if (currentPassword === systemPassword && newPassphrase.length > 0 && currentPassword.length > 0 && doPassphrasesMatch) {
      setIsFormFilled(true)
    } else {
      setIsFormFilled(false)
    }
  }
  const saveNewPassphrase = (passphrase) => {
    passphraseManager.current.set(passphrase)
  }

  const styles = StyleSheet.create({
    screen: {
      paddingHorizontal: dimensions.screen.paddingHorizontal,
      paddingVertical: dimensions.screen.paddingVertical
    },
    createPassphraseBlock: {
      paddingVertical: dimensions.paddingVertical
    },
    textContainer: {
      paddingBottom: dimensions.paddingVertical
    }
  })

  const _onPasswordChangeHandler = (text) => {
    setCurrentPassword(text)
    verifyFormFilled(text, newPassphrase, _doPassphrasesMatch)
  }

  const _onNewPasswordChangeHandler = (passphrase) => {
    setnewPassphrase(passphrase)
  }

  const _onPasswordMatchHandler = (doPassphrasesMatch, newPassphrase) => {
    setdoPassphrasesMatch(doPassphrasesMatch)
    verifyFormFilled(currentPassword, newPassphrase, doPassphrasesMatch)
  }

  const _onPasswordVerifyChangeHandler = (text) => {}

  const _onActivityPressHandler = () => {
    saveNewPassphrase(newPassphrase)
    // TODO: create alert and reset all password inputs
    // navigation.push('ChangePasswordView')
  }

  return (
    <Screen>
      <View style={styles.screen}>
        <View style={styles.textContainer}>
          <BodyText>{translate('whyPassphrase')}</BodyText>
        </View>
        <PasswordInput
          placeholder={translate('currentPassphrase')}
          onChangeText={_onPasswordChangeHandler}
        />
        <CreateNewPasswordInput
          passwordPlaceholder={translate('newPassphrase')}
          passwordHelp={translate('passwordHelpText')}
          passwordVerifyPlaceholder={translate('verifyPassword')}
          passwordVerifyHelp={translate('verifyPasswordHelpText')}
          onPasswordChangeText={_onNewPasswordChangeHandler}
          onPasswordVerifyChangeText={_onPasswordVerifyChangeHandler}
          onPasswordsMatch={_onPasswordMatchHandler}
          style={styles.createPassphraseBlock}
        />
        <ActivityButton
          title={translate('changePassphrase')}
          onPress={_onActivityPressHandler}
          disabled={!isFormFilled}
        />
      </View>
    </Screen>
  )
}

export default ChangePassphraseView
