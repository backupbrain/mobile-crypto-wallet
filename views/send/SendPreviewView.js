import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ActiveButton from '../../components/buttons/ActiveButton'
import AccountBalance from '../../components/wallet/AccountBalance'
import OtpInput from '../../components/inputs/OtpInput'
import WalletListItem from '../../components/wallet/WalletListItem'

const sendAmount = 1290.20

const SendFormView = ({ navigation, route }) => {
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
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <Text style={styles.label}>You are about to send</Text>
        <AccountBalance amount={sendAmount} />

        <Text style={styles.label}>To</Text>
        <WalletListItem
          name={toAddress.name}
          address={toAddress.address}
          showAmount={false}
        />
        <Text style={styles.label}>From</Text>
        <WalletListItem
          name={fromAddress.name}
          address={fromAddress.address}
          amount={fromAddress.amount}
        />
        <View style={styles.otpInputContainer}>
          <OtpInput
            label='Code'
            help='Enter your one-time-password'
          />
        </View>
        <ActiveButton title='Slide to Confirm' />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    width: '100%'
  },
  screen: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '20px'
  },
  label: {
    width: '100%',
    paddingBottom: '10px'
  },
  otpInputContainer: {
    marginTop: '10px',
    marginBottom: '20px'
  },
  walletListItem: {
    width: '100%',
    border: '1px solid #000'
  }
})

export default SendFormView
