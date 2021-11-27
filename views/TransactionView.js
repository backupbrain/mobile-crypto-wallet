import React, { useEffect, useState, useRef } from 'react'
import { View, StyleSheet, Linking, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'
import Screen from '../components/Screen'
import ActiveButton from '../components/buttons/ActiveButton'
import LinkButton from '../components/buttons/LinkButton'
import BodyText from '../components/text/BodyText'
import AccountBalance from '../components/wallet/AccountBalance'
import WalletList from '../components/wallet/WalletList'
import WalletListItem from '../components/wallet/WalletListItem'
import ConfirmedIcon from '../components/images/ConfirmedIcon'
import UnconfirmedIcon from '../components/images/UnconfirmedIcon'
import Tabs from '../components/buttons/Tabs'
import AddressQrCode from '../components/wallet/AddressQrCode'
import PktTransactionText from '../components/wallet/PktTransactionText'
import Modal from '../components/Modal'
import GenericTextInput from '../components/inputs/GenericTextInput'
import SharingManager from '../utils/SharingManager'
import ClipboardManager from '../utils/ClipboardManager'
import ContactManager from '../utils/ContactManager'
import PktManager from '../utils/PktManager'
import TransactionNoteManager from '../utils/TransactionNoteManager'
import translate from '../translations'
import PktPriceTicker from '../utils/PktPriceTicker'
import NoteIcon from '../components/images/NoteIcon'
import PendingIcon from '../components/images/PendingIcon'

const TransactionQrCode = (props) => {
  const { dimensions } = useTheme()
  const transaction = props.transaction

  const styles = StyleSheet.create({
    screen: {
      paddingHorizontal: dimensions.screen.paddingHorizontal
    },
    walletListItem: {
      paddingBottom: dimensions.verticalSpacingBetweenItems
    },
    card: {
      paddingTop: dimensions.screen.paddingVertical
    },
    addressOptionsGroup: {
      paddingTop: dimensions.paddingVertical
    },
    linkTextBottom: {
      paddingTop: dimensions.verticalSpacingBetweenItems
    },
    text: {
      paddingBottom: dimensions.verticalSpacingBetweenItems
    },
    textBlock: {
      textAlign: 'center'
    },
    tabs: {
      // paddingVertical: dimensions.paddingVertical
    }
  })

  return (
    <View style={styles.textBlock}>
      <BodyText style={styles.text}>{translate('whatIsTransactionId1')}</BodyText>
      <BodyText>
        {translate('whatIsTransactionId2')}
      </BodyText>
      <View style={styles.card}>
        <AddressQrCode address={transaction.txid} />
        <View style={styles.addressOptionsGroup}>
          <LinkButton
            title={translate('copyTransactionId')}
            onPress={ClipboardManager.set.bind(this, transaction.txid)}
          />
          {SharingManager.hasSharing() &&
            <LinkButton
              style={styles.linkTextBottom}
              title={translate('shareTransactionId')}
              onPress={SharingManager.share.bind(this, transaction.txid)}
            />}
        </View>
      </View>
    </View>
  )
}

const TransactionTextCode = (props) => {
  const { dimensions } = useTheme()
  const transaction = props.transaction

  const styles = StyleSheet.create({
    screen: {
      paddingHorizontal: dimensions.screen.paddingHorizontal
    },
    walletListItem: {
      paddingBottom: dimensions.verticalSpacingBetweenItems
    },
    card: {
      paddingTop: dimensions.screen.paddingVertical
    },
    addressOptionsGroup: {
      paddingTop: dimensions.paddingVertical
    },
    linkTextBottom: {
      paddingTop: dimensions.verticalSpacingBetweenItems
    },
    text: {
      paddingBottom: dimensions.verticalSpacingBetweenItems
    },
    textBlock: {
      textAlign: 'center'
    },
    tabs: {
      // paddingVertical: dimensions.paddingVertical
    }
  })

  return (
    <View style={styles.textBlock}>
      <BodyText style={styles.text}>{translate('whatIsTransactionId1')}</BodyText>
      <BodyText>
        {translate('whatIsTransactionId2')}
      </BodyText>
      <View style={styles.card}>
        <PktTransactionText transactionId={transaction.txid} />
        <View style={styles.addressOptionsGroup}>
          <LinkButton
            title={translate('copyTransactionId')}
            onPress={ClipboardManager.set.bind(this, transaction.txid)}
          />
          {SharingManager.hasSharing() &&
            <LinkButton
              style={styles.linkTextBottom}
              title={translate('shareTransactionId')}
              onPress={SharingManager.share.bind(this, transaction.txid)}
            />}
        </View>
      </View>
    </View>
  )
}

const TransactionView = ({ navigation, route }) => {
  const { colors, dimensions } = useTheme()
  const modalRef = useRef(null)
  const detailsModalRef = useRef(null)
  const [transaction, setTransaction] = useState({})
  const [, setExtendedTransactionData] = useState({})
  const [fromName, setFromName] = useState(translate('unnamedAddress'))
  // const [toName, setToName] = useState(translate('unnamedAddress'))
  const [fromAddress, setFromAddress] = useState({})
  // const [toAddress, setToAddress] = useState({})
  const [toAddresses, setToAddresses] = useState([])
  const [note, setNote] = useState('')
  const [newNote, setNewNote] = useState('')
  const [hasNote, setHasNote] = useState(false)
  const transactionNoteManager = useRef(new TransactionNoteManager())
  const contactManager = useRef(new ContactManager())
  const pktManager = useRef(new PktManager())
  const priceTicker = useRef(new PktPriceTicker())

  const isSpend = (transaction) => {
    return (transaction.category === 'send')
  }

  const isReceive = (transaction) => {
    return (transaction.category === 'receive')
  }

  const isMiningIncome = (transaction) => {
    // FIXME: make sure this is the correct `.category`
    return (transaction.category === 'mining')
  }

  const editNote = async () => {
    modalRef.current.open()
  }

  const getTransactionTypeText = (transaction) => {
    if (isReceive(transaction)) {
      return translate('receiveTransactionType')
    } else if (isSpend(transaction)) {
      return translate('sendTransactionType')
    } else if (isMiningIncome(transaction)) {
      return translate('miningIncomeTransactionType')
    } else {
      return translate('unknownTransactionType')
    }
  }

  const fetchContacts = async (transaction, extendedTransactionData) => {
    // TODO: match transaction addressses with local addresses
    await contactManager.current.getAll()
    const fromContact = await contactManager.current.getByAddress(transaction.address)
    // const toContact = await contactManager.current.getByAddress(transaction.address)
    if (fromContact) {
      setFromName(fromContact.name)
    }
    /*
    if (toContact) {
      setToName(toContact.name)
    }
    /* */
    const fromAddress = await pktManager.current.getAddressInfo(transaction.address)
    // const toAddress = await pktManager.current.getAddressInfo(transaction.address)

    if (fromAddress) {
      fromAddress.isLocal = true
      if (fromContact) {
        fromAddress.name = fromContact.name
      }
      setFromAddress(fromAddress)
    } else {
      if (fromContact) {
        fromAddress.name = fromContact.name
      }
      setFromAddress({ address: transaction.address })
    }
    // get to addresses
    // TODO: determine if the first detail must be shown
    const rawToAddresses = extendedTransactionData.details.slice(1, extendedTransactionData.details.length)
    const toAddresses = []
    for (let row = 0; row < rawToAddresses.length; row++) {
      const toAddress = rawToAddresses[row]
      const address = {
        total: null,
        name: null,
        address: toAddress.address
      }
      const myToAdddress = await pktManager.current.getAddressInfo(toAddress.address)
      if (myToAdddress) {
        address.total = myToAdddress.total
        address.isLocal = true
      }
      const toContact = await contactManager.current.getByAddress(toAddress.address)
      if (toContact) {
        address.name = toContact.name
      }
      toAddresses.push(address)
    }
    setToAddresses(toAddresses)
    /*
    if (toAddress) {
      toAddress.isLocal = true
      setToAddress(toAddress)
    } else {
      setToAddress({ address: transaction.address })
    }
    for (let i = 0; i < contacts.length; i++) {
      const contact = contacts[i]
      if (contact.address === transaction.address) {
        setFromName(contact.name)
      }
      if (contact.address === transaction.address) {
        setToName(contact.name)
      }
    }
    /* */
  }

  const fetchNote = async (transactionId) => {
    const note = await transactionNoteManager.current.get(transactionId)
    if (note) {
      setNote(note)
      setNewNote(note)
      setHasNote(true)
    } else {
      setHasNote(false)
    }
  }
  const formatDate = (timestamp) => {

    const date = new Date(timestamp)
    const day = date.toLocaleDateString('en-US', { weekday: 'long' }).substring(0, 3)
    const dayNumber = date.getDate()
    const hour = date.getHours();
    const min = date.getMinutes()

    return `${day} ${dayNumber} at ${hour}:${min}`
  }

  const getTransactionDateTime = (transaction) => {
    const date = formatDate(parseInt(transaction.time) * 1000)
    return date.toLocaleString()
  }

  useEffect(() => {
    const fetchTransactionData = async () => {
      const transaction = await pktManager.current.getTransaction(transactionId)
      setTransaction(transaction)
      const transactionId = route.params.transactionId
      const extendedTransactionData = await pktManager.current.getTransaction(transactionId)
      setExtendedTransactionData(extendedTransactionData)
      fetchContacts(transaction, extendedTransactionData)
      fetchNote(transactionId)
    }
    if (route.params && route.params.transactionId) {
      fetchTransactionData()
    }
  }, [route.params, setTransaction])

  const styles = StyleSheet.create({
    container: {
      paddingVertical: dimensions.screen.paddingVertical,
      paddingHorizontal: dimensions.screen.paddingHorizontal
    },
    topButton: {
      paddingBottom: dimensions.paddingVertical
    },
    accountBalance: {
      paddingVertical: dimensions.verticalSpacingBetweenItems
    },
    fromLabel: {
      paddingVertical: dimensions.verticalSpacingBetweenItems
    },
    toLabel: {
      paddingTop: dimensions.verticalSpacingBetweenItems
    },
    toAddress: {
      paddingVertical: dimensions.verticalSpacingBetweenItems
    },
    addressData: {
      paddingVertical: dimensions.verticalSpacingBetweenItems
    },
    tableRow: {
      flexDirection: 'row',
      paddingVertical: dimensions.verticalSpacingBetweenItems
    },
    statusLabel: {
      flexGrow: 1,
      paddingRight: dimensions.verticalSpacingBetweenItems,
      justifyContent: 'flex-start',
      alignItems: 'flex-start'
    },
    bannerLabel: {
      flexGrow: 1,
      paddingRight: dimensions.verticalSpacingBetweenItems,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      color: colors.alertBanner.color
    },
    confirmationText: {
      color: colors.transactionListItem.confirmedIconColor
    },
    unconfirmedText: {
      color: colors.transactionListItem.pendingIconColor
    },
    confirmedStatusIcon: {
      paddingLeft: dimensions.verticalSpacingBetweenItems
    },
    noteBlock: {
      paddingTop: dimensions.horizontalSpacingBetweenItems,
      paddingBottom: dimensions.paddingHorizontal
    },
    banner: {
      flexDirection: 'row',
      paddingVertical: dimensions.screen.paddingVertical,
      paddingHorizontal: dimensions.screen.paddingHorizontal,
    },
    tabs: {
      paddingVertical: dimensions.verticalSpacingBetweenItems
    },
    transactionId: {
      flex: 1,
      flexWrap: 'wrap',
      overflowWrap: 'break-word',
      wordBreak: 'break-all',
      textAlign: 'right'
    },
    noNote: {
      color: colors.disabledText
    },
    disabledText: {
      color: colors.disabledText
    },
    modalBackground: {
      justifyContent: 'flex-end'
    },
    recipient: {
      paddingVertical: dimensions.verticalSpacingBetweenItems
    },
    flexRow: {
      flexDirection: 'row'
    },
    borderBox: {
      borderColor: colors.inputs.borderColor,
      borderTopWidth: dimensions.inputs.borderTopWidth,
      borderBottomWidth: dimensions.inputs.borderBottomWidth,
      height: 64,
      padding: dimensions.horizontalSpacingBetweenItemsShort,
      marginVertical: dimensions.verticalSpacingBetweenItems,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    justify: {
      height: '100%',
      justifyContent: 'space-between'
    },
    noteContainer: {
      flex: 1,
    },
    noteHeader: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      width: '100%'
    },
    date: {
      textAlign: 'center',
    },
    addContactButtonContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: dimensions.paddingVertical,
    },
    button: {
      marginVertical: dimensions.paddingHorizontal
    },
    modalNoteInput: {
      height: 230,
      justifyContent: 'flex-start'
    }
  })

  const _onActiveButtonPressHandler = () => {
    transactionNoteManager.current.set(
      transaction.txid,
      newNote
    )
    setNote(newNote)
    setHasNote(true)
    modalRef.current.close()
  }

  const openInBlockExplorer = (transaction) => {
    /* const url = `https://explorer.pkt.cash/tx/${transaction.txid}` */
    // TODO : Change this demo address
    const url = `https://explorer.pkt.cash/address/pkt1q6hqsqhqdgqfd8t3xwgceulu7k9d9w5t2amath0qxyfjlvl3s3u4sjza2g2`
    Linking.openURL(url).catch((err) => {
      console.log('error occurred trying to open in browser')
      console.log(err)
    })
  }

  return (
    <Screen>
      <BodyText style={styles.date}>{getTransactionDateTime(transaction)}</BodyText>
      <View style={styles.container}>
        <BodyText style={styles.disabledText}>{translate('recipient')}</BodyText>
        <WalletListItem
          name={toAddresses.name}
          address={toAddresses.address}
          style={styles.recipient}
        />
        <View style={styles.borderBox}>
          <View style={styles.justify}>
            <BodyText style={styles.disabledText}>{translate('status')}</BodyText>
            <View style={styles.flexRow}>
              {transaction.confirmations
                ? <BodyText style={styles.confirmationText}>{translate('confirmed')}</BodyText>
                : <BodyText style={styles.unconfirmedText}>{translate('unconfirmed')}</BodyText>}
              <View style={styles.confirmedStatusIcon}>
                {transaction.confirmations
                  ? <ConfirmedIcon />
                  : <PendingIcon />}
              </View>
            </View>
          </View>
          <View style={styles.justify}>
            <BodyText style={styles.disabledText}>{translate('category')}</BodyText>
            <View style={styles.flexRow}>
              {isSpend(transaction)
                ? <BodyText >{translate('expense')}</BodyText>
                : <BodyText >{translate('income')}</BodyText>}
            </View>
          </View>
        </View>
        <View style={styles.borderBox}>
          <View style={styles.justify}>
            <BodyText style={styles.disabledText}>{translate('pktAmount')}</BodyText>
            <BodyText >{priceTicker.current.formatAmount(transaction.amount) + ' ' + translate('pkt')}</BodyText>
          </View>
        </View>
        <View style={styles.borderBox}>
          <View style={styles.justify}>
            <BodyText style={styles.disabledText}>{translate('amountInUsd')}</BodyText>
            <BodyText >{priceTicker.current.convertCurrency(false, transaction.amount) + ' ' + translate('usd')}</BodyText>
          </View>
        </View>
        <View style={styles.borderBox}>
          <View style={styles.justify}>
            <BodyText style={styles.disabledText}>{translate('currentPriceIn', { currency: priceTicker.current.getUserFiatCurrency() })}</BodyText>
            <BodyText >{priceTicker.current.formatAmount(priceTicker.current.getCurrentSpotPrice(priceTicker.current.getUserFiatCurrency())) + ' ' + translate('usd')}</BodyText>
          </View>
        </View>
        <View style={styles.borderBox}>
          <View style={styles.justify}>
            <BodyText style={styles.disabledText}>{translate('recipientAddress')}</BodyText>
            <BodyText >(Under construction)</BodyText>
          </View>
        </View>
        <TouchableOpacity style={styles.borderBox} onPress={() => modalRef.current.open()}>
          <View style={styles.noteContainer}>
            <View style={styles.noteHeader}>
              <BodyText style={styles.disabledText}>{translate('notes')}</BodyText>
              <NoteIcon color={colors.text} />
            </View>
            {hasNote
              ? <BodyText>{note}</BodyText>
              : <BodyText style={styles.noNote}>{translate('noNote')}</BodyText>}
          </View>
        </TouchableOpacity>
        <View style={styles.addContactButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              detailsModalRef.current.open()
            }}
          >
            <BodyText >{translate('advancedDetails')}</BodyText>
          </TouchableOpacity>
        </View>
        <ActiveButton
          title={translate('openInBlockExplorer')}
          onPress={openInBlockExplorer.bind(this)}
        />
      </View>
      <Modal
        ref={modalRef}
        title={translate('notes')}>
        <View>
          <GenericTextInput
            multiline={true}
            inputStyle={styles.modalNoteInput}
            placeholder={translate('notePlaceholder')}
            help={translate('noteHelpText')}
            initialValue={note}
            onChangeText={(text) => {
              setNewNote(text)
            }}
          />
        </View>
        <ActiveButton
          title={translate('save')}
          onPress={_onActiveButtonPressHandler}
          style={styles.button}
        />
      </Modal>
      <Modal
        ref={detailsModalRef}
        title={translate('advancedDetailsTitle')}>
        <View>
          <BodyText style={styles.disabledText}>{translate('transactionID')}</BodyText>
          <BodyText style={styles.button}>{transaction.txid}</BodyText>
        </View>
        <ActiveButton
          title={translate('openInBlockExplorer')}
          onPress={openInBlockExplorer.bind(this)}
          style={styles.button}
        />
      </Modal>
    </Screen>
  )
}

export default TransactionView
