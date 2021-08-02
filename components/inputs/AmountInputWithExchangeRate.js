import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import VerticalSwapIcon from '../images/VerticalSwapIcon'
import PktPriceTicker from '../../utils/PktPriceTicker'
import AppConstants from '../../utils/AppConstants'
import { useTheme } from '@react-navigation/native'
import translate from '../../translations'

const pktPriceTicker = new PktPriceTicker()

const AmountInputWithExchangeRate = (props) => {
  const { colors, dimensions } = useTheme()
  const [amount, _setAmount] = useState('')
  const [convertedAmount, setConvertedAmount] = useState('')
  const [invalidAmount, setInvalidAmount] = useState(false)
  const [exceedsMax, setExceedsMax] = useState(false)
  const [isConverted, setIsConverted] = useState(false)

  const setAmount = (amount) => {
    let isInvalid = false
    let exceedsMax = false
    let convertedAmount = ''
    const floatAmount = parseFloat(amount)
    if (isNaN(floatAmount)) {
      isInvalid = true
    } else if (floatAmount <= 0) {
      isInvalid = true
    } else {
      convertedAmount = pktPriceTicker.convertCurrency(isConverted, floatAmount)
      const convertedMaxAmount = pktPriceTicker.convertCurrency(isConverted, props.maxAmount)
      if (convertedAmount > convertedMaxAmount) {
        exceedsMax = true
      }
    }
    setInvalidAmount(isInvalid)
    setExceedsMax(exceedsMax)
    setConvertedAmount(convertedAmount)
    _setAmount(amount)
  }

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      paddingBottom: '16px'
    },
    label: {
      paddingBottom: dimensions.inputs.labelPaddingBottom,
      color: colors.inputs.labelColor
    },
    interactionContainer: {
      flex: 1,
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center'
    },
    amountsContainer: {
      flexGrow: 1
    },
    switchButton: {
      paddingLeft: dimensions.horizontalSpacingBetweenItems,
      justifyContent: 'center',
      paddingVertical: dimensions.button.paddingVertical
    },
    inputAmount: {
      paddingVertical: dimensions.inputs.paddingVertical,
      paddingLeft: dimensions.inputs.paddingHorizontal,
      paddingRight: dimensions.horizontalSpacingBetweenItemsShort,
      textAlign: 'right',
      flexGrow: 1,
      color: colors.inputs.color
    },
    inputCurrency: {
      paddingVertical: dimensions.inputs.paddingVertical,
      paddingRight: dimensions.inputs.paddingHorizontal,
      paddingLeft: dimensions.horizontalSpacingBetweenItemsShort,
      color: colors.inputs.color
    },
    conversion: {
      width: '100%',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      textAlign: 'right',
      paddingTop: dimensions.verticalSpacingBetweenItems,
      paddingHorizontal: dimensions.horizontalSpacingBetweenItems,
      paddingRight: dimensions.inputs.paddingHorizontal
    },
    convertedAmount: {
      paddingRight: dimensions.horizontalSpacingBetweenItems,
      color: colors.inputs.helpTextColor
    },
    convertedCurrency: {
      color: colors.inputs.helpTextColor
    },
    textInput: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: '100%',
      backgroundColor: colors.inputs.backgroundColor,
      paddingHorizontal: 0,
      paddingVertical: 0,
      borderRadius: dimensions.inputs.borderRadius,
      borderTopWidth: dimensions.inputs.borderTopWidth,
      borderLeftWidth: dimensions.inputs.borderLeftWidth,
      borderRightWidth: dimensions.inputs.borderRightWidth,
      borderBottomWidth: dimensions.inputs.borderBottomWidth
    },
    textInputRegular: {
      borderTopColor: colors.inputs.borderTopColor,
      borderLeftColor: colors.inputs.borderLeftColor,
      borderRightColor: colors.inputs.borderRightColor,
      borderBottomColor: colors.inputs.borderBottomColor
    },
    textInputError: {
      borderTopColor: colors.inputs.borderTopErrorColor,
      borderLeftColor: colors.inputs.borderLeftErrorColor,
      borderRightColor: colors.inputs.borderRightErrorColor,
      borderBottomColor: colors.inputs.borderBottomErrorColor
    },
    errorText: {
      color: colors.inputs.errorTextColor
    },
    supportingText: {
    }
  })

  const textInputStyles = [styles.textInput]
  if (props.error) {
    textInputStyles.push(styles.textInputError)
  } else {
    textInputStyles.push(styles.textInputRegular)
  }

  return (
    <View style={[styles.container, props.style]}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <View style={styles.interactionContainer}>
        <View style={styles.amountsContainer}>
          <View style={textInputStyles}>
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
            {(!invalidAmount && !exceedsMax) &&
              <>
                <Text style={styles.convertedAmount}>{convertedAmount}</Text>{' '}
                <Text style={styles.convertedCurrency}>
                  {pktPriceTicker.alternateCurrencyCode(isConverted, props.fiat.code)}
                </Text>
              </>}
            {(invalidAmount && !exceedsMax) &&
              <Text style={[styles.errorText, styles.supportingText]}>{translate('invalidAmount')}</Text>}
            {exceedsMax &&
              <Text style={[styles.errorText, styles.supportingText]}>{translate('insufficientFunds')}(</Text>}
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => {
              if (amount !== '') {
                setAmount(convertedAmount)
              }
              setIsConverted(!isConverted)
            }}
          >
            <VerticalSwapIcon
              height={AppConstants.INLINE_ICON_HEIGHT}
              width={AppConstants.INLINE_ICON_WIDTH}
              color={colors.primaryButton.backgroundColor}
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

export default AmountInputWithExchangeRate
