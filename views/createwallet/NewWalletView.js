import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import Screen from '../../components/Screen'
import RecoveryWordGrid from '../../components/inputs/RecoveryWordGrid'
import ActiveButton from '../../components/buttons/ActiveButton'
import BodyText from '../../components/text/BodyText'
import translate from '../../translations'
import { useTheme } from '@react-navigation/native'
import bip39words from '../../utils/bip39words'

const NewWalletView = ({ navigation, route }) => {
  const { dimensions } = useTheme()
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

  const styles = StyleSheet.create({
    screen: {
      paddingHorizontal: dimensions.screen.paddingHorizontal,
      paddingVertical: dimensions.screen.paddingVertical
    },
    recoveryWordGrid: {
      paddingBottom: dimensions.paddingVertical
    },
    paragraph: {
      paddingBottom: dimensions.verticalSpacingBetweenItems
    },
    textBlock: {
      paddingBottom: dimensions.paddingVertical
    },
    firstButton: {
      marginBottom: dimensions.paddingVertical
    }
  })

  return (
    <Screen>
      <View style={styles.screen}>
        <View style={styles.textBlock}>
          <BodyText style={styles.paragraph}>{translate('dontLoseTheseWords')}</BodyText>
          <BodyText>{translate('ifYouLoseTheseWords')}</BodyText>
        </View>
        <View style={styles.recoveryWordGrid}>
          <RecoveryWordGrid words={recoveryPhrase} visible={isVisible} />
        </View>
        <ActiveButton
          title={translate('pressAndHoldToReveal')}
          onPressIn={() => { setIsVisible(true) }}
          onPressOut={() => { setIsVisible(false) }}
          style={styles.firstButton}
        />
        <ActiveButton
          title={translate('next')}
          onPress={() => { navigation.push('VerifyRecoveryPhraseView', { recoveryPhrase }) }}
        />
      </View>
    </Screen>
  )
}

export default NewWalletView
