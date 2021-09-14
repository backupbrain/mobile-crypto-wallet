import React, { useState, useRef } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Screen from '../../components/Screen'
import ActivityButton from '../../components/buttons/ActiveButton'
import RecoveryPhraseInput from '../../components/inputs/RecoveryPhraseInput'
import PktManager from '../../utils/PktManager'
import { useTheme } from '@react-navigation/native'
import translate from '../../translations'
import BodyText from '../../components/text/BodyText'

const MAX_WORDS = 15

const previewRecoveryText = (words) => {
  return words.join(' ')
}

const VerifyRecoveryPhraseView = ({ navigation, route }) => {
  const { dimensions } = useTheme()
  const [, _setWordCount] = useState(0)
  const [text, setText] = useState('')
  const [isFormFilled, setIsFormFilled] = useState(false)
  const [isInvalidRecoveryPhrase, setIsInvalidRecoveryPhrase] = useState(false)
  const [recoveryPhrase] = useState(route?.params?.recoveryPhrase ?? null)
  const pktManager = useRef(new PktManager())
  const setWordCount = (numWords) => {
    _setWordCount(numWords)
    setIsFormFilled(numWords == MAX_WORDS)
  }

  const isValidRecoveryPhrase = (text, recoveryPhrase) => {
    // TODO: also verify that each word in the recovery phrase is in the bip39words list
    // TODO: verify against actual recovery phrase
    const words = text.replace(/\s+/g, ' ').trim(' ').split(' ')
    const numWords = words.length
    if (numWords !== MAX_WORDS) {
      return false
    }

    if (!recoveryPhrase) return true

    for (let i = 0; i < numWords; i++) {
      const word = words[i]
      const recoveryWord = recoveryPhrase[i]
      if (word !== recoveryWord) {
        return false
      }
    }
    return true
  }

  const verifyRecoveryPhraseAndProceed = async () => {
    if (recoveryPhrase !== null) {
      if (isValidRecoveryPhrase(text, recoveryPhrase) === true) {
        navigation.push('CreatePassphraseView')
      } else {
        setIsInvalidRecoveryPhrase(true)
      }
    } else {
      // FIXME: for testing, we can just move to the next screen
      if (isValidRecoveryPhrase(text, null)) {
        // TODO: implement openWallet in PktManager
        await pktManager.current.openWallet(text).then(
          value => {
            if (value) {
              navigation.reset({
                index: 0,
                routes: [{ name: 'FirstViewSet' }],
              });
            }
          }
        )
      } else {
        setIsInvalidRecoveryPhrase(true)
      }
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
    },
    textContainer: {
      paddingBottom: dimensions.paddingVertical
    }
  })

  const _onRecoveryChangeHandler = (text) => {
    setIsInvalidRecoveryPhrase(false)
    setText(text)
  }

  return (
    <Screen>
      <View style={styles.screen}>
        <View style={styles.textContainer}>
          <BodyText>{recoveryPhrase ? translate('verifyRecoveryPhraseCreateWalletIntro') : translate('verifyRecoveryPhraseLoadWalletIntro')}</BodyText>
        </View>
        <View style={styles.inputContainer}>
          <RecoveryPhraseInput
            recoveryPhrase={recoveryPhrase}
            wordCountChanged={(wordCount) => setWordCount(wordCount)}
            onChangeText={_onRecoveryChangeHandler}
            maxWords={MAX_WORDS}
            isInvalid={isInvalidRecoveryPhrase}
          />
        </View>
        <ActivityButton
          title={translate('next')}
          onPress={verifyRecoveryPhraseAndProceed}
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
