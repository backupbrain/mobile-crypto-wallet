import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import SeedWordOrdered from './SeedWordOrdered'
import { useTheme } from '@react-navigation/native'

const SeedWordGrid = (props) => {
  const { dimensions } = useTheme()
  const [layoutWidth, setLayoutWidth] = useState(0)

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row'
    },
    word: {
      marginBottom: dimensions.recoveryWord.marginBottom
    },
    leftColumn: {
      width: (layoutWidth / 2) - dimensions.recoveryWord.marginCenter / 2,
      marginRight: dimensions.recoveryWord.marginCenter / 2
    },
    rightColumn: {
      width: (layoutWidth / 2) - dimensions.recoveryWord.marginCenter / 2,
      marginLeft: dimensions.recoveryWord.marginCenter / 2
    }
  })

  const getFirstSeedWords = () => {
    const words = props.words.filter((i, idx) => idx < Math.floor(props.words.length / 2) + 1)
    return words
  }

  const getSecondSeedWords = () => {
    const words = props.words.filter((i, idx) => idx > Math.ceil(props.words.length / 2) - 1)
    return words
  }

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout
        setLayoutWidth(width)
      }}
    >
      <View style={styles.leftColumn}>
        {getFirstSeedWords().map((word, index) => (
          <SeedWordOrdered
            key={index}
            cardinality={index + 1}
            word={word}
            style={styles.word}
          />
        ))}
      </View>
      <View style={styles.rightColumn}>
        {getSecondSeedWords().map((word, index) => (
          <SeedWordOrdered
            key={index}
            cardinality={index + getFirstSeedWords().length + 1}
            word={word}
            style={styles.word}
          />
        ))}
      </View>
    </View>
  )
}

export default SeedWordGrid
