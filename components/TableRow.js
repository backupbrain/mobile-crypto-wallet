import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useTheme } from '@react-navigation/native'

const TableRow = (props) => {
  const { dimensions } = useTheme()

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '100%',
      paddingBottom: dimensions.verticalSpacingBetweenItems
    },
    label: {
      flexGrow: 1
    },
    value: {

    }
  })

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

export default TableRow
