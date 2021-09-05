import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import RecoveryWordOrdered from './RecoveryWordOrdered'
import { useTheme } from '@react-navigation/native'

const RecoveryWordGrid = (props) => {
  const { dimensions } = useTheme()
  const [layoutWidth, setLayoutWidth] = useState(0)

  const styles = StyleSheet.create({
    container: {
      display: 'inline-block',
      flex: 1,
      flexDirection: 'row',
      width: '100%'
    },
    wordMap: {
      width: `${(layoutWidth / 2) - parseInt(dimensions.horizontalSpacingBetweenItems.substring(0, 2))}px`
    },
    wordTop: {
      marginBottom: dimensions.verticalSpacingBetweenItems
    },
    wordLeft: {
      marginRight: dimensions.horizontalSpacingBetweenItems
    },
    wordRight: {

    }
  })

  const getWordMapItemStyle = (index) => {
    const wordMapItemStyles = [styles.wordMap]
    if (index % 2 === 0) {
      wordMapItemStyles.push(styles.wordLeft)
    } else {
      wordMapItemStyles.push(styles.wordRight)
    }
    if (index < props.words.length - 1) {
      wordMapItemStyles.push(styles.wordTop)
    }
    return wordMapItemStyles
  }

  return (
    <View
      style={[styles.container, props.style]}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout
        setLayoutWidth(width)
      }}
    >
      {props.words.map((word, index) => (
        <RecoveryWordOrdered
          key={index}
          cardinality={index + 1}
          word={props.visible ? word : '-----'}
          style={getWordMapItemStyle(index)}
        />
      ))}
    </View>
  )
}

export default RecoveryWordGrid
