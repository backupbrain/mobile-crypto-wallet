import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Screen from '../../components/Screen'
import ActiveButton from '../../components/buttons/ActiveButton'
import LocalAddressSelector from '../../components/inputs/LocalAddressSelector'
import RemoteAddressWidget from '../../components/inputs/RemoteAddressWidget'
import AmountInputWithExchangeRate from '../../components/inputs/AmountInputWithExchangeRate'
import GenericTextInput from '../../components/inputs/GenericTextInput'
// import TableRow from '../../components/TableRow'
import Modal from '../../components/Modal'
import PktAddressInput from '../../components/inputs/PktAddressInput'
import translate from '../../translations'
import PktPriceTicker from '../../utils/PktPriceTicker'
import PktManager from '../../utils/PktManager'
import { useTheme } from '@react-navigation/native'

const SendFormView = ({ navigation, route }) => {
  const { dimensions } = useTheme()
  const [fromAddress, setFromAddress] = useState('')
  const [isFromAddressValid, setIsFromAddressValid] = useState(false)
  const [toAddress, setToAddress] = useState('')
  const [isToAddressValid, setIsToAddressValid] = useState(false)
  const [amount, setAmount] = useState(0.0)
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
      if (route.params.fromAddress) {
        setFromAddress(route.params.fromAddress)
      }
      if (route.params.toAddress) {
        setToAddress(route.params.toAddress)
      }
    }
  })

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
    debug: {
    }
  })

  return (
    <Screen>
      <View style={styles.screen}>
        <TouchableOpacity
          style={styles.fromAddressInput}
          onPress={() => { navigation.navigate('ContactsViewSet', { selectorMode: true }) }}
        >
          <LocalAddressSelector
            label={translate('from')}
            placeholder={translate('localAddressPlaceholder')}
            onChangeText={(address) => {
              setFromAddress(address)
              updateIsFormFilled(address, toAddress, amount)
            }}
          />
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
            navigation.push('Root')
          }}
          onChangeText={(address) => {
            setToAddress(address)
            updateIsFormFilled(fromAddress, address, amount)
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
          maxAmount={fromAddress.amount}
          disabled={!isFromAddressValid}
          onChangePktAmount={(amountPkt) => {
            setAmount(amountPkt)
            updateIsFormFilled(fromAddress, toAddress, amountPkt)
          }}
        />
        <GenericTextInput
          style={styles.noteInput}
          placeholder={translate('notePlaceholder')}
          help={translate('noteHelpText')}
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
              'PreviewSendView',
              {
                fromAddress,
                toAddress,
                amount
              }
            )
          }}
          disabled={!isFormFilled}
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
