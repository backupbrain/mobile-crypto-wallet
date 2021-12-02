import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import translate from '../../translations'

const formatAmount = (amount) => {
  const floatAmount = parseFloat(amount)
  const locale = 'en-US'
  return floatAmount.toLocaleString(locale)
}

const toUsd = (amount) => {
  const exchangeRate = 0.025
  const floatAmount = parseFloat(amount)
  return floatAmount * exchangeRate
}

const WalletListItem = (props) => {
  const { colors, dimensions } = useTheme()
  let isVisible = true
  /* if (props.visible !== undefined) {
    isVisible = props.visible
  } */

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'center',
      textAlign: 'center'
    },
    amount: {
      width: '100%',
      paddingBottom: dimensions.verticalSpacingBetweenItems,
      fontSize: dimensions.accountBalance.fontSize,
      fontWeight: dimensions.accountBalance.fontWeight,
      textTransform: dimensions.accountBalance.textTranform,
      color: colors.text,
    },
    altAmount: {
      color: colors.disabledText,
      width: '100%',
      fontSize: 14,
      justifyContent: 'center'
    }
  })

  return (
    <View style={[styles.container, props.style]}>
      {isVisible
        ? <>
          {props.inverted ?
            <>
              <Text style={styles.amount}>{formatAmount(toUsd(props.amount))} {translate('usd')}</Text>
              <Text style={styles.altAmount}>{formatAmount(props.amount)} {translate('pkt')}</Text>
            </>
            :
            <>
              <Text style={styles.amount}>{formatAmount(props.amount)} {translate('pkt')}</Text>
              <Text style={styles.altAmount}>{formatAmount(toUsd(props.amount))} {translate('usd')}</Text>
            </>
          }
        </>
        : <><Text style={styles.amount}>--- {translate('pkt')}</Text><Text style={styles.altAmount}>--- {translate('usd')}</Text></>
      }
    </View>
  )
}

export default WalletListItem
