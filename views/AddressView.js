import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import Screen from '../components/Screen'
import BodyText from '../components/text/BodyText'
import WalletListItem from '../components/wallet/WalletListItem'
import AccountBalance from '../components/wallet/AccountBalance'
import Tabs from '../components/buttons/Tabs'
import AddressQrCode from '../components/wallet/AddressQrCode'
import PktAddressText from '../components/wallet/PktAddressText'
import ActiveButton from '../components/buttons/ActiveButton'
import LinkButton from '../components/buttons/LinkButton'
import TransactionList from '../components/transactions/TransactionList'
import ClipboardManager from '../utils/ClipboardManager'
import SharingManager from '../utils/SharingManager'
import ContactManager from '../utils/ContactManager'
import PktManager from '../utils/PktManager'
import PktPriceTicker from '../utils/PktPriceTicker'
import TransactionNoteManager from '../utils/TransactionNoteManager'
import { useTheme } from '@react-navigation/native'
import translate from '../translations'

// TODO: pull address from props
const dummyAddress = {
  amount: 123456.00134,
  address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk'
}

const QrCodeTabContent = (props) => {
  const { dimensions } = useTheme()
  const address = props.address

  const styles = StyleSheet.create({
    screen: {
      paddingHorizontal: dimensions.screen.paddingHorizontal,
      paddingVertical: dimensions.screen.paddingVertical
    },
    walletListItem: {
      paddingBottom: dimensions.verticalSpacingBetweenItems
    },
    card: {
      paddingVertical: dimensions.screen.paddingVertical
    },
    addressOptionsGroup: {
      paddingVertical: dimensions.paddingVertical
    },
    linkTextTop: {
      paddingBottom: dimensions.verticalSpacingBetweenItems
    },
    text: {
      paddingBottom: dimensions.verticalSpacingBetweenItems
    },
    textBlock: {
      textAlign: 'center'
    },
    tabs: {
      paddingVertical: dimensions.paddingVertical
    }
  })

  return (
    <View style={styles.textBlock}>
      <BodyText style={styles.text}>{translate('whatIsAddressCode1')}</BodyText>
      <BodyText>
        {translate('whatIsAddressCode2')}
      </BodyText>
      <View style={styles.card}>
        <AddressQrCode address={address.address} />
        <View style={styles.addressOptionsGroup}>
          <LinkButton
            style={styles.linkTextTop}
            title={translate('copyAddress')}
            onPress={() => {
              ClipboardManager.set(address.address)
            }}
          />
          {SharingManager.hasSharing() &&
            <LinkButton
              title={translate('shareAddress')}
              onPress={() => {
                SharingManager.share(address.address)
              }}
            />}
        </View>
      </View>
      <ActiveButton title={translate('sendPkt')} />
    </View>
  )
}

const TextCodeTabContent = (props) => {
  const { dimensions } = useTheme()
  const address = props.address

  const styles = StyleSheet.create({
    screen: {
      paddingHorizontal: dimensions.screen.paddingHorizontal,
      paddingVertical: dimensions.screen.paddingVertical
    },
    walletListItem: {
      paddingBottom: dimensions.verticalSpacingBetweenItems
    },
    card: {
      paddingVertical: dimensions.screen.paddingVertical
    },
    addressOptionsGroup: {
      paddingVertical: dimensions.paddingVertical
    },
    linkTextTop: {
      paddingBottom: dimensions.verticalSpacingBetweenItems
    },
    text: {
      paddingBottom: dimensions.verticalSpacingBetweenItems
    },
    textBlock: {
      textAlign: 'center'
    },
    tabs: {
      paddingVertical: dimensions.paddingVertical
    }
  })

  return (
    <View style={styles.textBlock}>
      <BodyText style={styles.text}>{translate('whatIsAddressCode1')}</BodyText>
      <BodyText>
        {translate('whatIsAddressCode2')}
      </BodyText>
      <View style={styles.card}>
        <PktAddressText address={address.address} />
        <View style={styles.addressOptionsGroup}>
          <LinkButton
            style={styles.linkTextTop}
            title={translate('copyAddress')}
            onPress={() => {
              ClipboardManager.set(address.address)
            }}
          />
          {SharingManager.hasSharing() &&
            <LinkButton
              title={translate('shareAddress')}
              onPress={() => {
                SharingManager.share(address.address)
              }}
            />}
        </View>
      </View>
      <ActiveButton title={translate('sendPkt')} />
    </View>
  )
}

const TransactionTabContent = (props) => {
  const { colors, dimensions } = useTheme()
  const pktManager = useRef(new PktManager())
  const [transactions, _setTransactions] = useState([])
  const [areTransactionsFetched, setAreTransactionsFetched] = useState(false)
  const [offset, setOffset] = useState(0)
  const [numTransactions, ] = useState(10) // FIXME: make this 100
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true)
  const [areMoreTransactionsAvailable, setAreMoreTransactionsAvailable] = useState(true)
  const transactionNoteManager = useRef(new TransactionNoteManager())
  const address = props.address
  const pktPriceTicker = props.pktPriceTicker
  const setTransactions = async (offset) => {
    // console.log(`Loading transactions from ${offset}`)
    if (!offset) {
      offset = 0
    }
    const existingTransactions = transactions
    const newTransactions = await pktManager.current.getTransactions(
      address, numTransactions, offset
    )
    // console.log(`${newTransactions.length} transactions fetched`)
    // match notes to the transactions
    for (let row = 0; row < newTransactions.length; row++) {
      const transaction = newTransactions[row]
      const note = await transactionNoteManager.current.get(transaction.txid)
      if (note) {
        transaction[note] = note
      }
      existingTransactions.push(transaction)
    }
    // console.log(`setting ${existingTransactions.length} transactions`)
    _setTransactions(existingTransactions)
    setAreTransactionsFetched(true)
    setAreMoreTransactionsAvailable(newTransactions.length >= numTransactions)
    setIsLoadingTransactions(false)
  }
  useEffect(() => {
    const initialize = async () => {
      await setTransactions()
    }
    initialize()
  }, [])

  useEffect(() => {
    console.log('refresh')
  })

  const styles = StyleSheet.create({
    loadMoreButton: {
      paddingVertical: dimensions.paddingVertical,
      paddingHorizontal: dimensions.paddingHorizontal
    }
  })

  return (
    <View>
      <TransactionList
        refreshing={isLoadingTransactions}
        transactions={transactions}
        contacts={props.contacts}
        contactLookup={props.contactLookup}
        pktPriceTicker={pktPriceTicker}
        onListItemPress={(row) => {
          if (props.onListItemPress) {
            props.onListItemPress(transactions[row])
          }
        }}
      />
      {areMoreTransactionsAvailable &&
        <View style={styles.loadMoreButton}>
          {!isLoadingTransactions
            ? (<LinkButton
                title={translate('loadMore')}
                onPress={() => {
                  setIsLoadingTransactions(true)
                  const nextOffset = offset + numTransactions
                  setOffset(nextOffset)
                  setTransactions(nextOffset)
                }}
              />)
            : (<ActivityIndicator size='small' />)}
        </View>}
    </View>
  )
}

const AddressView = ({ navigation, route }) => {
  const { dimensions } = useTheme()
  const [address, setAddress] = useState({})
  const [areContactsLoaded, setAreContactsLoaded] = useState(false)
  const [contacts, setContacts] = useState([])
  const [contactLookup, setContactLookup] = useState({})
  const pktPriceTicker = useRef(new PktPriceTicker())
  const contactManager = useRef(new ContactManager())

  const fetchContacts = async () => {
    // TODO: use the contactManager.current.getByAddress() function
    if (!areContactsLoaded) {
      let address = {}
      if (route.params && route.params.address) {
        address = route.params.address
      }
      const contacts = await contactManager.current.getAll()
      const contactLookup = {}
      for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i]
        contactLookup[contact.address] = contact
        if (contact.address === address.address) {
          address.name = contact.name
        }
      }
      setAddress(address)
      setContacts(contacts)
      setContactLookup(contactLookup)
      setAreContactsLoaded(true)
    }
  }

  useEffect(() => {
    console.log(route.params)
    if (route.params && route.params.address) {
      setAddress(route.params.address)
    } else {
      setAddress(dummyAddress)
    }
    fetchContacts()
  }, [route.params])

  const styles = StyleSheet.create({
    screen: {
      paddingHorizontal: dimensions.screen.paddingHorizontal,
      paddingVertical: dimensions.screen.paddingVertical
    },
    walletListItem: {
      paddingBottom: dimensions.verticalSpacingBetweenItems
    },
    card: {
      paddingVertical: dimensions.screen.paddingVertical
    },
    addressOptionsGroup: {
      paddingVertical: dimensions.paddingVertical
    },
    linkTextTop: {
      paddingBottom: dimensions.verticalSpacingBetweenItems
    },
    text: {
      paddingBottom: dimensions.verticalSpacingBetweenItems
    },
    textBlock: {
      textAlign: 'center'
    },
    tabs: {
      paddingVertical: dimensions.paddingVertical
    }
  })

  return (
    <Screen>
      <View style={styles.screen}>
        <WalletListItem
          name={address.name}
          address={address.address}
          amount={address.total}
          showAmount={false}
          style={styles.walletListItem}
        />
        <AccountBalance
          amount={address.total}
          isVisible
        />
        <Tabs
          initialTabId={2}
          tabs={[
            {
              title: translate('qr'),
              content: (
                <QrCodeTabContent address={address} />
              )
            },
            {
              title: translate('address'),
              content: (
                <TextCodeTabContent
                  address={address}
                />
              )
            },
            {
              title: translate('transactions'),
              content: (
                <TransactionTabContent
                  address={address}
                  contacts={contacts}
                  contactLookup={contactLookup}
                  pktPriceTicker={pktPriceTicker}
                  onListItemPress={(transaction) => {
                    navigation.push('TransactionView', { transaction: transaction })
                  }}
                />
              )
            }
          ]}
          style={styles.tabs}
        />
      </View>
    </Screen>
  )
}

export default AddressView
