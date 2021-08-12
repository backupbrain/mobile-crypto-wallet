import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Screen from '../../components/Screen'
import ActiveButton from '../../components/buttons/ActiveButton'
import BodyText from '../../components/text/BodyText'
import LocalAddressSelector from '../../components/inputs/LocalAddressSelector'
import RemoteAddressWidget from '../../components/inputs/RemoteAddressWidget'
import AmountInputWithExchangeRate from '../../components/inputs/AmountInputWithExchangeRate'
import GenericTextInput from '../../components/inputs/GenericTextInput'
import TableRow from '../../components/TableRow'
import translate from '../../translations'
import PktPriceTicker from '../../utils/PktPriceTicker'
import PktManager from '../../utils/PktManager'
import { useTheme } from '@react-navigation/native'

const SendFormView = ({ navigation, route }) => {
  const { dimensions } = useTheme()
  const [fromAddress, setFromAddress] = useState('')
  const [toAddress, setToAddress] = useState('')
  const [amount, setAmount] = useState(0.0)
  const [note, setNote] = useState('')
  const [isFormFilled, setIsFormFilled] = useState(false)
  const pktPriceTicker = useRef(new PktPriceTicker())
  const pktManager = useRef(new PktManager())
  const updateIsFormFilled = (fromAddress, toAddress, amount) => {
    // TODO: check if there is enough pkt available in fromAddress to send
    if (PktManager.isValidAddress(fromAddress) && PktManager.isValidAddress(toAddress) && amount > 0) {
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
    // TODO: Move this function to a post-login or first run type screen,
    // or in a loop within the main App
    pktPriceTicker.current.fetchSpotPrice(pktPriceTicker.current.getUserFiatCurrency())
  })

  const styles = StyleSheet.create({
    screen: {
      paddingHorizontal: dimensions.screen.paddingHorizontal,
      paddingVertical: dimensions.screen.paddingVertical
    },
    label: {
      marginBottom: dimensions.verticalSpacingBetweenItems
    },
    remoteAddress: {
      marginTop: dimensions.paddingVertical
    },
    amountInput: {
      marginTop: dimensions.paddingVertical
    },
    sendingEstimateContainer: {
      paddingBottom: dimensions.paddingVertical,
      width: '100%'
    }
  })

  return (
    <Screen>
      <View style={styles.screen}>
        <View>
          <BodyText style={styles.label}>
            {translate('from')}
          </BodyText>
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
        </View>
        <RemoteAddressWidget
          style={styles.remoteAddress}
          label={translate('to')}
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
          style={styles.amountInput}
          label={translate('amount')}
          fiat={{ code: pktPriceTicker.current.getUserFiatCurrency() }}
          onChangePktAmount={(amountPkt) => {
            setAmount(amountPkt)
            updateIsFormFilled(fromAddress, toAddress, amountPkt)
          }}
        />
        <GenericTextInput
          placeholder={translate('notePlaceholder')}
          help={translate('noteHelpText')}
          onChangeText={(text) => {
            setNote(text)
          }}
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
                amount,
                note
              }
            )
          }}
          disabled={!isFormFilled}
        />
      </View>
    </Screen>
  )
}

export default SendFormView
