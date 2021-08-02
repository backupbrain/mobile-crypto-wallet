import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import ClipboardManager from '../../utils/ClipboardManager'
import PasteIcon from '../images/PasteIcon'
import PersonIcon from '../images/PersonIcon'
import ScanQrCodeIcon from '../images/ScanQrCodeIcon'
import { useTheme } from '@react-navigation/native'
import translate from '../../translations'

const RemoteAddressWidget = (props) => {
  const { colors, dimensions } = useTheme()
  const [address, _setAddress] = useState('')
  const [isInvalid, setIsInvalid] = useState(false)

  const pasteAddressFromClipboard = async () => {
    const clipboardContent = await ClipboardManager.get()
    if (clipboardContent && clipboardContent !== '') {
      setAddress(clipboardContent)
    }
  }

  const setAddress = (address) => {
    // TODO: validate address
    let isInvalid = false
    setIsInvalid(isInvalid)
    _setAddress(address)
  }

  useEffect(() => {
    setAddress(props.address)
  }, [setAddress, props.address])

  const styles = StyleSheet.create({
    container: {
      width: '100%'
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
      color: colors.inputs.color,
      paddingHorizontal: dimensions.inputs.paddingHorizontal,
      paddingVertical: dimensions.inputs.paddingVertical,
      flexGrow: 1
    },
    buttons: {
      justifyContent: 'flex-end',
      flexDirection: 'row'
    },
    buttonFirst: {
      paddingLeft: dimensions.horizontalSpacingBetweenItems,
      paddingRight: dimensions.horizontalSpacingBetweenItemsShort,
      height: '100%',
      justifyContent: 'center'
    },
    buttonMiddle: {
      paddingHorizontal: dimensions.horizontalSpacingBetweenItemsShort,
      height: '100%',
      justifyContent: 'center'
    },
    buttonLast: {
      paddingLeft: dimensions.horizontalSpacingBetweenItemsShort,
      paddingRight: dimensions.horizontalSpacingBetweenItems,
      height: '100%',
      justifyContent: 'center'
    },
    label: {
      paddingBottom: dimensions.inputs.labelPaddingBottom,
      color: colors.inputs.labelColor
    },
    helpText: {
      color: colors.inputs.helpTextColor
    },
    errorText: {
      color: colors.inputs.errorTextColor
    },
    supportingText: {
      paddingTop: dimensions.inputs.supportingTextPaddingTop,
      paddingHorizontal: dimensions.inputs.supportingTextPaddingHorizontal
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
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <View style={textInputStyles}>
        <TextInput
          style={styles.input}
          placeholder={props.placeholder}
          value={address}
          onFocus={props.onPress}
        />
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.buttonFirst}
            onPress={() => {
              pasteAddressFromClipboard()
            }}
          >
            <PasteIcon
              color={colors.text}
            />
          </TouchableOpacity>
          {props.onPersonIconPress &&
            <TouchableOpacity
              style={styles.buttonMiddle}
              onPress={() => {
                props.onPersonIconPress()
              }}
            >
              <PersonIcon
                color={colors.text}
              />
            </TouchableOpacity>}
          {props.onQrCodeIconPress &&
            <TouchableOpacity
              style={styles.buttonLast}
              onPress={() => {
                props.onQrCodeIconPress()
              }}
            >
              <ScanQrCodeIcon
                color={colors.text}
              />
            </TouchableOpacity>}
        </View>
      </View>
      {(props.help && !isInvalid) && <Text style={[styles.helpText, styles.supportingText]}>{props.help}</Text>}
      {isInvalid && <Text style={[styles.errorText, styles.supportingText]}>{translate('invalidAddress')}</Text>}
    </View>
  )
}

export default RemoteAddressWidget
