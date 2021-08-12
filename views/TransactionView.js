import React, { useEffect, useState, useRef } from 'react'
import { View, StyleSheet, Linking } from 'react-native'
import { useTheme } from '@react-navigation/native'
import Screen from '../components/Screen'
import ActiveButton from '../components/buttons/ActiveButton'
import LinkButton from '../components/buttons/LinkButton'
import BodyText from '../components/text/BodyText'
import AccountBalance from '../components/wallet/AccountBalance'
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
            onPress={() => {
              ClipboardManager.set(transaction.txid)
            }}
          />
          {SharingManager.hasSharing() &&
            <LinkButton
              style={styles.linkTextBottom}
              title={translate('shareTransactionId')}
              onPress={() => {
                SharingManager.share(transaction.txid)
              }}
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
            onPress={() => {
              ClipboardManager.set(transaction.txid)
            }}
          />
          {SharingManager.hasSharing() &&
            <LinkButton
              style={styles.linkTextBottom}
              title={translate('shareTransactionId')}
              onPress={() => {
                SharingManager.share(transaction.txid)
              }}
            />}
        </View>
      </View>
    </View>
  )
}

const TransactionView = ({ navigation, route }) => {
  const { colors, dimensions } = useTheme()
  const modalRef = useRef()
  const [transaction, setTransaction] = useState({})
  const [fromName, setFromName] = useState(translate('unnamedAddress'))
  const [toName, setToName] = useState(translate('unnamedAddress'))
  const [fromAddress, setFromAddress] = useState({})
  const [toAddress, setToAddress] = useState({})
  const [note, setNote] = useState('')
  const [newNote, setNewNote] = useState('')
  const [hasNote, setHasNote] = useState(false)
  const transactionNoteManager = useRef(new TransactionNoteManager())
  const contactManager = useRef(new ContactManager())
  const pktManager = useRef(new PktManager())

  const isSpend = (transaction) => {
    return (transaction.category === 'spend')
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
      return translate('spendTransactionType')
    } else if (isMiningIncome(transaction)) {
      return translate('miningIncomeTransactionType')
    } else {
      return translate('unknownTransactionType')
    }
  }

  const fetchContacts = async (transaction) => {
    // TODO: match transaction addressses with local addresses
    const contacts = await contactManager.current.getAll()
    const fromContact = await contactManager.current.getByAddress(transaction.address)
    const toContact = await contactManager.current.getByAddress(transaction.address)
    if (fromContact) {
      setFromName(fromContact)
    }
    if (toContact) {
      setToName(toContact)
    }
    const fromAddress = await pktManager.current.getAddressInfo(transaction.address)
    const toAddress = await pktManager.current.getAddressInfo(transaction.address)

    if (fromAddress) {
      setFromAddress(fromAddress)
    } else {
      setFromAddress({ address: transaction.address })
    }
    if (toAddress) {
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
  }

  const openInBlockExplorer = (transaction) => {
    const url = `https://explorer.pkt.cash/tx/${transaction.txid}`
    Linking.openURL(url).catch((err) => {
      console.log('error occurred trying to open in browser')
      console.log(err)
    })
  }

  const fetchNote = async (transaction) => {
    const note = await transactionNoteManager.current.get(transaction.txid)
    if (note) {
      setNote(note)
      setNewNote(note)
      setHasNote(true)
    } else {
      setHasNote(false)
    }
  }

  const getTransactionDateTime = (transaction) => {
    const date = new Date(transaction.time)
    return date.toLocaleString()
  }

  useEffect(() => {
    if (route.params && route.params.transaction) {
      setTransaction(route.params.transaction)
      fetchContacts(route.params.transaction)
      fetchNote(route.params.transaction)
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
      paddingHorizontal: dimensions.screen.paddingHorizontal
    },
    bannerConfirmed: {
      backgroundColor: colors.alertBanner.successBackgroundColor
    },
    bannerUnconfirmed: {
      backgroundColor: colors.alertBanner.warningBackgroundColor
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
    }
  })

  const getBannerStyle = () => {
    const bannerStyles = [styles.banner]
    if (transaction.confirmations) {
      bannerStyles.push(styles.bannerConfirmed)
    } else {
      bannerStyles.push(styles.bannerUnconfirmed)
    }
    return bannerStyles
  }

  return (
    <Screen>
      <View style={styles.container}>
        {isSpend(transaction)
          ? <BodyText>{translate('amountSent')}</BodyText>
          : <BodyText>{translate('amountReceived')}</BodyText>}
        <AccountBalance
          style={styles.accountBalance}
          amount={transaction.amount}
          isVisible
        />
      </View>
      <View style={[getBannerStyle()]}>
        <BodyText
          style={styles.statusLabel}
        >
          {translate('status')}
        </BodyText>
        {transaction.confirmations
          ? <BodyText>{translate('confirmed')}</BodyText>
          : <BodyText>{translate('unconfirmed')}</BodyText>}
        <View style={styles.confirmedStatusIcon}>
          {transaction.confirmations
            ? <ConfirmedIcon
              color={colors.text}
            />
            : <UnconfirmedIcon
              color={colors.text}
            />}
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.tableRow}>
          <BodyText style={styles.statusLabel}>
            {translate('transactionType')}
          </BodyText>
          <BodyText>
            {getTransactionTypeText(transaction)}
          </BodyText>
        </View>
        <View style={styles.addressData}>
          <BodyText style={styles.fromLabel}>
            {translate('from')}
          </BodyText>
          <WalletListItem
            address={transaction.address}
            name={fromName}
            amount={fromAddress.amount}
          />
        </View>
        <View style={styles.addressData}>
          <BodyText style={styles.toLabel}>
            {translate('to')}
          </BodyText>
          <WalletListItem
            address={transaction.address}
            name={toName}
            amount={toAddress.amount}
          />
        </View>
        <View style={styles.tableRow}>
          <BodyText style={styles.statusLabel}>
            {translate('date')}
          </BodyText>
          <BodyText>
            {getTransactionDateTime(transaction)}
          </BodyText>
        </View>
        <View style={styles.tableRow}>
          <BodyText style={styles.statusLabel}>{translate('numConfirmations')}</BodyText>
          <BodyText style={styles.transactionId}>{transaction.confirmations}</BodyText>
        </View>
        <Tabs
          style={styles.tabs}
          tabs={[
            {
              title: translate('qrCode'),
              content: <TransactionQrCode transaction={transaction} />
            },
            {
              title: translate('transactionId'),
              content: <TransactionTextCode transaction={transaction} />
            }
          ]}
        />
        <View style={styles.noteBlock}>
          <BodyText style={styles.statusLabel}>
            {translate('note')}
          </BodyText>
          {hasNote
            ? <BodyText>{note}</BodyText>
            : <BodyText style={styles.noNote}>{translate('noNote')}</BodyText>}
        </View>
        <ActiveButton
          style={styles.topButton}
          title={translate('addNote')}
          onPress={() => {
            editNote()
          }}
        />
        <ActiveButton
          title={translate('openInBlockExplorer')}
          onPress={() => {
            openInBlockExplorer(transaction)
          }}
        />
      </View>
      <Modal
        ref={modalRef}
        title={translate('editNote')}
        content={
          <View>
            <GenericTextInput
              placeholder={translate('notePlaceholder')}
              help={translate('noteHelpText')}
              initialValue={note}
              onChangeText={(text) => {
                setNewNote(text)
              }}
            />
          </View>
        }
        footer={
          <ActiveButton
            title={translate('saveNote')}
            onPress={() => {
              transactionNoteManager.current.set(
                transaction.txid,
                newNote
              )
              setNote(newNote)
              setHasNote(true)
              modalRef.current.close()
            }}
          />
        }
      />
    </Screen>
  )
}

export default TransactionView
