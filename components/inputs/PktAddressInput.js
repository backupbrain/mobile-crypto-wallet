import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
// import LinkButton from '../buttons/LinkButton'
import PasteIcon from '../images/PasteIcon'
import PersonIcon from '../images/PersonIcon'
import ScanQrCodeIcon from '../images/ScanQrCodeIcon'

const addressLength = 43

const numCharsLeft = (text) => {
  return addressLength - text.replace(/\s/g, '').length
}

const PktAddressInput = (props) => {
  const [text, setText] = useState('')
  const setAddress = (rawText) => {
    const spaces = /\s/g
    const strippedText = rawText.replace(spaces, '')
    // cap length
    const cappedText = strippedText.substr(0, addressLength)
    const paddedText = cappedText.replace(/(.{5})/g, '$1 ')
    const newLineText = paddedText.replace(/(.{12})/g, '$1\n')
    setText(newLineText)
  }
  return (
    <View style={styles.container}>
      <View style={styles.object}>
        <TextInput
          style={styles.textInput}
          placeholder={props.placeholder}
          value={text}
          onChangeText={(text) => setAddress(text)}
          multiline
          spellCheck={false}
          autoCompleteType='off'
          autoCapitalize='none'
          onKeyPress={props.onKeyPress}
        />
        <TouchableOpacity
          style={styles.buttonLeft}
          onPress={() => { /* TODO: paste from clipboard */ }}
        >
          <PasteIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonMiddle}
          onPress={() => { /* TODO: Open address book */ }}
        >
          <PersonIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonRight}
          onPress={() => { /* TODO: Open Qr COde Scanner */ }}
        >
          <ScanQrCodeIcon />
        </TouchableOpacity>
      </View>
      <Text style={styles.helpText}>{numCharsLeft(text)} characters remaining</Text>
      {props.error && <Text style={styles.errorText}>{props.error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: '16px',
    width: '100%'
  },
  object: {
    backgroundColor: '#F1F2F4',
    color: '#424A52',
    width: '100%',
    borderRadius: 6,
    flexDirection: 'row'
  },
  textInput: {
    paddingHorizontal: '20px',
    paddingVertical: '16px',
    height: '200px',
    fontSize: '180%',
    fontFamily: 'monospace',
    flexGrow: 1
  },
  textAreaButtonLeftContainer: {
    float: 'left',
    paddingTop: '16px',
    paddingRight: '5px',
    paddingLeft: '10px'
  },
  textAreaButtonRightContainer: {
    float: 'left',
    paddingTop: '16px',
    paddingRight: '20px',
    paddingLeft: '5px'
  },
  helpText: {
    color: '#666',
    paddingTop: '10px',
    paddingHorizontal: '6px'
  },
  errorText: {
    color: '#600',
    paddingTop: '10px',
    paddingHorizontal: '6px'
  }
})

export default PktAddressInput
