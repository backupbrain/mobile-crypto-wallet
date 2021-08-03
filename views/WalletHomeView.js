import React, { useRef, useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import Screen from '../components/Screen'
import ActivityButton from '../components/buttons/ActiveButton'
import WalletList from '../components/wallet/WalletList'
import MainAccountBalance from '../components/wallet/MainAccountBalance'
import Chart from '../components/Chart'
import translate from '../translations'
import PktManager from '../utils/PktManager'
import ContactManager from '../utils/ContactManager'
import { useTheme } from '@react-navigation/native'

const WalletHomeView = ({ navigation, route }) => {
  const { colors, dimensions } = useTheme()
  const [addresses, setAddresses] = useState([])
  const pktManager = useRef(new PktManager())
  const contactBook = useRef(new ContactManager())

  const fetchMyAddresses = async () => {
    const addresses = pktManager.current.myAddresses
    // get contacts
    const contacts = await contactBook.current.getAll()
    // merge contacts
    const contactLookup = {}
    if (contacts !== undefined) {
      for (let i = 0; i < contacts.length; i++) {
        contactLookup[contacts.address] = contacts[i]
      }
    }
    for (let i = 0; i < addresses.length; i++) {
      const address = addresses[i]
      if (address.address in contactLookup) {
        address.name = contactLookup[address.address]
      } else {
        address.name = translate('unnamedAddress')
      }
    }
    setAddresses(addresses)
  }

  useEffect(() => {
    fetchMyAddresses()
  })

  const styles = StyleSheet.create({
    screen: {
      paddingHorizontal: dimensions.screen.paddingHorizontal,
      paddingVertical: dimensions.screen.paddingHorizontal
    },
    accountBalanceContainer: {
    },
    sendReceiveButtonPanel: {
      mdth: '100%',
      paddingVertical: dimensions.screen.paddingVertical,
      flexDirection: 'row'
    },
    sendReceiveButton: {
      width: '50%'
    },
    leftButton: {
      marginRight: '4px'
    },
    rightButton: {
      marginLeft: '4px'
    },
    walletListContainer: {
      width: '100%'
    }
  })

  return (
    <Screen>
      <View style={styles.screen}>
        <View style={styles.accountBalanceContainer}>
          <MainAccountBalance
            addresses={addresses}
          />
        </View>
        <Chart
          fillColor={colors.primaryButton.backgroundColor}
          legendColor={colors.text}
          lineColor={colors.text}
          data={[1500, 1000, 3000, 2000, 2500]}
          style={styles.chart}
        />
        <View style={styles.sendReceiveButtonPanel}>
          <View style={[styles.sendReceiveButton, styles.leftButton]}>
            <ActivityButton
              title={translate('send')}
              onPress={() => navigation.push('SendFormView')}
            />
          </View>
          <View style={[styles.sendReceiveButton, styles.rightButton]}>
            <ActivityButton
              title={translate('receive')}
              onPress={() => {
                navigation.push('Address')
              }}
            />
          </View>
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
    </Screen>
  )
}

export default WalletHomeView
