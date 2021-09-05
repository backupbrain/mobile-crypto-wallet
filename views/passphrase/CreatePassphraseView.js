import React, { useState, useRef } from 'react'
import { View, StyleSheet } from 'react-native'
import Screen from '../../components/Screen'
import BodyText from '../../components/text/BodyText'
import CreateNewPasswordInput from '../../components/inputs/CreateNewPasswordInput'
import ActivityButton from '../../components/buttons/ActiveButton'
import translate from '../../translations'
import PassphraseManager from '../../utils/PassphraseManager'
import { useTheme } from '@react-navigation/native'

const CreatePassphraseView = ({ navigation, route }) => {
  const { dimensions } = useTheme()
  const passphraseManager = useRef(new PassphraseManager())
  const [passphrase, setPassphrase] = useState('')
  const [isFormFilled, setIsFormFilled] = useState(false)
  const verifyFormFilled = (password, doPassphrasesMatch) => {
    if (password.length > 0 && doPassphrasesMatch) {
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
      paddingHorizontal: dimensions.screen.paddingHorizontal,
      paddingVertical: dimensions.screen.paddingVertical
    },
    inputContainer: {
      paddingVertical: dimensions.paddingVertical
    }
  })

  const _onPasswordChangeHandler = (text) => {
    setPassphrase(text)
  }

  const _onPasswordVerifyChangeHandler = (text) => { }

  const _onPasswordMatchHandler = (doPassphrasesMatch, password) => {
    verifyFormFilled(password, doPassphrasesMatch)
  }

  const _onActivityPressHandler = () => {
    savePassphrase(passphrase)
    if (route.params?.firstScreen) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'FirstViewSet' }],
      });
    } else {
      navigation.push('WalletHomeViewSet')
    }
  }

  return (
    <Screen>
      <View style={styles.screen}>
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
        <ActivityButton
          title={translate('createPassphrase')}
          onPress={_onActivityPressHandler}
          disabled={!isFormFilled}
        />
      </View>
    </Screen>
  )
}

export default CreatePassphraseView
