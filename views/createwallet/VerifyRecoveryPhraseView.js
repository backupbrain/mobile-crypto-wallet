import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Screen from '../../components/Screen'
import ActivityButton from '../../components/buttons/ActiveButton'
import RecoveryPhraseInput from '../../components/inputs/RecoveryPhraseInput'
import { useTheme } from '@react-navigation/native'
import translate from '../../translations'

const MAX_WORDS = 16

const previewRecoveryText = (words) => {
  return words.join(' ')
}

const VerifyRecoveryPhraseView = ({ navigation, route }) => {
  const { dimensions } = useTheme()
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

  const styles = StyleSheet.create({
    screen: {
      paddingHorizontal: dimensions.screen.paddingHorizontal,
      paddingVertical: dimensions.screen.paddingVertical
    },
    inputContainer: {
      marginBottom: dimensions.screen.paddingVertical
    },
    debugText: {
      color: '#f00',
      marginBottom: dimensions.screen.paddingVertical
    }
  })

  return (
    <Screen>
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
    </Screen>
  )
}

export default VerifyRecoveryPhraseView
