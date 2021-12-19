import React, { useState, useImperativeHandle, forwardRef } from 'react'
import { Text, TextInput, View, StyleSheet } from 'react-native'
import translate from '../../translations'
import bip39words from '../../utils/bip39words'
import { useTheme } from '@react-navigation/native'

const DEFAULT_MAX_WORDS = 15

const SeedPhraseInput = (props, ref) => {
  const { colors, dimensions } = useTheme()
  const MAX_WORDS = props.maxWords || DEFAULT_MAX_WORDS
  const [text, setText] = useState('')
  const [isInvalid, setIsInvalid] = useState(false)
  // const [formattedText, setFormattedText] = useState('')
  const [wordCount, setWordCount] = useState(0)

  useImperativeHandle(ref, () => ({
    verify: () => verify()
  }))

  const getNumWordsRemaining = (text) => {
    // FIXME: remove empty words that cause incorrect count.
    if (text === '') {
      return MAX_WORDS
    }
    const strippedText = text.replace(/\s+/g, ' ')
    return MAX_WORDS - strippedText.trim(' ').split(' ').length
  }

  const verify = () => {
    return verifyWords(text.split(' '))
  }

  const verifyWords = (words) => {
    let isValid = true
    if (words.length > MAX_WORDS) {
      isValid = false
    } else {
      for (let i = 0; i < (words.length); i++) {
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

  const onBlur = () => {
    console.log('onBlur()')
    setRecoveryText(text)
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
      marginBottom: 20
    },
    textInput: {
      // letterSpacing: 1.2,
      fontSize: 16,
      height: 200,
      marginBottom: dimensions.verticalSpacingBetweenItems,
      // lineHeight: 1.5,
      backgroundColor: colors.inputs.backgroundColor,
      color: colors.seedPhraseInput.color,
      paddingHorizontal: dimensions.inputs.paddingHorizontal,
      paddingVertical: dimensions.inputs.paddingVertical,
      borderRadius: dimensions.seedPhraseInput.borderRadius,
      borderWidth: dimensions.inputs.borderWidth,
      // borderColor: colors.inputs.borderColor,
      fontWeight: dimensions.seedPhraseInput.fontWeight
    },
    textInputRegular: {
      borderColor: colors.inputs.borderColor
    },
    textInputError: {
      borderColor: colors.inputs.borderErrorColor
    },
    helpText: {
      color: colors.inputs.color,
      alignItems: 'flex-start',
      flexWrap: 'wrap'
    },
    errorText: {
      color: colors.inputs.errorTextColor,
      alignItems: 'flex-start',
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
        onBlur={() => onBlur()}
        onEndEditing={() => onBlur()}
        value={text}
        multiline
        autoCapitalize='none'
        clearButtonMode='while-editing'
        spellCheck
        placeholderTextColor={colors.inputs.placeholderTextColor}
      />
      {isInvalid
        ? (
          <Text style={styles.errorText}>
            {translate('invalidRecoveryPhrase')}
          </Text>)
        : (
          <Text style={styles.helpText}>
            {translate('recoveryPhraseNumWordsRemaining', { numWordsRemaining: DEFAULT_MAX_WORDS - wordCount })}
          </Text>
        )}
    </View>
  )
}

export default forwardRef(SeedPhraseInput)
