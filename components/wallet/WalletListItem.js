import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import LinkButton from '../buttons/LinkButton'
import translate from '../../translations'
import { useTheme } from '@react-navigation/native'

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
  const { colors, dimensions } = useTheme()
  const showAmount = (props.showAmount && props.amount)
  const address = '' + props.address
  const displayedName = props.name ? props.name : translate('unnamedAddress')

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center'
    },
    accountInformation: {
      flexGrow: 1
    },
    amountInformation: {
      textAlign: 'right'
    },
    accountName: {
      color: colors.bodyText.color,
      fontWeight: 'bold',
      paddingBottom: dimensions.verticalSpacingBetweenItemsShort
    },
    address: {
      color: colors.bodyText.color,
      fontSize: dimensions.bodyText.fontSize,
      fontWeight: dimensions.bodyText.fontWeight,
      lineHeight: dimensions.bodyText.lineHeight
    },
    amount: {
      color: colors.bodyText.color,
      paddingBottom: dimensions.verticalSpacingBetweenItemsShort
    },
    altAmount: {
      color: colors.bodyText.color,
      fontSize: dimensions.bodyText.fontSize,
      fontWeight: dimensions.bodyText.fontWeight,
      lineHeight: dimensions.bodyText.lineHeight
    },
    editButton: {
      marginLeft: dimensions.horizontalSpacingBetweenItems
    }
  })

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.accountInformation}>
        <Text style={styles.accountName}>{displayedName}</Text>
        {showAmount
          ? <Text style={styles.address}>{truncateAddress(address)}</Text>
          : <Text style={styles.address}>{truncateAddressLong(address)}</Text>}
      </View>
      {showAmount &&
        <View style={styles.amountInformation}>
          <Text style={styles.amount}>{formatAmount(props.amount)} {translate('pkt')}</Text>
          <Text style={styles.altAmount}>{formatAmount(toUsd(props.amount))} {translate('usd')}</Text>
        </View>}
      {props.editable &&
        <LinkButton title={translate('edit')} style={styles.editButton} />}
    </View>
  )
}

WalletListItem.defaultProps = {
  showAmount: true
}

export default WalletListItem
