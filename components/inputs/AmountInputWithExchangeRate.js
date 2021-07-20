import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import VerticalSwapicon from '../images/VerticalSwapicon'
import PktPriceTicker from '../../utils/PktPriceTicker'
import AppConstants from '../../utils/AppConstants'

const pktPriceTicker = new PktPriceTicker()

const AmountInputWithExchangeRate = (props) => {
  const [amount, setAmount] = useState('')
  const [isConverted, setIsConverted] = useState(false)
  return (
    <View style={styles.container}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <View style={styles.interactionContainer}>
        <View style={styles.amountsContainer}>
          <View style={styles.object}>
            <TextInput
              editable
              style={styles.inputAmount}
              placeholder={props.placeholder}
              onChangeText={amount => setAmount(amount)}
              value={amount}
            />
            <Text style={styles.inputCurrency}>
              {pktPriceTicker.primaryCurrencyCode(isConverted, props.fiat.code)}
            </Text>
          </View>
          <View style={styles.conversion}>
            <Text style={styles.convertedAmount}>{pktPriceTicker.convertCurrency(isConverted, amount)}</Text>{' '}
            <Text style={styles.convertedCurrency}>
              {pktPriceTicker.alternateCurrencyCode(isConverted, props.fiat.code)}
            </Text>
          </View>
        </View>
        <View style={styles.switchButton}>
          <TouchableOpacity
            onPress={() => {
              if (amount !== '') {
                setAmount(pktPriceTicker.convertCurrency(isConverted, amount))
              }
              setIsConverted(!isConverted)
            }}
          >
            <VerticalSwapicon
              height={AppConstants.INLINE_ICON_HEIGHT}
              width={AppConstants.INLINE_ICON_WIDTH}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

AmountInputWithExchangeRate.defaultProps = {
  placeholder: '0.00'
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: '16px'
  },
  interactionContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%'
  },
  amountsContainer: {
    flexGrow: 1
  },
  switchButton: {
    marginLeft: '10px',
    justifyContent: 'center',
    height: '100%'
  },
  object: {
    backgroundColor: '#F1F2F4',
    borderRadius: 6,
    color: '#424A52',
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  inputAmount: {
    paddingVertical: '16px',
    paddingLeft: '20px',
    textAlign: 'right',
    paddingRight: '5px',
    flexGrow: 1
  },
  inputCurrency: {
    paddingVertical: '16px',
    paddingRight: '20px',
    paddingLeft: '5px'
  },
  label: {
    paddingBottom: '10px'
  },
  conversion: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    textAlign: 'right',
    paddingTop: '10px',
    paddingHorizontal: '6px'
  },
  convertedAmount: {
    paddingRight: '10px',
    color: '#666'
  },
  convertedCurrency: {
    color: '#666'
  }
})

export default AmountInputWithExchangeRate
