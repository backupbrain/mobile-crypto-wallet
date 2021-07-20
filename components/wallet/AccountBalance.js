import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
// import TinyQrCode from '../../assets/qrcodes/TinyQrCode.js'

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
  let isVisible = true
  if (props.visible !== undefined) {
    isVisible = props.visible
  }
  return (
    <View style={styles.container}>
      {isVisible
        ? <><Text style={styles.amount}>{formatAmount(props.amount)} PKT</Text><Text style={styles.altAmount}>{formatAmount(toUsd(props.amount))} USD</Text></>
        : <><Text style={styles.amount}>--- PKT</Text><Text style={styles.altAmount}>--- USD</Text></>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: '8px',
    textAlign: 'right'
  },
  amount: {
    paddingBottom: '3px',
    fontWeight: 'bold',
    fontSize: '1.2em',
    width: '100%'
  },
  altAmount: {
    color: '#8D9BA9',
    width: '100%'
  }
})

export default WalletListItem
