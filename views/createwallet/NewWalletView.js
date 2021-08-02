import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import RecoveryWordGrid from '../../components/inputs/RecoveryWordGrid'
import ActiveButton from '../../components/buttons/ActiveButton'
import DefaultTextLeft from '../../components/text/DefaultTextLeft'
import translate from '../../translations'
import bip39words from '../../utils/bip39words'

const NewWalletView = ({ navigation, route }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isRecoveryPhraseSet, setIsRecoveryPhraseSet] = useState(false)
  const [recoveryPhrase, setRecoveryPhrase] = useState([])
  useEffect(() => {
    // Update the document title using the browser API
    const phrase = []
    if (isRecoveryPhraseSet === false) {
      const totalBip39Words = bip39words.length
      for (let i = 0; i < 16; i++) {
        const randInt = Math.floor(Math.random() * totalBip39Words) + 1
        const randWord = bip39words[randInt]
        phrase.push(randWord)
        bip39words.splice(randInt, 0)
      }
      setRecoveryPhrase(phrase)
      setIsRecoveryPhraseSet(true)
    }
  })
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.textBlock}>
          <RecoveryWordGrid words={recoveryPhrase} visible={isVisible} />
        </View>
        <View style={styles.textBlock}>
          <DefaultTextLeft>{translate('dontLoseTheseWords')}</DefaultTextLeft>
          <DefaultTextLeft>{translate('ifYouLoseTheseWords')}</DefaultTextLeft>
        </View>
        <ActiveButton
          title={translate('pressAndHoldToReveal')}
          onPressIn={() => { setIsVisible(true) }}
          onPressOut={() => { setIsVisible(false) }}
        />
        <ActiveButton
          title={translate('next')}
          onPress={() => { navigation.push('VerifyRecoveryPhraseView', { recoveryPhrase }) }}
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
  textBlock: {
    paddingBottom: '12px',
    width: '100%'
  },
  button: {
    backgroundColor: '#00f',
    paddingVertical: '16px',
    paddingHorizontal: '20px',
    marginBottom: '10px'
  }
})

export default NewWalletView
