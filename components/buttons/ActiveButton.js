import React from 'react'
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'

const ActiveButton = (props) => {
  const isDisabled = props.disabled
  const buttonStyles = [styles.button]
  switch (props.variant) {
    case 'danger':
      buttonStyles.push(styles.dangerButton)
      break
    default:
      buttonStyles.push(styles.primaryButton)
  }
  return (
    <View style={styles.container}>
      {isDisabled ? (
        <View style={[styles.button, styles.disabledButton]} onPress={props.onPress}>
          <Text style={styles.disabledButtonText}>{props.title}</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={buttonStyles}
          onPress={props.onPress}
          onPressIn={props.onPressIn}
          onPressOut={props.onPressOut}
          onLongPress={props.onLongPress}
        >
          <Text style={styles.buttonText}>{props.title}</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  button: {
    marginBottom: '16px',
    textAlign: 'center',
    paddingVertical: '15px',
    width: '100%',
    borderRadius: '6px'
  },
  disabledButton: {
    border: '1px solid #ccc'
  },
  primaryButton: {
    backgroundColor: '#4174DE'
  },
  dangerButton: {
    backgroundColor: '#ED1A33'
  },
  buttonText: {
    textTransform: 'none',
    color: '#fff',
    fontWeight: 'bold'
  },
  disabledButtonText: {
    color: '#ccc'
  }
})

export default ActiveButton
