import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import BodyText from '../text/BodyText'

const RecoveryWordOrdered = (props) => {
  const { colors, dimensions } = useTheme()

  const styles = StyleSheet.create({
    container: {
      backgroundColor:colors.recoveryWord.backgroundColor,
      borderRadius: colors.recoveryWord.borderRadius,
      flex: 1,
      flexDirection: 'row',
      float: 'left'
    },
    text: {
      padding: dimensions.verticalSpacingBetweenItems,
      paddingRight: dimensions.horizontalSpacingBetweenItems,
      flexGrow: 1,
      color: colors.text,
      textAlign:'center',
    }
  })

  return (
    <View style={[styles.container, props.style]}>
      <BodyText style={styles.text}>{props.cardinality}. {props.word}</BodyText>
    </View>
  )
}

export default RecoveryWordOrdered
