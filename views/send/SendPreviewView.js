import React, { useRef, useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Screen from '../../components/Screen'
import ActiveButton from '../../components/buttons/ActiveButton'
import AccountBalance from '../../components/wallet/AccountBalance'
import OtpInput from '../../components/inputs/OtpInput'
import WalletListItem from '../../components/wallet/WalletListItem'
import SlideToConfirm from '../../components/inputs/SlideToConfirmInput'
import BodyText from '../../components/text/BodyText'
import PktManager from '../../utils/PktManager'
import TransactionNoteManager from '../../utils/TransactionNoteManager'
import { useTheme } from '@react-navigation/native'
import translate from '../../translations'

const sendAmount = 1290.20

const toAddress = {
  name: 'My friend',
  amount: 123456.00134,
  address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk'
}
const fromAddress = {
  name: 'Account 1',
  amount: 123456.00134,
  address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk'
}

const SendFormView = ({ navigation, route }) => {
  // TODO: expect fromAddress, toAddress, amount from route.params
  const { colors, dimensions } = useTheme()
  const pktManager = useRef(new PktManager())
  const transactionNoteManager = useRef(new TransactionNoteManager())
  const [fromAddress, setFromAddress] = useState({})
  const [toAddress, setToAddress] = useState({})
  const [amount, setAmount] = useState(0.00)
  const [note, setNote] = useState('')
  const [isPinValid, setisPinValid] = useState(false)

  /*
  const send = async () => {
    const transactionId = await pktManager.current.sendCoins(fromAddress.address, toAddress.address, amount)
    if (note && note.length > 0) {
      await transactionNoteManager.current.set(transactionId, note)
    }
    navigation.navigate('TransactionSuccessView', { reset: true })
  }
  /* */

  const styles = StyleSheet.create({
    screen: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: dimensions.screen.paddingHorizontal,
      paddingVertical: dimensions.screen.paddingVertical
    },
    otpInputContainer: {
      marginTop: '10px',
      marginBottom: '20px'
    },
    walletListItem: {
      width: '100%',
      border: '1px solid #000'
    },
    label: {
      width: '100%',
      paddingBottom: dimensions.inputs.labelPaddingBottom,
      color: colors.inputs.labelColor
    },
    addressBlock: {
      width: '100%',
      paddingBottom: dimensions.paddingVertical
    }
  })

  return (
    <Screen>
      <View style={styles.screen}>
        <BodyText style={styles.label}>{translate('youWillSend')}</BodyText>
        <AccountBalance amount={sendAmount} />
        <View style={styles.addressBlock}>
          <BodyText style={styles.label}>{translate('to')}</BodyText>
          <WalletListItem
            name={toAddress.name}
            address={toAddress.address}
            showAmount={false}
          />
        </View>
        <View style={styles.addressBlock}>
          <BodyText style={styles.label}>{translate('from')}</BodyText>
          <WalletListItem
            name={fromAddress.name}
            address={fromAddress.address}
            amount={fromAddress.amount}
          />
        </View>
        <View style={styles.otpInputContainer}>
          <OtpInput
            label={translate('2faCode')}
            help={translate('2faCodeHelpText')}
            onValidPin={() => setisPinValid(true)}
          />
        </View>
        <SlideToConfirm
          label={translate('slideToConfirm')}
          onComplete={() => {
            // send()
          }}
          disabled={!isPinValid}
        />
      </View>
    </Screen>
  )
}

export default SendFormView
