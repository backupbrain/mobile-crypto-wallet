import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import RecoveryWordOrdered from './RecoveryWordOrdered'

const RecoveryWordGrid = (props) => {
  return (
    <View style={styles.container}>
      {props.words.map((word, index) => (
        <RecoveryWordOrdered
          key={index}
          cardinality={index + 1}
          word={props.isVisible ? word : '-----'}
          style={styles.wordMap}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'inline-block',
    flex: 1,
    flexDirection: 'row',
    width: '100%'
  },
  wordMap: {
    marginRight: '8px',
    marginBottom: '8px'
  }
})

export default RecoveryWordGrid
