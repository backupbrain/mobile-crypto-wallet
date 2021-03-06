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
  const [fromAddress, setFromAddress] = useState(route?.params?.fromContact?.address ?? '')
  const [fromContact, setFromContact] = useState(route?.params?.fromContact ?? {})
  const [isFromAddressValid, setIsFromAddressValid] = useState(false)
  const [toContact, setToContact] = useState(route?.params?.toContact ?? {})
  const [toAddress, setToAddress] = useState(route?.params?.toContact?.address ?? '')
  const [, setIsToAddressValid] = useState(false)
  const [amount, setAmount] = useState(0.0)
  const [isAmountValid, setIsAmountValid] = useState(false)
  const [note, setNote] = useState('')
  const pktPriceTicker = useRef(new PktPriceTicker())
  const toAddressModalRef = useRef()
  const toAddressInputRef = useRef()
  const newToAddress = useRef('')
  const activeButton = useRef()

  const onFromContactSelected = (contact) => {
    console.log(contact)
    setFromContact(contact)
    setFromAddress(contact.address)
    setIsFromAddressValid(true)
  }

  const onToContactSelected = (contact) => {
    console.log(contact)
    setToContact(contact)
    setToAddress(contact.address)
    toAddressInputRef.current.setAddress(contact.address)
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

  const _onPressHandler = () => {
    navigation.push('ContactBookView', {
      selectorMode: true,
      localOnly: true,
      onContactSelected: onFromContactSelected
    })
  }

  const _onQrCodeIconPressHandler = () => {
    navigation.push('QrCodeScannerView')
  }

  const _onPersonIconPressHandler = () => {
    navigation.push('ContactBookView', {
      selectorMode: true,
      onContactSelected: onToContactSelected
    })
  }

  const _onRemoteAddressChangeHandler = (address) => {
    setToAddress(address)
    setToContact({ address: address })
  }

  const _onRemoteAddressPressHandler = () => {
    toAddressModalRef.current.open()
  }

  const _onRemoteAddressValidHandler = (address, isValid) => {
    setToAddress(address)
    setIsToAddressValid(isValid)
  }

  const _onChangePktAmountHandler = (amountPkt, isAmountValid) => {
    setAmount(amountPkt)
    setIsAmountValid(isAmountValid)
  }

  const _onActiveButtonPressHandler = () => {
    navigation.push(
      'SendPreviewView',
      {
        fromAddress: fromContact,
        toAddress: toContact,
        amount,
        note
      }
    )
  }

  const _onActivePressHandler = () => {
    setToAddress(newToAddress.current)
    toAddressInputRef.current.setAddress(newToAddress.current)
    toAddressModalRef.current.close()
  }


  return (
    <Screen>
      <View style={styles.screen}>
        <TouchableOpacity
          style={styles.fromAddressInput}
          onPress={_onPressHandler}
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
          onQrCodeIconPress={_onQrCodeIconPressHandler}
          onPersonIconPress={_onPersonIconPressHandler}
          onChangeText={_onRemoteAddressChangeHandler}
          onPress={_onRemoteAddressPressHandler}
          onValid={_onRemoteAddressValidHandler}
        />
        <AmountInputWithExchangeRate
          style={styles.amountInput}
          label={translate('amount')}
          fiat={{ code: pktPriceTicker.current.getUserFiatCurrency() }}
          maxAmount={fromContact.total}
          disabled={!isFromAddressValid}
          onChangePktAmount={_onChangePktAmountHandler}
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
          onPress={_onActiveButtonPressHandler}
          disabled={!getIsFormFilled()}
        />
      </View>
      <Modal
        ref={toAddressModalRef}
        title={translate('recipientAddress')}
        content={() =>
          <View>
            <PktAddressInput
              placeholder={translate('remoteAddressPlaceholder')}
              address={toAddress}
              onValid={(address, isValid) => {
                newToAddress.current = address
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
        footer={() =>
          <ActiveButton
            ref={activeButton}
            title={translate('useAddress')}
            onPress={_onActivePressHandler}
          />
        }
      />
    </Screen>
  )
}

export default SendFormView
