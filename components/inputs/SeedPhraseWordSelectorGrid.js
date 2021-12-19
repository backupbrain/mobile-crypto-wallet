import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import SeedPhraseWordButton from '../buttons/SeedPhraseWordButton'

const SeedPhraseWordSelectorGrid = (props) => {
  const { dimensions } = useTheme()
  const [containerWidth, setContainerWidth] = useState(100)

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    wordSelector: {
      width: Math.floor(containerWidth / 3) - (dimensions.horizontalSpacingBetweenItems)
    }
  })

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout
        setContainerWidth(width)
      }}
    >
      {props.seedWords.map((seedWord, index) => (
        <SeedPhraseWordButton
          key={index}
          word={seedWord}
          index={index}
          chosenWords={props.chosenWords}
          style={styles.wordSelector}
          handleClick={() => props.wordClicked(seedWord)}
        />))}
    </View>
  )
}

export default SeedPhraseWordSelectorGrid
