import React from 'react'
import { useTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import SmallButton from './SmallButton'
import BodyText from '../text/BodyText'

const SeedPhraseWordButton = ({ chosenWords, word, index, handleClick, disabled, style, textStyle }) => {
  const { dimensions, colors } = useTheme()

  const styles = StyleSheet.create({
    middleWord: {
      marginHorizontal: disabled ? dimensions.horizontalSpacingBetweenItems : dimensions.shortPadding
    },
    word: {
      marginBottom: disabled ? dimensions.shortPadding : dimensions.paddingVertical,
      justifyContent: 'center',
      alignItems: 'center',
      // width: disabled ? 90 : 100,
      borderRadius: 8
    },
    activeWord: {
      backgroundColor: colors.primaryButton.backgroundColor
    }

  })

  const wordStyle = (index, item) => {
    const wstyle = [styles.word, style]
    if (index % 3 === 1) {
      wstyle.push(styles.middleWord)
    }
    if (!disabled && chosenWords.find(word => word === item)) {
      wstyle.push(styles.activeWord)
    }
    return wstyle
  }

  return (
    <SmallButton
      height={disabled ? 25 : 30}
      style={wordStyle(index, word)}
      onPress={handleClick}
    >
      <BodyText style={textStyle}>{word}</BodyText>
    </SmallButton>
  )
}

export default SeedPhraseWordButton
