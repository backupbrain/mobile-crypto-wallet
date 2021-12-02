import React, { useRef, useState, useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native'
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
import AlertBanner from '../components/AlertBanner'
import SmallButton from '../components/buttons/SmallButton'
import SendIcon from '../components/images/SendIcon'
import BodyText from '../components/text/BodyText'
import ReqIcon from '../components/images/ReqIcon'

const WalletHomeView = ({ navigation, route }) => {
  const { colors, dimensions } = useTheme()
  const [addresses, setAddresses] = useState([])
  const [variant, setVariant] = useState('')
  const [label, setLabel] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [sendActivated, setSendActivated] = useState(false)
  const [newAddress, setNewAddress] = useState({})
  const newAddressName = useRef("")
  const pktManager = useRef(new PktManager())
  const contactBook = useRef(new ContactManager())
  const modal = useRef(null)
  const alertModal = useRef(null)

  useEffect(() => {
    setVariant(route.params?.variant)
    setLabel(route.params?.label)
    setShowAlert(route.params?.showAlert ?? false)
    if (route.params?.showAlert) {
      alertModal.current.open()
    }
  }, [route.params?.showAlert])

  const fetchMyAddresses = async () => {
    let addresses = pktManager.current.myAddresses
    // get contacts
    const contacts = await contactBook.current.getAll()
    // merge contacts
    const contactLookup = {}
    if (contacts !== undefined) {
      for (let i = 0; i < contacts.length; i++) {
        contactLookup[contacts[i].address] = contacts[i]
      }
    }
    let total = 0
    for (let i = 0; i < addresses.length; i++) {
      const address = addresses[i]
      total += address.total
      if (contactLookup[address.address]) {
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
      justifyContent: 'center',
      alignItems: 'center'
    },
    balances: {
      textAlign: 'center'
    },
    sendReceiveButtonPanel: {
      width: '100%',
      paddingVertical: dimensions.screen.paddingVertical,
      flexDirection: 'row'
    },
    sendReceiveButton: {
      width: '50%'
    },
    leftButton: {
      marginRight: 4
    },
    rightButton: {
      marginLeft: 4
    },
    walletListContainer: {
      width: '100%'
    },
    sendReceiveButton: {
      alignItems: 'center',
      flexDirection: 'row',
      alignSelf: 'center',
      marginTop: dimensions.paddingVertical,
      paddingTop: dimensions.shortPadding,
      paddingBottom: dimensions.paddingVertical
    },
    buttonContent: {
      flexDirection: 'row',
    },
    smallButtonText: {
      paddingLeft: dimensions.verticalSpacingBetweenItems,
      textAlign: 'center'
    },
    rightMargin: {
      marginRight: dimensions.horizontalSpacingBetweenItems
    },
    addContactButtonContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: dimensions.paddingHorizontal
    },
    addButton: {
      flexShrink: 1,
      flexDirection: 'row'
    },
    addressInput: {
      paddingVertical: dimensions.paddingHorizontal
    },
    alertText: {
      width: '100%',
      textAlign: 'center',
      paddingVertical: dimensions.paddingHorizontal
    }
  })

  return (
    <Screen>
      {/* <AlertBanner
        variant={variant}
        label={label}
        visible={showAlert}
        onClose={() => {
          setShowAlert(false)
        }}
      /> */}
      <Modal ref={alertModal}>
        <BodyText style={styles.alertText}>{label}</BodyText>
        <ActivityButton
          title={translate('confirm')}
          style={styles.addressInput}
          onPress={() => {
            alertModal.current.close()
            navigation.setParams({
              showAlert: false
            })
          }}
        />
      </Modal>
      <Modal
        ref={modal}
        title={translate('newAddress')}
      >
        <View>
          <GenericTextInput
            placeholder={translate('addressName')}
            onChangeText={(text) => setNewAddress({ ...newAddress, name: text })}
          />
          <PktAddressInput
            style={styles.addressInput}
            placeholder={translate('pktAddress')}
            onChangeText={(text) => setNewAddress({ ...newAddress, address: text })}
            address={newAddress.address}
          />
        </View>
        <ActivityButton
          title={translate('saveAddress')}
          style={styles.addressInput}
          onPress={async () => {
            await contactBook.current.add(newAddress.name, newAddress.address)
            setNewAddress({})
            await fetchMyAddresses()
            modal.current.close()
            setVariant('success')
            setLabel(translate('newAddressAlert'))
            setShowAlert(true)
          }}
        />
      </Modal>
      <View style={styles.screen}>
        <View style={styles.accountBalanceContainer}>
          <MainAccountBalance
            addresses={addresses}
            style={styles.balances}
          />
        </View>
        <View style={styles.sendReceiveButton}>
          <SmallButton height={40} style={styles.rightMargin}
            onPress={() => navigation.push('SendView')}>
            <View style={styles.buttonContent}>
              <SendIcon color={colors.text} />
              <BodyText style={styles.smallButtonText}>{translate('send')}</BodyText>
            </View>
          </SmallButton>
          <SmallButton height={40}
            onPress={() => {
              navigation.push('AddressView', { address: addresses[0] })
            }} >
            <View style={styles.buttonContent}>
              <ReqIcon color={colors.text} />
              <BodyText style={styles.smallButtonText}>{translate('request')}</BodyText>
            </View>
          </SmallButton>
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
              /* pktManager.current.createAddress().then(address => setNewAddress(address))
              modal.current.open() */
            }}
          />
          <View style={styles.addContactButtonContainer}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                pktManager.current.createAddress().then(addr => setNewAddress(addr))
                modal.current.open()
              }}
            >
              {/* <PlusIcon fill={colors.link.color} size={25} /> */}
              <BodyText >{'+ ' + translate('newContacts')}</BodyText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Screen>
  )
}

export default WalletHomeView
