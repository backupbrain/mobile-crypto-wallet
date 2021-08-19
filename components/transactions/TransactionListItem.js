import React, { useEffect, useState, useRef } from 'react'
import { View, StyleSheet } from 'react-native'
import BodyText from '../text/BodyText'
import InboundIcon from '../images/InboundIcon'
import OutboundIcon from '../images/OutboundIcon'
import ConfirmedIcon from '../images/ConfirmedIcon'
import UnconfirmedIcon from '../images/UnconfirmedIcon'
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

const TransactionListItem = (props) => {
  const { colors, dimensions } = useTheme()
  // const address = '' // '' + props.transaction.address
  const [, setTransactionId] = useState('')
  const [address, setAddress] = useState('')
  const [amount, setAmount] = useState(0)
  const [numConfirmations, setNumConfirmations] = useState(0)
  const [isInbound, setIsInbound] = useState(false)
  const [time, setTime] = useState(null)
  const [note, setNote] = useState(translate('unNotedTransaction'))
  const currentTime = useRef(new Date())

  const toUsd = (amount) => {
    // TODO: use actual PKT price
    const exchangeRate = 0.02 //
    const floatAmount = parseFloat(amount)
    return floatAmount * exchangeRate
    // const isConverted = false
    // return props.pktPriceTicker.convertCurrency(isConverted, amount)
  }

  const formatDate = (timestamp, now) => {
    // FIXME: localize the output
    // console.log(now)
    let output = ''
    const targetDate = new Date(parseInt(timestamp) * 1000)
    // console.log(targetDate)
    const secondsDiff = Math.round((now - targetDate) / 1000)
    // console.log(secondsDiff)
    // if this happened in the last 24 hours AND after midnight,
    // return the time
    // otherwis return the date
    const oneDay = 24 * 60 * 60
    const hour = targetDate.getHours()
    if (secondsDiff < oneDay && hour >= 1) {
      output = targetDate.toLocaleTimeString('en-US')
    } else {
      const month = ('0' + (targetDate.getMonth() + 1)).slice(-2)
      const day = ('0' + targetDate.getDate()).slice(-2)
      output = `${targetDate.getFullYear()}-${month}-${day}`
    }
    return output
  }

  useEffect(() => {
    if (props.transaction) {
      const transaction = props.transaction
      setAddress(transaction.address)
      setAmount(transaction.amount)
      setNumConfirmations(transaction.confirmations)
      setTime(transaction.time)
      setTransactionId(transaction.txid)
      // TODO: check if there are more categories. For instance "mining"
      if (transaction.category === 'receive') {
        setIsInbound(true)
      } else {
        setIsInbound(false)
      }
    }
    if (props.transaction.note) {
      setNote(props.transaction.note)
    }
  }, [setNote, props.contact])

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
    accountNote: {
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
    icon: {
      width: '30px'
    }
  })

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.icon}>
        {isInbound
          ? <InboundIcon color={colors.text} />
          : <OutboundIcon color={colors.text} />}
      </View>
      <View style={styles.icon}>
        {(numConfirmations > 0)
          ? <ConfirmedIcon color={colors.transactionListItem.confirmedIconColor} />
          : <UnconfirmedIcon color={colors.transactionListItem.unconfirmedIconColor} />}
      </View>
      <View style={styles.accountInformation}>
        <BodyText style={styles.accountNote}>{note}</BodyText>
        <BodyText style={styles.address}>{truncateAddress(address)}</BodyText>
      </View>
      <View style={styles.amountInformation}>
        <BodyText style={styles.amount}>{formatAmount(amount)} {translate('pkt')}</BodyText>
        <BodyText style={styles.altAmount}>{formatDate(time, currentTime.current)}</BodyText>
      </View>
    </View>
  )
}

TransactionListItem.defaultProps = {
  showAmount: true
}

export default TransactionListItem
