import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const TableRow = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {props.label}
      </Text>
      <Text style={styles.value}>
        {props.value}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    paddingBottom: '10px'
  },
  label: {
    flexGrow: 1
  },
  value: {

  }
})

export default TableRow
