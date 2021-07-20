import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const RecoveryWordOrdered = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.cardinality}>{props.cardinality}</Text>
      <Text style={styles.text}>{props.word}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    border: '1px solid #BFC5CD',
    borderRadius: '4px',
    marginBottom: '8px',
    marginRight: '8px',
    width: '46%',
    flex: 1,
    flexDirection: 'row',
    float: 'left'
  },
  cardinality: {
    color: '#8D9BA9',
    width: '2em',
    textAlign: 'right',
    borderRight: '1px solid #BFC5CD',
    padding: '7px',
    paddingRight: '15px',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  text: {
    padding: '7px',
    paddingRight: '15px',
    flexGrow: 1
  }
})

export default RecoveryWordOrdered
