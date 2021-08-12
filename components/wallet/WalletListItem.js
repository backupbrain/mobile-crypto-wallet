import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import LinkButton from '../buttons/LinkButton'
import BodyText from '../text/BodyText'
import PersonIcon from '../images/PersonIcon'
import QrCodeIcon from '../images/QrCodeIcon'
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
  const isLocalAddress = (props.amount || props.local)
  const address = '' + props.address
  const displayedName = props.name ? props.name : translate('unnamedAddress')

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center'
    },
    icon: {
      paddingRight: dimensions.horizontalSpacingBetweenItems
    },
    accountInformation: {
      flexGrow: 1
    },
    amountInformation: {
      textAlign: 'right'
    },
    accountName: {
      fontWeight: 'bold',
      paddingBottom: dimensions.verticalSpacingBetweenItemsShort
    },
    address: {
    },
    amount: {
      paddingBottom: dimensions.verticalSpacingBetweenItemsShort
    },
    altAmount: {
      color: colors.disabledText
    },
    editButton: {
      marginLeft: dimensions.horizontalSpacingBetweenItems
    }
  })

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.icon}>
        {isLocalAddress ? <QrCodeIcon color={colors.text} /> : <PersonIcon color={colors.text} />}
      </View>
      <View style={styles.accountInformation}>
        <BodyText style={styles.accountName}>{displayedName}</BodyText>
        {showAmount
          ? <BodyText style={styles.address}>{truncateAddress(address)}</BodyText>
          : <BodyText style={styles.address}>{truncateAddressLong(address)}</BodyText>}
      </View>
      {showAmount &&
        <View style={styles.amountInformation}>
          <BodyText style={styles.amount}>{formatAmount(props.amount)} {translate('pkt')}</BodyText>
          <BodyText style={styles.altAmount}>{formatAmount(toUsd(props.amount))} {translate('usd')}</BodyText>
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
