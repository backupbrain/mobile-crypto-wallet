import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet } from 'react-native'
import Screen from '../../components/Screen'
import RecoveryWordGrid from '../../components/inputs/RecoveryWordGrid'
import ActiveButton from '../../components/buttons/ActiveButton'
import BodyText from '../../components/text/BodyText'
import PktManager from '../../utils/PktManager'
import translate from '../../translations'
import { useTheme } from '@react-navigation/native'

const NewWalletView = ({ navigation, route }) => {
  const { dimensions } = useTheme()
  const [isVisible, setIsVisible] = useState(false)
  const [isRecoveryPhraseSet, setIsRecoveryPhraseSet] = useState(false)
  const [recoveryPhrase, setRecoveryPhrase] = useState([])
  const pktManager = useRef(new PktManager())

  const openWalletAndGetRecoveryPhrase = async () => {
    const recoveryPhrase = await pktManager.current.createWallet()
    console.log('recoveryPhrase')
    console.log(recoveryPhrase.join(' '))
    setRecoveryPhrase(recoveryPhrase)
    setIsRecoveryPhraseSet(true)
  }
  useEffect(() => {
    // Update the document title using the browser API
    if (isRecoveryPhraseSet === false) {
      openWalletAndGetRecoveryPhrase()
    }
  }, [])
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
