import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import translate from '../../translations'

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
  const showAmount = (props.showAmount && props.amount)
  const address = '' + props.address
  const displayedName = props.name? props.name : translate('unnamedAddress')
  return (
    <View style={styles.container}>
      <View style={styles.accountInformation}>
        <Text style={styles.accountName}>{displayedName}</Text>
        {showAmount
          ? <Text style={styles.address}>{truncateAddress(address)}</Text>
          : <Text style={styles.address}>{truncateAddressLong(address)}</Text>}
      </View>
      {showAmount &&
        <View style={styles.amountInformation}>
          <Text style={styles.amount}>{formatAmount(props.amount)} PKT</Text>
          <Text style={styles.altAmount}>{formatAmount(toUsd(props.amount))} USD</Text>
        </View>}
      {props.editable &&
        <Text>Editable</Text>}
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
