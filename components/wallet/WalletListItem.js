import * as React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
// import TinyQrCode from '../../assets/qrcodes/TinyQrCode'

const truncateAddress = (address) => {
  const MAX_LENGTH = 11
  const addressLength = address.length
  if (addressLength > MAX_LENGTH) {
    return address.substr(0, 6) + '…' + address.substr(addressLength - 4, addressLength)
  } else {
    return address
  }
}

const truncateAddressLong = (address) => {
  const MAX_LENGTH = 11
  const addressLength = address.length
  if (addressLength > MAX_LENGTH) {
    return address.substr(0, 15) + '…' + address.substr(addressLength - 15, addressLength)
  } else {
    return address
  }
}

const formatAmount = (amount) => {
  const floatAmount = parseFloat(amount)
  const locale = 'en-US'
  return floatAmount.toLocaleString(locale)
}

const toUsd = (amount) => {
  const exchangeRate = 0.02
  const floatAmount = parseFloat(amount)
  return floatAmount * exchangeRate
}

const WalletListItem = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.accountInformation}>
        <Text style={styles.accountName}>{props.name}</Text>
        {props.showAmount
          ? <Text style={styles.address}>{truncateAddress(props.address)}</Text>
          : <Text style={styles.address}>{truncateAddressLong(props.address)}</Text>}
      </View>
      {props.showAmount &&
        <View style={styles.amountInformation}>
          <Text style={styles.amount}>{formatAmount(props.amount)} PKT</Text>
          <Text style={styles.altAmount}>{formatAmount(toUsd(props.amount))} USD</Text>
        </View>}
    </View>
  )
}

WalletListItem.defaultProps = {
  showAmount: true
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: '20px',
    paddingVertical: '8px'
  },
  accountInformation: {
    flexGrow: 1
  },
  amountInformation: {
    textAlign: 'right'
  },
  accountName: {
    fontWeight: 'bold',
    paddingBottom: '3px'
  },
  address: {
    color: '#8D9BA9'
  },
  amount: {
    paddingBottom: '3px'
  },
  altAmount: {
    color: '#8D9BA9'
  }
})

export default WalletListItem
