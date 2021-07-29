import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import WalletListItem from '../components/wallet/WalletListItem'
import AccountBalance from '../components/wallet/AccountBalance'
import Tabs from '../components/buttons/Tabs'
import AddressQrCode from '../components/wallet/AddressQrCode'
import ActiveButton from '../components/buttons/ActiveButton'
import LinkButton from '../components/buttons/LinkButton'

const address = {
  name: 'Account 1',
  amount: 123456.00134,
  address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk'
}

const AddressView = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <WalletListItem
          name={address.name}
          address={address.address}
          amount={address.amount}
          showAmount={false}
        />

        <AccountBalance amount={address.amount} isVisible />
        <Tabs
          tabs={[{ name: 'QR' }, { name: 'Address' }, { name: 'Transactions' }]}
          style={styles.tabHeader}
        />
        <View style={styles.textBlock}>
          <Text style={styles.text}>This code is your account number</Text>
          <Text style={styles.text}>
            Share it with people to receive payments
          </Text>
          <View style={styles.card}>
            <AddressQrCode address={address.address} />
            <View style={styles.addressOptionsGroup}>
              <LinkButton title='Copy address to clipboard' />
              <LinkButton title='Share address' />
            </View>
          </View>
          <ActiveButton title='Send PKT' />
        </View>
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
    justifyContent: 'center'
  },
  card: {
    paddingTop: '12px',
    paddingBottom: '20px'
  },
  addressOptionsGroup: {
    paddingTop: '12px',
    paddingBottom: '20px'
  },
  text: {
    paddingBottom: '8px',
    textAlign: 'center'
  },
  textBlock: {
    paddingBottom: '12px'
  }
})

export default AddressView
