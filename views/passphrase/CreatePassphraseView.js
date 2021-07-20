import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CreateNewPasswordInput from '../../components/inputs/CreateNewPasswordInput'
import ActivityButton from '../../components/buttons/ActiveButton'
import translate from '../../translations'
import PassphraseManager from '../../utils/PassphraseManager'

const CreatePassphraseView = ({ navigation, route }) => {
  const passphraseManager = new PassphraseManager()
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
    passphraseManager.set(passphrase)
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <Text style={styles.text}>{translate('whyPassphrase')}</Text>
        <View style={styles.inputContainer}>
          <CreateNewPasswordInput
            passwordPlaceholder={translate('newPassphrase')}
            passwordHelp={translate('passwordHelpText')}
            passwordVerifyPlaceholder={translate('verifyPassword')}
            passwordVerifyHelp={translate('verifyPasswordHelpText')}
            onPasswordChangeText={(text) => {
              setPassphrase(text)
            }}
            onPasswordVerifyChangeText={(text) => {}}
            onPasswordsMatch={(doPassphrasesMatch, password) => {
              verifyFormFilled(passphrase, doPassphrasesMatch)
            }}
          />
        </View>
        <ActivityButton
          title={translate('createPassphrase')}
          onPress={(passphrase) => {
            savePassphrase(passphrase)
            navigation.push('WalletCreatedView')
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
    justifyContent: 'flex-start',
    paddingHorizontal: '20px',
    paddingVertical: '20px'
  },
  inputContainer: {
    marginBottom: '8px',
    width: '100%'
  },
  text: {
    textAlign: 'left',
    paddingBottom: '20px'
  }
})

export default CreatePassphraseView
