import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ActiveButton from '../../components/buttons/ActiveButton'
import LocalAddressSelector from '../../components/inputs/LocalAddressSelector'
import RemoteAddressWidget from '../../components/inputs/RemoteAddressWidget'
import AmountInputWithExchangeRate from '../../components/inputs/AmountInputWithExchangeRate'
import GenericTextInput from '../../components/inputs/GenericTextInput'
import TableRow from '../../components/TableRow'
import translate from '../../translations'
import PktPriceTicker, { isValidPktAddress } from '../../utils/PktPriceTicker'

const pktPriceTicker = new PktPriceTicker()

const SendFormView = ({ navigation, route }) => {
  const [fromAddress, setFromAddress] = useState('')
  const [toAddress, setToAddress] = useState('')
  const [amount, setAmount] = useState(0.0)
  const [isFormFilled, setIsFormFilled] = useState(false)
  const updateIsFormFilled = (fromAddress, toAddress, amount) => {
    if (isValidPktAddress(fromAddress) && isValidPktAddress(toAddress) && amount > 0) {
      setIsFormFilled(true)
    } else {
      setIsFormFilled(false)
    }
  }
  useState(() => {
    if (route.params) {
      if (route.params.fromAddress) {
        setFromAddress(route.params.fromAddress)
      }
      if (route.params.toAddress) {
        setToAddress(route.params.toAddress)
      }
    }
  })
  useEffect(() => {
    // TODO: Move this function to a post-login or first run type screen
    pktPriceTicker.fetchSpotPrice(pktPriceTicker.getUserFiatCurrency())
  })
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <TouchableOpacity
          onPress={() => { navigation.navigate('ContactBookView', { selectorMode: true }) }}
        >
          <LocalAddressSelector
            placeholder={translate('localAddressPlaceholder')}
            onChangeText={(address) => {
              setFromAddress(address)
              updateIsFormFilled(address, toAddress, amount)
            }}
          />
        </TouchableOpacity>
        <RemoteAddressWidget
          placeholder={translate('remoteAddressPlaceholder')}
          help={translate('remoteAddressHelpText')}
          onQrCodeIconPress={() => {
            navigation.push('QrCodeScannerView')
          }}
          onPersonIconPress={() => {
            navigation.push('ContactBookView', { selectorMode: true })
          }}
          onChangeText={(address) => {
            setToAddress(address)
            updateIsFormFilled(fromAddress, address, amount)
          }}
        />
        <AmountInputWithExchangeRate
          label={translate('amount')}
          fiat={{ code: pktPriceTicker.getUserFiatCurrency() }}
          onChangePktAmount={(amountPkt) => {
            setAmount(amountPkt)
            updateIsFormFilled(fromAddress, toAddress, amountPkt)
          }}
        />
        <GenericTextInput
          placeholder={translate('notePlaceholder')}
          help={translate('noteHelpText')}
        />
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
    flex: 1,
    paddingHorizontal: '20px',
    paddingVertical: '16px'
  },
  sendingEstimateContainer: {
    paddingBottom: '10px',
    width: '100%'
  }
})

export default SendFormView
