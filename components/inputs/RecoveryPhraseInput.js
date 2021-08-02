import React, { useState } from 'react'
import { Text, TextInput, View, StyleSheet } from 'react-native'
import translate from '../../translations'
import bip39words from '../../utils/bip39words'
import { useTheme } from '@react-navigation/native'

const DEFAULT_MAX_WORDS = 16

const RecoveryPhraseInput = (props) => {
  const { colors, dimensions } = useTheme()
  const MAX_WORDS = props.maxWords || DEFAULT_MAX_WORDS
  const [text, setText] = useState('')
  const [isInvalid, setIsInvalid] = useState(false)
  // const [formattedText, setFormattedText] = useState('')
  const [, setWordCount] = useState(0)
  const getNumWordsRemaining = (text) => {
    // FIXME: remove empty words that cause incorrect count.
    if (text === '') {
      return MAX_WORDS
    }
    const strippedText = text.replace(/\s+/g, ' ')
    return MAX_WORDS - strippedText.trim(' ').split(' ').length
  }

  const verifyWords = (words) => {
    let isValid = true
    if (words.length > DEFAULT_MAX_WORDS) {
      isValid = false
    } else {
      for (let i = 0; i < (words.length - 1); i++) {
        const word = words[i]
        if (!bip39words.includes(word)) {
          isValid = false
          break
        }
      }
    }
    setIsInvalid(!isValid)
    return isValid
  }
  const setRecoveryText = (text) => {
    const words = text.replace(/\s+/g, ' ').split(' ')
    const wordCount = MAX_WORDS - getNumWordsRemaining(text)
    if (wordCount > MAX_WORDS) {
      words.splice(MAX_WORDS, wordCount)
    }
    const resultingText = words.join(' ')
    setText(resultingText)
    setWordCount(wordCount)
    verifyWords(words)
    return [resultingText, wordCount]
  }

  const styles = StyleSheet.create({
    container: {
      width: dimensions.inputs.width,
      marginBottom: '20px'
    },
    textInput: {
      letterSpacing: '1.2',
      fontSize: '1.50em',
      height: '200px',
      marginBottom: '8px',
      lineHeight: '1.5',
      backgroundColor: colors.inputs.backgroundColor,
      color: colors.inputs.color,
      paddingHorizontal: dimensions.button.paddingHorizontal,
      paddingVertical: dimensions.button.paddingVertical,
      borderRadius: dimensions.inputs.borderRadius,
      borderWidth: dimensions.inputs.borderWidth
    },
    textInputRegular: {
      borderColor: colors.inputs.borderColor
    },
    textInputError: {
      borderColor: colors.inputs.borderErrorColor
    },
    helpText: {
      color: colors.inputs.helpTextColor,
      alignItems: 'top',
      flexWrap: 'wrap'
    },
    errorText: {
      color: colors.inputs.errorTextColor,
      alignItems: 'top',
      flexWrap: 'wrap'
    }
  })

  const textInputStyles = [styles.textInput]
  if (props.error) {
    textInputStyles.push(styles.textInputError)
  } else {
    textInputStyles.push(styles.textInputRegular)
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={textInputStyles}
        placeholder={translate('recoveryPhrasePlaceholder')}
        onChangeText={t => {
          const [resultingText, numWords] = setRecoveryText(t)
          props.wordCountChanged(numWords)
          props.onChangeText(resultingText)
        }}
        value={text}
        multiline
        autoCapitalize='none'
        clearButtonMode='while-editing'
      />
      {!isInvalid &&
        <Text
          style={styles.helpText}
        >
          {translate('recoveryPhraseNumWordsRemaining', { numWordsRemaining: getNumWordsRemaining(text) })}
        </Text>}
      {isInvalid &&
        <Text
          style={styles.errorText}
        >
          {translate('invalidRecoveryPhrase')}
        </Text>}
    </View>
  )
}

export default RecoveryPhraseInput
