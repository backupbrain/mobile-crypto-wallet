import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import Screen from '../../components/Screen'
import ActivityButton from '../../components/buttons/ActiveButton'
import RecoveryPhraseInput from '../../components/inputs/RecoveryPhraseInput'
import PktManager from '../../utils/PktManager'
import { useTheme } from '@react-navigation/native'
import translate from '../../translations'
import BodyText from '../../components/text/BodyText'
import ProgressStepBar from '../../components/ProgressStepBar'
import SmallButton from '../../components/buttons/SmallButton'
import { set } from 'lodash'


const MAX_WORDS = 15

const previewRecoveryText = (words) => {
  return words.join(' ')
}

const SeedPhraseWord = ({ chosenWords, word, index, handleClick, disabled }) => {

  const { dimensions, colors } = useTheme()

  const styles = StyleSheet.create({
    middleWord: {
      marginHorizontal: disabled ? dimensions.horizontalSpacingBetweenItems : dimensions.shortPadding
    },
    word: {
      marginBottom: disabled ? dimensions.shortPadding : dimensions.paddingVertical,
      justifyContent: 'center',
      alignItems: 'center',
      width: disabled ? 90 : 100,
      borderRadius: 8
    },
    activeWord: {
      backgroundColor: colors.primaryButton.backgroundColor
    }

  })

  const wordStyle = (index, item) => {
    let style = [styles.word]
    if (index % 3 == 1) {
      style.push(styles.middleWord)
    }
    if (!disabled && chosenWords.find(word => word == item)) {
      style.push(styles.activeWord)
    }
    return style
  }

  return (
    <SmallButton
      height={disabled ? 25 : 30}
      style={wordStyle(index, word)}
      onPress={handleClick}
    >
      <BodyText>{word}</BodyText>
    </SmallButton>
  )
}

const VerifyRecoveryPhraseView = ({ navigation, route }) => {
  const { dimensions, colors } = useTheme()
  const [, _setWordCount] = useState(0)
  const [text, setText] = useState('')
  const [isFormFilled, setIsFormFilled] = useState(false)
  const [isInvalidRecoveryPhrase, setIsInvalidRecoveryPhrase] = useState(false)
  const [recoveryPhrase] = useState(route?.params?.recoveryPhrase ?? null)
  const shuffledSeedPhrase = useMemo(() => route?.params?.recoveryPhrase ? [...recoveryPhrase].sort(() => 0.5 - Math.random()) : null, [])
  const [chosenWords, setChosenWords] = useState([])
  const [error, setError] = useState(false)
  const pktManager = useRef(new PktManager())

  useEffect(()=>{
    if(!recoveryPhrase){
      navigation.setOptions({
        title:translate('enterSeedPhrase')
      })
    }
  },[])

  const setWordCount = (numWords) => {
    _setWordCount(numWords)
    /* setIsFormFilled(numWords == MAX_WORDS) */
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
        /* navigation.reset({
          index: 0,
          routes: [{ name: 'FirstViewSet' }],
        }); */
        navigation.push('CreatePinView', { from: 'create' })
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
              navigation.push('WalletPassphraseView')
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
      paddingHorizontal: dimensions.screens.horizontal,
      paddingBottom: dimensions.screens.bottomPadding,
      paddingTop: dimensions.screens.topPadding,
      flex: 1,
      justifyContent: 'space-between'
    },
    inputContainer: {
      marginBottom: dimensions.screen.paddingVertical,
      marginTop: dimensions.horizontalSpacingBetweenItems
    },
    debugText: {
      color: '#f00',
      marginBottom: dimensions.screen.paddingVertical
    },
    textContainer: {
      paddingBottom: dimensions.paddingHorizontal
    },
    seedPhraseBox: {
      height: 200,
      borderRadius: 15,
      borderColor: colors.inputs.borderColor,
      borderWidth: dimensions.inputs.borderWidth,
      padding: dimensions.horizontalSpacingBetweenItems
    },
    errorSeedBox: {
      borderColor: colors.inputs.errorTextColor
    },
    helpText: {
      color: error ? colors.inputs.errorTextColor : colors.inputs.color,
      alignItems: 'top',
      flexWrap: 'wrap',
      marginTop: dimensions.horizontalSpacingBetweenItems
    }

  })

  const seedBoxStyle = () => {
    const style = [styles.seedPhraseBox]
    if (chosenWords.length == MAX_WORDS && !isValidRecoveryPhrase(text, recoveryPhrase)) {
      style.push(styles.errorSeedBox)
    }

    return style
  }

  const _onRecoveryChangeHandler = (text) => {
    setIsInvalidRecoveryPhrase(false)
    setIsFormFilled(isValidRecoveryPhrase(text, recoveryPhrase))
    setText(text)
  }

  useEffect(() => {
    setIsInvalidRecoveryPhrase(false)
    const text = chosenWords.join(' ')
    setIsFormFilled(isValidRecoveryPhrase(text, recoveryPhrase))
    setText(text)
    if (chosenWords.length == MAX_WORDS && !isValidRecoveryPhrase(text, recoveryPhrase)) {
      setError(true)
    } else
      setError(false)

  }, [chosenWords])

  return (
    <Screen>
      <View style={styles.screen}>
        <View>
          {recoveryPhrase ? <ProgressStepBar steps={4} activeStep={2} /> : <ProgressStepBar steps={3} activeStep={0} />}
          <View style={styles.textContainer}>
            <BodyText>{recoveryPhrase ? translate('verifyRecoveryPhraseCreateWalletIntro') : translate('verifyRecoveryPhraseLoadWalletIntro')}</BodyText>
          </View>
          <View style={styles.inputContainer}>
            {recoveryPhrase ?
              <>
                <View style={seedBoxStyle()}>
                  <FlatList
                    contentContainerStyle={{ alignSelf: 'center' }}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={chosenWords}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item, index }) =>
                      <SeedPhraseWord word={(index + 1) + '.' + item} index={index} chosenWords={chosenWords} disabled
                        handleClick={() => {
                          let array = [...chosenWords]
                          setChosenWords(array.filter(word => word != item))
                        }}
                      />
                    }
                  />
                </View>
                <Text
                  style={styles.helpText}
                >
                  {error ? translate('seedPhraseNotMatch') : translate('recoveryPhraseNumWordsRemaining', { numWordsRemaining: MAX_WORDS - chosenWords.length })}
                </Text>
              </>
              :
              <RecoveryPhraseInput
                recoveryPhrase={recoveryPhrase}
                wordCountChanged={(wordCount) => setWordCount(wordCount)}
                onChangeText={_onRecoveryChangeHandler}
                maxWords={MAX_WORDS}
                isInvalid={isInvalidRecoveryPhrase}
              />
            }
          </View>
          {recoveryPhrase &&
            <FlatList
              contentContainerStyle={{ alignSelf: 'center' }}
              numColumns={3}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={shuffledSeedPhrase}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item, index }) =>
                <SeedPhraseWord word={item} index={index} chosenWords={chosenWords}
                  handleClick={() => {
                    if (chosenWords.find(word => word == item)) return
                    let array = [...chosenWords]
                    array.push(item)
                    setChosenWords(array)
                  }}
                />
              }
            />
          }
        </View>
        <View>
          <ActivityButton
            title={translate('confirm')}
            onPress={verifyRecoveryPhraseAndProceed}
            disabled={!isFormFilled}
          />
        </View>
        {/* FIXME: remove this when producing */}
        {/* route.params &&
          <Text style={styles.debugText}>{previewRecoveryText(route.params.recoveryPhrase)}</Text> */}
      </View>
    </Screen>
  )
}

export default VerifyRecoveryPhraseView
