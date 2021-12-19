import React, { useState, useRef } from 'react'
import { View, StyleSheet } from 'react-native'
import translate from '../../translations'
import ActiveButton from '../../components/buttons/ActiveButton'
import Screen from '../../components/Screen'
import BodyText from '../../components/text/BodyText'
import SeedPhraseInput from '../../components/inputs/SeedPhraseInput'
import PktManager from '../../utils/PktManager'

const MAX_WORDS = PktManager.SEED_PHRASE_LENGTH

const EnterSeedPhraseView = ({ navigation, route }) => {
  const [, setWordCount] = useState(0)
  const [isFormFilled, setIsFormFilled] = useState(false)
  const [isInvalidRecoveryPhrase, setIsInvalidRecoveryPhrase] = useState(false)
  const [, setSeedPhrase] = useState('')
  const [seedWords, setSeedWords] = useState([])
  const seedPhraseInputRef = useRef(null)

  const isValidRecoveryPhrase = (seedWords) => {
    const numWords = seedWords.length
    if (numWords !== MAX_WORDS) {
      return false
    }
    return true
  }

  const _onRecoveryChangeHandler = (text) => {
    const seedWords = text.replace(/\s+/g, ' ').trim(' ').split(' ')
    setSeedWords(seedWords)
    setIsInvalidRecoveryPhrase(false)
    setIsFormFilled(isValidRecoveryPhrase(seedWords))
    setSeedPhrase(text)
  }

  const verifyRecoveryPhraseAndProceed = () => {
    console.log(seedPhraseInputRef)
    const isRecoveryPhraseValid = seedPhraseInputRef.current.verify()
    setIsInvalidRecoveryPhrase(isRecoveryPhraseValid)
    setIsFormFilled(isRecoveryPhraseValid)
    if (isRecoveryPhraseValid) {
      navigation.push('EnterExistingWalletPasswordView', { seedWords })
    }
  }

  const styles = StyleSheet.create({
    infoText: {
      marginBottom: 32 // dimensions.verticalSpacingBetweenItems
    },
    fillContainer: {
      flexGrow: 1
    }
  })

  return (
    <Screen>
      <View style={styles.fillContainer}>
        <BodyText style={styles.infoText}>{translate('verifyRecoveryPhraseLoadWalletIntro')}</BodyText>
        <SeedPhraseInput
          ref={seedPhraseInputRef}
          wordCountChanged={(numWords) => setWordCount(numWords)}
          onChangeText={(text) => _onRecoveryChangeHandler(text)}
          maxWords={MAX_WORDS}
          isInvalid={isInvalidRecoveryPhrase}
        />
      </View>
      <ActiveButton
        title={translate('confirm')}
        disabled={!isFormFilled}
        onPress={() => verifyRecoveryPhraseAndProceed()}
      />
    </Screen>
  )
}

export default EnterSeedPhraseView
