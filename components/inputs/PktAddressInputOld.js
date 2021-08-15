import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native'
// import LinkButton from '../buttons/LinkButton'
import PasteIcon from '../images/PasteIcon'
import PersonIcon from '../images/PersonIcon'
import ScanQrCodeIcon from '../images/ScanQrCodeIcon'
import BodyText from '../text/BodyText'
import ClipboardManager from '../../utils/ClipboardManager'
import PktManager from '../../utils/PktManager'
import AppConstants from '../../utils/AppConstants'
import translate from '../../translations'
import { useTheme } from '@react-navigation/native'

const PktAddressInput = (props) => {
  // TODO: verify address
  // TODO: translate # chars remaning
  // TODO: handle backspace
  const { colors, dimensions } = useTheme()
  const [addressLength] = useState(AppConstants.PKT_ADDRESS_LENGTH)
  const [address, _setAddress] = useState('')
  const [displayedAddress, setDisplayedAddress] = useState('')
  const [isInitialAddressSet, setIsInitialAddressSet] = useState(false)
  const [, setIsValid] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)

  const numCharsLeft = (text) => {
    return addressLength - text.replace(/\s/g, '').length
  }

  const handleValidity = (address) => {
    const isValidAddress = PktManager.isValidAddress(address)
    const isInvalidAddress = !isValidAddress
    setIsValid(isValidAddress)
    setIsInvalid(isInvalidAddress)
    if (props.onValid) {
      props.onValid(address, isValidAddress)
    }
    if (props.onInvalid) {
      props.onInvalid(address, isInvalidAddress)
    }
    if (props.onChangeText) {
      props.onChangeText(address)
    }
  }

  const setAddress = (rawText) => {
    const spaces = /[\s\n]/g
    const strippedText = rawText.replace(spaces, '')
    const cappedText = strippedText.substr(0, addressLength)
    const paddedText = cappedText.replace(/(.{5})/g, '$1 ')
    const newLineText = paddedText.replace(/(.{12})/g, '$1\n')
    const finalText = newLineText.trim()
    _setAddress(cappedText)
    setDisplayedAddress(finalText)
    handleValidity(cappedText)
  }

  const pasteAddressFromClipboard = async () => {
    const clipboardContent = await ClipboardManager.get()
    if (clipboardContent && clipboardContent !== '') {
      setAddress(clipboardContent)
    }
  }

  useEffect(() => {
    if (props.address && !isInitialAddressSet) {
      setAddress(props.address)
      setIsInitialAddressSet(true)
    }
  }, [setAddress, props.address])

  const styles = StyleSheet.create({
    container: {
      paddingBottom: '16px',
      width: '100%'
    },
    label: {
      paddingBottom: dimensions.inputs.labelPaddingBottom,
      color: colors.inputs.labelColor
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
      {props.label && <BodyText style={styles.label}>{props.label}</BodyText>}
      <View style={textInputStyles}>
        <TextInput
          style={styles.input}
          placeholder={props.placeholder}
          value={displayedAddress}
          onChangeText={(text) => setAddress(text)}
          multiline
          spellCheck={false}
          autoCompleteType='off'
          autoCapitalize='none'
        />
        <View style={styles.buttonPanel}>
          <TouchableOpacity
            style={[styles.button, styles.buttonFirst]}
            onPress={() => {
              pasteAddressFromClipboard()
            }}
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
        <BodyText style={styles.helpText}>{translate('numCharsRemaining', { numCharsRemaining: numCharsLeft(address) })}</BodyText>}
      {isInvalid &&
        <BodyText style={styles.errorText}>{translate('invalidAddress')}</BodyText>}
    </View>
  )
}

export default PktAddressInput
