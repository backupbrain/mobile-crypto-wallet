import React, { useState } from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import SvgQRCode from 'react-native-qrcode-svg'

const AddressQrCode = (props) => {
  const [, setDimensions] = useState({ width: 0, height: 0 })
  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout
        setDimensions({ width, height })
      }}
    >
      {props.ready
        ? <View style={styles.card}><SvgQRCode value={props.address} size={160} /></View>
        : <View style={[styles.card, styles.activityIndicatorCard]}><ActivityIndicator size='large' /></View>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  card: {
    border: '1px solid #ccc',
    padding: '20px',
    alignItems: 'center',
    borderRadius: '6px',
    width: '200px'
  },
  activityIndicatorCard: {
    height: '200px',
    justifyContent: 'center'
  },
  qrCode: {
    width: 200,
    height: 200
  }
})

export default AddressQrCode
