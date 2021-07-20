import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ActivityButton from '../../components/buttons/ActiveButton'
import RecoveryPhraseInput from '../../components/inputs/RecoveryPhraseInput'
import translate from '../../translations'

const MAX_WORDS = 16

const previewRecoveryText = (words) => {
  return words.join(' ')
}

const VerifyRecoveryPhraseView = ({ navigation, route }) => {
  const [, _setWordCount] = useState(0)
  const [text, setText] = useState('')
  const [isFormFilled, setIsFormFilled] = useState(false)
  const [isInvalidRecoveryPhrase, setIsInvalidRecoveryPhrase] = useState(false)
  const setWordCount = (numWords) => {
    _setWordCount(numWords)
    setIsFormFilled(numWords >= MAX_WORDS)
  }
  let recoveryPhrase = null
  if (route.params && route.params.recoveryPhrase) {
    recoveryPhrase = route.params.recoveryPhrase
  }

  const isValidRecoveryPhrase = (text, recoveryPhrase) => {
    // TODO: also verify that each word in the recovery phrase is in the bip39words list
    const words = text.replace(/\s+/g, ' ').trim(' ').split(' ')
    const numWords = words.length
    if (numWords !== recoveryPhrase.length) {
      return false
    }
    for (let i = 0; i < numWords; i++) {
      const word = words[i]
      const recoveryWord = recoveryPhrase[i]
      if (word !== recoveryWord) {
        return false
      }
    }
    return true
  }

  const verifyRecoveryPhraseAndProceed = () => {
    if (recoveryPhrase !== null) {
      if (isValidRecoveryPhrase(text, recoveryPhrase) === true) {
        // TODO: load wallet from recovery phrase in pktd
        navigation.push('CreatePassphraseView')
      } else {
        setIsInvalidRecoveryPhrase(true)
      }
    } else {
      navigation.push('CreatePassphraseView')
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.inputContainer}>
          <RecoveryPhraseInput
            recoveryPhrase={recoveryPhrase}
            wordCountChanged={(wordCount) => setWordCount(wordCount)}
            onChangeText={(text) => {
              setIsInvalidRecoveryPhrase(false)
              setText(text)
            }}
            maxWords={MAX_WORDS}
            isInvalid={isInvalidRecoveryPhrase}
          />
        </View>
        <ActivityButton
          title={translate('next')}
          onPress={() => verifyRecoveryPhraseAndProceed()}
          disabled={!isFormFilled}
        />
        {/* FIXME: remove this when producing */}
        {route.params &&
          <Text style={styles.debugText}>{previewRecoveryText(route.params.recoveryPhrase)}</Text>}
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
  inputContainer: {
    marginBottom: '20px',
    width: '100%'
  },
  debugText: {
    color: '#f00',
    paddingTop: '20px'
  }
})

export default VerifyRecoveryPhraseView
