import React, { useState } from 'react'
import { Text, TextInput, View, StyleSheet } from 'react-native'
import translate from '../../translations'
import bip39words from '../../utils/bip39words'

const DEFAULT_MAX_WORDS = 16

/*
const getNumBip39Words = () => {
  let longestWord = 0
  for (const index in bip39words) {
    const word = bip39words[index]
    const wordLength = word.length
    if (wordLength >= longestWord) {
      longestWord = wordLength
    }
  }
  return longestWord
}
/* */

const RecoveryPhraseInput = (props) => {
  const MAX_WORDS = props.maxWords || DEFAULT_MAX_WORDS
  const [text, setText] = useState('')
  // const [formattedText, setFormattedText] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const getNumWordsRemaining = (text) => {
    // FIXME: remove empty words that cause incorrect count.
    if (text === '') {
      return MAX_WORDS
    }
    const strippedText = text.replace(/\s+/g, ' ')
    return MAX_WORDS - strippedText.trim(' ').split(' ').length
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
    return [resultingText, wordCount]
  }

  /*
  const formatText = (text) => {
    const words = text.replace(/\s+/g, ' ').trim(' ').split(' ')
    // alternate: odd: spaces, even; newline
    let output = ''
    for (let i = 0; i < wordCount; i++) {
      const word = words[i]
      output += word
      if ((i % 2) === 1) {
        output += '\n'
      } else {
        output += ' '.repeat(2 + getNumBip39Words() - word.length)
      }
    }
    setFormattedText(output)
  }
  /* */

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputText}
        onChangeText={t => {
          const [resultingText, numWords] = setRecoveryText(t)
          props.wordCountChanged(numWords)
          props.onChangeText(resultingText)
        }}
        value={text}
        multiline={true}
        autoCapitalize='none'
        autoFocus={true}
        clearButtonMode='while-editing'
      />
      {!props.isInvalid &&
        <Text
          style={styles.passwordHelpText}
        >
          {getNumWordsRemaining(text)} words remaining
        </Text>}
      {props.isInvalid &&
        <Text
          style={styles.errorText}
        >
          {translate('invalidRecoveryPhrase')}
        </Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: '20px'
  },
  inputText: {
    letterSpacing: '1.2',
    fontSize: '1.50em',
    backgroundColor: '#F1F2F4',
    borderRadius: 6,
    height: '200px',
    marginBottom: '8px',
    paddingVertical: '16px',
    paddingHorizontal: '20px',
    lineHeight: '1.5'
  },
  fixedText: {
    fontFamily: 'monospace'
  },
  helpText: {
    color: '#666',
    alignItems: 'top',
    flexWrap: 'wrap'
  },
  errorText: {
    color: '#f00',
    alignItems: 'top',
    flexWrap: 'wrap'
  }
})

export default RecoveryPhraseInput
