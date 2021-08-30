import React, { useState, useEffect, useCallback } from 'react'
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

const PktAddressText = (props) => {
  const { colors, dimensions } = useTheme()
  const [, setCardDimensions] = useState({ width: 0, height: 0 })
  const [isReady, _setIsReady] = useState(false)
  const [formattedAddress, setFormattedAddress] = useState([])
  const [maxTextWidth, setMaxTextWidth] = useState(1)

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center'
    },
    card: {
      alignItems: 'center',
      paddingVertical: dimensions.paddingHorizontal,
      paddingHorizontal: dimensions.paddingHorizontal,
      width: dimensions.addressCard.width,
      backgroundColor: colors.addressCard.backgroundColor,
      borderRadius: dimensions.addressCard.borderRadius
    },
    activityIndicatorCard: {
      height: dimensions.addressCard.width,
      justifyContent: 'center'
    },
    addressText: {
      fontFamily: dimensions.addressCard.fontFamily,
      lineHeight: dimensions.addressCard.lineHeight,
      fontSize: dimensions.addressCard.fontSize,
      textAlign: dimensions.addressCard.textAlign
    },
    addressTextLast: {
      width: maxTextWidth
    }
  })
  const formatAddress = (address) => {
    if (address && address.length > 0) {
      const numRows = 4
      // break up into numRows
      const maxRowLength = Math.floor(address.length / numRows)
      const newLineRegex = new RegExp('.{' + maxRowLength + '}|.{1,' + (maxRowLength - 1) + '}', 'g')
      const addressRows = address.match(newLineRegex)
      // split strings by space if they are longer than
      // maxRowLength / 2
      const spaceDistance = Math.ceil(maxRowLength / 2)
      const spacesRegex = new RegExp('(.{' + spaceDistance + '})', 'g')
      for (let row = 0; row < addressRows.length; row++) {
        const addressRow = addressRows[row].replace(spacesRegex, '$1 ')
        addressRows[row] = addressRow
      }
      setFormattedAddress(addressRows)
    } else {
      setFormattedAddress([])
    }
  }

  const setIsReady = useCallback((address, width) => {
    if (width > 0 && address && address !== '') {
      _setIsReady(true)
    } else {
      _setIsReady(false)
    }
  }, [_setIsReady])

  const getAddressTextLayout = (index) => {
    const addressTextLayout = [styles.addressText]
    if (index >= formattedAddress.length - 1) {
      addressTextLayout.push(styles.addressTextLast)
    }
    return addressTextLayout
  }

  useEffect(() => {
    setIsReady(props.address, dimensions.width)
    formatAddress(props.address)
  }, [props.address, dimensions.width, setIsReady])

  const _onLayoutViewHandler = (event) => {
    const { width, height } = event.nativeEvent.layout
    setCardDimensions({ width, height })
    setIsReady(props.address, width)
  }

  const _onLayoutTextHandler = (event) => {
    const { width } = event.nativeEvent.layout
    if (index === 0) {
      setMaxTextWidth(width, index)
    }
  }

  return (
    <View
      style={[styles.container, props.style]}
    >
      <View
        onLayout={_onLayoutViewHandler}
      >
        {isReady
          ? (
            <View style={styles.card}>
              {formattedAddress.map((addressRow, index) => (
                <Text
                  key={index}
                  style={getAddressTextLayout(index)}
                  onLayout={_onLayoutTextHandler}
                >
                  {addressRow}
                </Text>
              ))}
            </View>)
          : (
            <View
              style={[styles.card, styles.activityIndicatorCard]}
            >
              <ActivityIndicator
                size='large'
                color={colors.primaryButton.backgroundColor}
              />
            </View>)}
      </View>
    </View>
  )
}

export default PktAddressText
