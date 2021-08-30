import React, { useRef, useState,useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import Screen from '../../components/Screen'
import AccountBalance from '../../components/wallet/AccountBalance'
import OtpInput from '../../components/inputs/OtpInput'
import WalletListItem from '../../components/wallet/WalletListItem'
import SlideToConfirm from '../../components/inputs/SlideToConfirmInput'
import BodyText from '../../components/text/BodyText'
import PktManager from '../../utils/PktManager'
import TransactionNoteManager from '../../utils/TransactionNoteManager'
import { useTheme } from '@react-navigation/native'
import translate from '../../translations'
import TwoFactorAuth from '../../utils/TwoFactorAuth'

/*
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
/* */

const SendFormView = ({ navigation, route }) => {
  // TODO: expect fromAddress, toAddress, amount from route.params
  const { colors, dimensions } = useTheme()
  const pktManager = useRef(new PktManager())
  const TwoFactorManager = useRef(new TwoFactorAuth())
  const transactionNoteManager = useRef(new TransactionNoteManager())
  const [fromAddress] = useState(route.params?.fromAddress)
  const [toAddress] = useState(route.params?.toAddress)
  const [amount] = useState(route.params?.amount)
  const [note] = useState(route.params?.note)
  const [isPinValid, setisPinValid] = useState(false)
  const [secret, setSecret] = useState("")

  useEffect(()=>{
    TwoFactorAuth.getPairingCode().then((value)=>setSecret(value))
  },[])

  const send = async () => {
    const transactionId = await pktManager.current.sendCoins(fromAddress.address, toAddress.address, amount)
    if (note && note.length > 0) {
      await transactionNoteManager.current.set(transactionId, note)
    }
    navigation.navigate('TransactionView', { reset: true, alert: true, transactionId: transactionId })
  }

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
        <AccountBalance amount={amount} />
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
            amount={fromAddress.total}
          />
        </View>
        <View style={styles.otpInputContainer}>
          <OtpInput
            label={translate('2faCode')}
            help={translate('2faCodeHelpText')}
            onValidPin={() => setisPinValid(true)}
            secret ={secret}
            error = {translate('invalidPin')}
          />
        </View>
        <SlideToConfirm
          label={translate('slideToConfirm')}
          onComplete={send}
          disabled={!isPinValid}
        />
      </View>
    </Screen>
  )
}

export default SendFormView
