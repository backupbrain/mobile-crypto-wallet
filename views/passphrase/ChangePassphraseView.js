import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import PasswordInput from '../../components/inputs/PasswordInput'
import CreateNewPasswordInput from '../../components/inputs/CreateNewPasswordInput'
import ActivityButton from '../../components/buttons/ActiveButton'
import DefaultTextLeft from '../../components/text/DefaultTextLeft'
import translate from '../../translations'
import AdaptiveStorage from '../../utils/AdaptiveStorage'
import PassphraseManager from '../../utils/PassphraseManager'
import AppConstants from '../../utils/AppConstants'

const ChangePassphraseView = ({ navigation, route }) => {
  const passphraseManager = new PassphraseManager()
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
    passphraseManager.set(passphrase)
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.textContainer}>
          <DefaultTextLeft>{translate('whyPassphrase')}</DefaultTextLeft>
        </View>
        <PasswordInput
          placeholder={translate('currentPassphrase')}
          onChangeText={(text) => {
            setCurrentPassword(text)
            verifyFormFilled(text, newPassphrase, _doPassphrasesMatch)
          }}
        />
        <CreateNewPasswordInput
          passwordPlaceholder={translate('newPassphrase')}
          passwordHelp={translate('passwordHelpText')}
          passwordVerifyPlaceholder={translate('verifyPassword')}
          passwordVerifyHelp={translate('verifyPasswordHelpText')}
          onPasswordChangeText={(passphrase) => {
            setnewPassphrase(passphrase)
          }}
          onPasswordVerifyChangeText={(text) => {}}
          onPasswordsMatch={(doPassphrasesMatch, newPassphrase) => {
            setdoPassphrasesMatch(doPassphrasesMatch)
            verifyFormFilled(currentPassword, newPassphrase, doPassphrasesMatch)
          }}
        />
        <ActivityButton
          title={translate('changePassphrase')}
          onPress={() => {
            saveNewPassphrase(newPassphrase)
            // TODO: create alert and reset all password inputs
            // avigation.push('ChangePasswordView')
          }}
          disabled={!isFormFilled}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
    flex: 1
  },
  screen: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: '20px',
    paddingVertical: '20px'
  },
  textContainer: {
    paddingBottom: '12px',
    width: '100%'
  }
})

export default ChangePassphraseView
