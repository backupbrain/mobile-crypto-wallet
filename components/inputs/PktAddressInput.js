import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
// import LinkButton from '../buttons/LinkButton'
import PasteIcon from '../images/PasteIcon'
import PersonIcon from '../images/PersonIcon'
import ScanQrCodeIcon from '../images/ScanQrCodeIcon'
import translate from '../../translations'
import { useTheme } from '@react-navigation/native'

const addressLength = 43

const numCharsLeft = (text) => {
  return addressLength - text.replace(/\s/g, '').length
}

const PktAddressInput = (props) => {
  // TODO: verify address
  const { colors, dimensions } = useTheme()
  const [text, setText] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)
  const setAddress = (rawText) => {
    const spaces = /\s/g
    const strippedText = rawText.replace(spaces, '')
    // cap length
    const cappedText = strippedText.substr(0, addressLength)
    const paddedText = cappedText.replace(/(.{5})/g, '$1 ')
    const newLineText = paddedText.replace(/(.{12})/g, '$1\n')
    setText(newLineText)
    // TODO: verify address validity
    // TODO: send onValid(bool) on each change
    // TODO: send onChangeText(text) on each change
  }

  const styles = StyleSheet.create({
    container: {
      paddingBottom: '16px',
      width: '100%'
    },
    button: {
      paddingLeft: dimensions.horizontalSpacingBetweenItems
    },
    buttonFirst: {
      paddingBottom: dimensions.verticalSpacingBetweenItems
    },
    buttonMiddle: {
      paddingVertical: dimensions.verticalSpacingBetweenItems
    },
    buttonLast: {
      paddingTop: dimensions.verticalSpacingBetweenItems,
      paddingBottom: dimensions.verticalSpacingBetweenItems
    },
    textInput: {
      flexDirection: 'row',
      width: '100%',
      backgroundColor: colors.inputs.backgroundColor,
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
    input: {
      height: '200px',
      fontSize: '180%',
      fontFamily: 'monospace',
      color: colors.inputs.color,
      paddingVertical: dimensions.inputs.paddingVertical,
      paddingLeft: dimensions.inputs.paddingHorizontal,
      paddingRight: dimensions.horizontalSpacingBetweenItemsShort
    },
    buttonPanel: {

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

  const textInputStyles = [styles.textInput]
  if (isInvalid) {
    textInputStyles.push(styles.textInputError)
  } else {
    textInputStyles.push(styles.textInputRegular)
  }

  return (
    <View style={[styles.container, props.style]}>
      <View style={textInputStyles}>
        <TextInput
          style={styles.input}
          placeholder={props.placeholder}
          value={text}
          onChangeText={(text) => setAddress(text)}
          multiline
          spellCheck={false}
          autoCompleteType='off'
          autoCapitalize='none'
          onKeyPress={props.onKeyPress}
        />
        <View style={styles.buttonPanel}>
          <TouchableOpacity
            style={[styles.button, styles.buttonFirst]}
            onPress={() => { /* TODO: paste from clipboard */ }}
          >
            <PasteIcon color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonMiddle]}
            onPress={() => { /* TODO: Open address book */ }}
          >
            <PersonIcon color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonLast]}
            onPress={() => { /* TODO: Open Qr Code Scanner */ }}
          >
            <ScanQrCodeIcon color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      {!isInvalid &&
        <Text style={styles.helpText}>{numCharsLeft(text)} characters remaining</Text>}
      {isInvalid &&
        <Text style={styles.errorText}>{translate('invalidAddress')}</Text>}
    </View>
  )
}

export default PktAddressInput
