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
    marginBottom: '8px',
    textAlign: 'left',
    fontFamily:'Archivo-Black'
  }
})

export default DefaultTextLeft
