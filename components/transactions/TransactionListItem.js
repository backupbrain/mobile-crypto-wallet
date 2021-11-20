import React, { useEffect, useState, useRef } from 'react'
import { View, StyleSheet } from 'react-native'
import BodyText from '../text/BodyText'
import InboundIcon from '../images/InboundIcon'
import OutboundIcon from '../images/OutboundIcon'
import ConfirmedIcon from '../images/ConfirmedIcon'
import UnconfirmedIcon from '../images/UnconfirmedIcon'
import translate from '../../translations'
import { useTheme } from '@react-navigation/native'
import ReqIconBig from '../images/ReqIconBig'
import SendIconBig from '../images/SendIconBig'
import PktPriceTicker from '../../utils/PktPriceTicker'

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
  const priceTicker = useRef(new PktPriceTicker())

  const toUsd = (amount) => {
    // TODO: use actual PKT price
    const exchangeRate = 0.02 //
    const floatAmount = parseFloat(amount)
    return floatAmount * exchangeRate
    // const isConverted = false
    // return props.pktPriceTicker.convertCurrency(isConverted, amount)
  }

  const formatDate = (timestamp) => {

    const date = new Date(timestamp)
    const day = date.toLocaleDateString('en-US', { weekday: 'long' }).substring(0, 3)
    const dayNumber = date.getDate()
    const hour = date.getHours();
    const min = date.getMinutes()

    return `${day} ${dayNumber} at ${hour}:${min}`
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
      flex:1,
    },
    transactionInfo: {
      flexDirection: 'row'
    },
    accountInformation: {
      flexGrow: 1
    },
    amountInformation: {
      textAlign: 'right',
    },
    accountNote: {
      fontWeight: 'bold',
      paddingBottom: dimensions.verticalSpacingBetweenItemsShort
    },
    address: {
    },
    amount: {
      marginBottom: dimensions.verticalSpacingBetweenItems
    },
    time: {
      color: colors.disabledText,
      fontSize: 12,
      marginBottom: dimensions.verticalSpacingBetweenItems
    },
    confirmColor: {
      color: colors.transactionListItem.confirmedIconColor
    },
    unconfirmColor: {
      color: colors.transactionListItem.unconfirmedIconColor
    },
    mainInfo: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginHorizontal: dimensions.horizontalSpacingBetweenItems
    },
    sendRecTitle: {
      marginBottom: dimensions.verticalSpacingBetweenItems
    },
    bigIcon: {
      alignSelf: 'center'
    },
    altAmount: {
      color: colors.disabledText,
      fontSize: 14,
      justifyContent: 'center'
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flex:1
    }
  })

  return (
    <View style={[styles.container, props.style]}>
      <BodyText style={styles.time}>{formatDate(time)}</BodyText>
      <View style={styles.transactionInfo}>
        <View style={styles.bigIcon}>
          {isInbound
            ? <ReqIconBig />
            : <SendIconBig />}
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.mainInfo}>
            <BodyText style={styles.sendRecTitle}>Receive PKT</BodyText>
            <View >
              {(numConfirmations > 0)
                ? <BodyText style={styles.confirmColor} >{translate('confirmed')}</BodyText>
                : <BodyText style={styles.unconfirmColor}>{translate('unconfirmed')}</BodyText>}
            </View>
          </View>
          <View style={styles.amountInformation}>
            <BodyText style={styles.amount}>{formatAmount(amount)} {translate('pkt')}</BodyText>
            <BodyText style={styles.altAmount}>{formatAmount(priceTicker.current.convertCurrency(false, amount))} {translate('usd')}</BodyText>
          </View>
        </View>
      </View>
    </View>
  )
}

TransactionListItem.defaultProps = {
  showAmount: true
}

export default TransactionListItem
