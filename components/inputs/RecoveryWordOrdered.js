import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

const RecoveryWordOrdered = (props) => {
  const { colors, dimensions } = useTheme()

  const styles = StyleSheet.create({
    container: {
      borderColor: colors.disabledText,
      borderWidth: '1px',
      borderRadius: dimensions.inputs.borderRadius,
      flex: 1,
      flexDirection: 'row',
      float: 'left'
    },
    cardinality: {
      color: colors.disabledText,
      width: '2em',
      textAlign: 'right',
      borderRightColor: colors.disabledText,
      borderRightWidth: '1px',
      padding: dimensions.verticalSpacingBetweenItems,
      paddingRight: dimensions.horizontalSpacingBetweenItems,
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    },
    text: {
      padding: dimensions.verticalSpacingBetweenItems,
      paddingRight: dimensions.horizontalSpacingBetweenItems,
      flexGrow: 1,
      color: colors.text
    }
  })

  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.cardinality}>{props.cardinality}</Text>
      <Text style={styles.text}>{props.word}</Text>
    </View>
  )
}

export default RecoveryWordOrdered
