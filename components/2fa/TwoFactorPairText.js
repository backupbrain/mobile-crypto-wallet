import React, { useState } from 'react'
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native'

const TwoFactorPairText = (props) => {
  // TODO; size the QR code based on the screen dimensions
  const [, setDimensions] = useState({ width: 0, height: 0 })
  const formatPairingCode = (rawText) => {
    const spaces = /\s/g
    const strippedText = rawText.replace(spaces, '')
    const paddedText = strippedText.replace(/(.{10})/g, '$1 ')
    // const newLineText = paddedText.replace(/(.{12})/g, '$1\n')
    return paddedText
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
      justifyContent: 'center',
      borderRadius: '6px',
      width: '200px',
      height: '200px'
    },
    activityIndicatorCard: {
      height: '200px',
      justifyContent: 'center'
    },
    qrCode: {
      width: 200,
      height: 200
    },
    codeText: {
      width: '100%',
      fontSize: '160%',
      fontFamily: 'monospace',
      lineHeight: '130%'
    }
  })

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout
        setDimensions({ width, height })
      }}
    >
      {props.ready
        ? <View style={styles.card}><Text multiline style={styles.codeText}>{formatPairingCode(props.pairingCode)}</Text></View>
        : <View style={[styles.card, styles.activityIndicatorCard]}><ActivityIndicator size='large' /></View>}
    </View>
  )
}

export default TwoFactorPairText
