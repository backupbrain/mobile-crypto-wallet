import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ActivityButton from '../components/buttons/ActiveButton'
import LinkButton from '../components/buttons/LinkButton'
import WalletList from '../components/wallet/WalletList'
import AccountBalance from '../components/wallet/AccountBalance'
import MainAccountBalance from '../components/wallet/MainAccountBalance'
import translate from '../translations'


const addresses = [
  {
    name: 'Account 1',
    amount: 123456.00134,
    address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk'
  },
  {
    name: 'Account 2',
    amount: 56.00134,
    address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk'
  },
  {
    name: 'Account 3',
    amount: 0.0000134,
    address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk'
  }
]

const WalletHomeView = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.accountBalanceContainer}>
          <MainAccountBalance
            addresses={addresses}
          />
        </View>
        <View style={styles.sendReceiveButtonPanel}>
          <ActivityButton
            title={translate('send')}
            onPress={() => navigation.push('SendFormView')}
          />
          <ActivityButton
            title={translate('receive')}
            onPress={() => {
              navigation.push('Address')
            }}
          />
        </View>
        <View style={styles.walletListContainer}>
          <WalletList
            style={styles.walletList}
            addresses={addresses}
            onListItemPress={(address) => navigation.navigate('AddressView', { address })}
            onCreateAddressPress={() => {
              // TODO: create new address, bring up modal editor
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
    flex: 1
  },
  screen: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  accountBalanceContainer: {
    width: '100%',
    paddingHorizontal: '20px',
    paddingTop: '16px'
  },
  sendReceiveButtonPanel: {
    width: '100%',
    paddingHorizontal: '20px',
    paddingTop: '20px',
    paddingBottom: '4px'
  },
  walletListContainer: {
    flexGrow: 1,
    width: '100%'
  }
})

export default WalletHomeView
