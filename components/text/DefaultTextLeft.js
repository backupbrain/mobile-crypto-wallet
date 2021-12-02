import React from 'react'
import { Text, StyleSheet } from 'react-native'

const DefaultTextLeft = ({ children }) => {
  return (
    <Text style={styles.defaultTextLeft}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  defaultTextLeft: {
    width: '100%',
    marginBottom: 8,
    textAlign: 'left',
    // FIXME: fonts should be defined in the themes/AndroidThemes.js
    // fontFamily:'Archivo-Black'
  }
})

export default DefaultTextLeft
