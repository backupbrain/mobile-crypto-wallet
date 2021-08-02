import React, { useState, useEffect, useCallback } from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import SvgQRCode from 'react-native-qrcode-svg'
import { useTheme } from '@react-navigation/native'

const AddressQrCode = (props) => {
  const { colors, dimensions } = useTheme()
  const [cardDimensions, setCardDimensions] = useState({ width: 0, height: 0 })
  const [isReady, _setIsReady] = useState(false)

  const padding = parseInt(dimensions.paddingHorizontal.substr(0, dimensions.paddingHorizontal.length - 2))

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'center'
    },
    card: {
      border: '1px solid #ccc',
      paddingVertical: dimensions.paddingHorizontal,
      alignItems: 'center',
      width: '200px',
      backgroundColor: '#fff'
    },
    activityIndicatorCard: {
      height: '200px',
      justifyContent: 'center'
    }
  })

  const setIsReady = useCallback((address, width) => {
    if (width > 0 && address && address !== '') {
      _setIsReady(true)
    } else {
      _setIsReady(false)
    }
  }, [_setIsReady])

  useEffect(() => {
    setIsReady(props.address, dimensions.width)
  }, [props.address, dimensions.width, setIsReady])

  return (
    <View
      style={[styles.container, props.style]}
    >
      <View
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout
          setCardDimensions({ width, height })
          setIsReady(props.address, width)
        }}
      >
        {isReady
          ? (
            <View style={styles.card}>
              <SvgQRCode
                value={props.address}
                size={Math.max(0, cardDimensions.width - (2 * padding))}
              />
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

export default AddressQrCode
