import React from 'react'
import { StyleSheet, View } from 'react-native'
import BodyText from './text/BodyText'
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
      <BodyText style={styles.label}>
        {props.label}
      </BodyText>
      <BodyText style={styles.value}>
        {props.value}
      </BodyText>
    </View>
  )
}

export default TableRow
