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
import Modal from '../components/Modal'
import PktAddressInput from '../components/inputs/PktAddressInput'
import WalletListItem from '../components/wallet/WalletListItem'
import GenericTextInput from '../components/inputs/GenericTextInput'

const WalletHomeView = ({ navigation, route }) => {
  const { colors, dimensions } = useTheme()
  const [addresses, setAddresses] = useState([])
  const [sendActivated, setSendActivated] = useState(false)
  const [newAddress, setNewAddress] = useState({})
  const newAddressName = useRef("")
  const pktManager = useRef(new PktManager())
  const contactBook = useRef(new ContactManager())
  const modal = useRef(null)

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
    let total = 0
    for (let i = 0; i < addresses.length; i++) {
      const address = addresses[i]
      total += address.total
      if (address.address in contactLookup) {
        address.name = contactLookup[address.address].name
      } else {
        address.name = translate('unnamedAddress')
      }
    }
    setAddresses(addresses)
    setSendActivated(total > 0 ? true : false)
  }

  useEffect(() => {
    fetchMyAddresses()
  }, [fetchMyAddresses])

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
      <Modal
        ref={modal}
        title={translate('createAddress')}
        content={() =>
          <View style={{paddingTop:dimensions.paddingVertical}}>
            <WalletListItem
              name={newAddress.name}
              address={newAddress.address}
              amount={newAddress.total}
              showAmount={false}
            /* style={styles.listItem} */
            />
            <GenericTextInput
              placeholder={translate('addressName')}
              help={translate('newAddressHelp')}
              onChangeText={(text) => newAddressName.current=text}
            />

          </View>
        }
        footer={() =>
          <ActivityButton
            title={translate('createAddress')}
            onPress={async () => {
              await contactBook.current.add(newAddressName.current,newAddress.address)
              await fetchMyAddresses()
              modal.current.close()
            }}
          />
        }
      />
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
              onPress={() => navigation.push('SendView')}
              disabled={!sendActivated}
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
            onListItemPress={(address) => {
              console.log(address)
              navigation.push('AddressView', { address })
            }}
            onLinkPress={() => {
              // TODO: create new address, bring up modal editor
              pktManager.current.createAddress().then(address => setNewAddress(address))
              modal.current.open()
            }}
          />
        </View>
      </View>
    </Screen>
  )
}

export default WalletHomeView
