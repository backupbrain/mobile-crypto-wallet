import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import SeedPhraseWordButton from '../buttons/SeedPhraseWordButton'

const SelectedSeedWordSelectorGrid = (props) => {
  const { dimensions } = useTheme()
  const [containerWidth, setContainerWidth] = useState(100)

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    wordSelector: {
      // width: (containerWidth / 3) - (dimensions.horizontalSpacingBetweenItems * 2),
      width: Math.floor(containerWidth / 3) - (dimensions.horizontalSpacingBetweenItems)
    },
    buttonTextStyle: {
      fontSize: 12
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
      {props.chosenWords.map((seedWord, index) => (
        <SeedPhraseWordButton
          key={index}
          word={`${(index + 1)}. ${seedWord}`}
          index={index}
          chosenWords={props.chosenWords}
          disabled
          style={styles.wordSelector}
          textStyle={styles.buttonTextStyle}
          handleClick={() => { props.wordClicked(seedWord) }}
        />))}
    </View>
  )
}

export default SelectedSeedWordSelectorGrid
