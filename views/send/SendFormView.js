import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Screen from '../../components/Screen'
import ActiveButton from '../../components/buttons/ActiveButton'
import LocalAddressSelector from '../../components/inputs/LocalAddressSelector'
import RemoteAddressWidget from '../../components/inputs/RemoteAddressWidget'
import AmountInputWithExchangeRate from '../../components/inputs/AmountInputWithExchangeRate'
import GenericTextInput from '../../components/inputs/GenericTextInput'
import BodyText from '../../components/text/BodyText'
import WalletListItem from '../../components/wallet/WalletListItem'
// import TableRow from '../../components/TableRow'
import Modal from '../../components/Modal'
import PktAddressInput from '../../components/inputs/PktAddressInput'
import translate from '../../translations'
import PktPriceTicker from '../../utils/PktPriceTicker'
import PktManager from '../../utils/PktManager'
import { useTheme } from '@react-navigation/native'

const SendFormView = ({ navigation, route }) => {
  const { colors, dimensions } = useTheme()
  const [fromAddress, setFromAddress] = useState('')
  const [fromContact, setFromContact] = useState({})
  const [isFromAddressValid, setIsFromAddressValid] = useState(false)
  const [toContact, setToContact] = useState({})
  const [toAddress, setToAddress] = useState('')
  const [isToAddressValid, setIsToAddressValid] = useState(false)
  const [amount, setAmount] = useState(0.0)
  const [isAmountValid, setIsAmountValid] = useState(false)
  const [note, setNote] = useState('')
  const [isFormFilled, setIsFormFilled] = useState(false)
  const pktPriceTicker = useRef(new PktPriceTicker())
  const pktManager = useRef(new PktManager())
  const toAddressModalRef = useRef()
  const toAddressInputRef = useRef()
  const [newToAddress, setNewToAddress] = useState('')
  const [isNewToAddressValid, setIsNewToAddressValid] = useState(false)
  const updateIsFormFilled = (fromAddress, toAddress, amount) => {
    if (isFromAddressValid &&
        isToAddressValid &&
        amount > 0 &&
        pktManager.current.isAmountLessThanWalletBalance(amount, fromAddress)
    ) {
      setIsFormFilled(true)
    } else {
      setIsFormFilled(false)
    }
  }
  useEffect(() => {
    if (route.params) {
      if (route.params.fromContact) {
        onFromContactSelected(route.params.fromContact)
      }
      if (route.params.toAddress) {
        setToAddress(route.params.toAddress)
      }
    }
  })

  const onFromContactSelected = (contact) => {
    setFromContact(contact)
    setFromAddress(contact.address)
    setIsFromAddressValid(true)
  }

  const onToContactSelected = (contact) => {
    console.log(contact)
    setToContact(contact)
    setToAddress(contact.address)
    setIsToAddressValid(true)
  }

  const getIsFormFilled = () => {
    if (
      fromAddress &&
      PktManager.isValidAddress(fromAddress) &&
      toAddress &&
      PktManager.isValidAddress(toAddress) &&
      amount &&
      amount > 0 &&
      isAmountValid
    ) {
      return true
    } else {
      return false
    }
  }

  const styles = StyleSheet.create({
    screen: {
      paddingHorizontal: dimensions.screen.paddingHorizontal,
      paddingVertical: dimensions.screen.paddingVertical
    },
    sendingEstimateContainer: {
      paddingBottom: dimensions.verticalSpacingBetweenItems,
      width: '100%'
    },
    fromAddressInput: {
      paddingBottom: dimensions.paddingVertical
    },
    toAddressInput: {
      paddingBottom: dimensions.paddingVertical
    },
    amountInput: {
      paddingBottom: dimensions.paddingVertical
    },
    noteInput: {
      paddingBottom: dimensions.paddingVertical
    },
    fromAddressWalletListItem: {
      borderColor: colors.inputs.borderColor,
      borderRadius: dimensions.inputs.borderRadius,
      borderTopWidth: dimensions.inputs.borderTopWidth,
      borderLeftWidth: dimensions.inputs.borderLeftWidth,
      borderRightWidth: dimensions.inputs.borderRightWidth,
      borderBottomWidth: dimensions.inputs.borderBottomWidth,
      paddingVertical: dimensions.verticalSpacingBetweenItems
    },
    label: {
      paddingBottom: dimensions.inputs.labelPaddingBottom,
      color: colors.inputs.labelColor
    },
    debug: {
    }
  })

  return (
    <Screen>
      <View style={styles.screen}>
        <TouchableOpacity
          style={styles.fromAddressInput}
          onPress={() => {
            navigation.push('ContactBookView', {
              selectorMode: true,
              localOnly: true,
              onContactSelected: onFromContactSelected
            })
          }}
        >
          {fromContact.address
            ? (
              <>
                <BodyText style={styles.label}>{translate('from')}</BodyText>
                <WalletListItem
                  name={fromContact.name}
                  address={fromContact.address}
                  amount={fromContact.amount}
                  style={styles.fromAddressWalletListItem}
                />
              </>
            )
            : (
              <LocalAddressSelector
                label={translate('from')}
                placeholder={translate('localAddressPlaceholder')}
                onChangeText={(address) => {
                  setFromAddress(address)
                }}
              />
            )}
        </TouchableOpacity>
        <RemoteAddressWidget
          address={toAddress}
          ref={toAddressInputRef}
          style={styles.fromAddressInput}
          label={translate('to')}
          placeholder={translate('remoteAddressPlaceholder')}
          /* help={translate('remoteAddressHelpText')} */
          onQrCodeIconPress={() => {
            navigation.push('QrCodeScannerView')
          }}
          onPersonIconPress={() => {
            navigation.push('ContactBookView', {
              selectorMode: true,
              onContactSelected: onToContactSelected
            })
          }}
          onChangeText={(address) => {
            setToAddress(address)
          }}
          onPress={() => {
            toAddressModalRef.current.open()
          }}
          onValid={(address, isValid) => {
            setToAddress(address)
            setIsToAddressValid(isValid)
          }}
        />
        <AmountInputWithExchangeRate
          style={styles.amountInput}
          label={translate('amount')}
          fiat={{ code: pktPriceTicker.current.getUserFiatCurrency() }}
          maxAmount={fromContact.amount}
          disabled={!isFromAddressValid}
          onChangePktAmount={(amountPkt, isAmountValid) => {
            setAmount(amountPkt)
            setIsAmountValid(isAmountValid)
          }}
        />
        <GenericTextInput
          label={translate('note')}
          style={styles.noteInput}
          placeholder={translate('notePlaceholder')}
          help={translate('noteHelpText')}
          onChangeText={(text) => setNote(text)}
          value={note}
        />
        {/*  TODO: in a future version, estimate network cost
        <View style={styles.sendingEstimateContainer}>
          <TableRow
            label={translate('estimatedSendingCost')}
            value='0.00 PKT'
          />
          <TableRow
            label={translate('estimatedTotalCost')}
            value='0.00 PKT'
          />
        </View>
        */}
        <ActiveButton
          title={translate('previewSend')}
          onPress={() => {
            navigation.push(
              'SendPreviewView',
              {
                fromAddress,
                toAddress,
                amount,
                note
              }
            )
          }}
          disabled={!getIsFormFilled()}
        />
      </View>
      <Modal
        ref={toAddressModalRef}
        title={translate('recipientAddress')}
        content={
          <View>
            <PktAddressInput
              placeholder={translate('remoteAddressPlaceholder')}
              address={toAddress}
              onValid={(address, isValid) => {
                setNewToAddress(address)
                setIsNewToAddressValid(isValid)
              }}
              onPersonIconPress={() => {
                navigation.push('ContactBookView', {
                  selectorMode: true,
                  onContactSelected: onToContactSelected
                })
              }}
              onQrCodeIconPress={() => {
                navigation.push('QrCodeScannerView')
              }}
            />
          </View>
        }
        footer={
          <ActiveButton
            title={translate('useAddress')}
            onPress={() => {
              setToAddress(newToAddress)
              toAddressInputRef.current.setAddress(newToAddress)
              toAddressModalRef.current.close()
            }}
            disabled={!isNewToAddressValid}
          />
        }
      />
    </Screen>
  )
}

export default SendFormView
