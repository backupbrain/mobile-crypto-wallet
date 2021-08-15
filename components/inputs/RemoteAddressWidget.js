import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import BodyText from '../text/BodyText'
import ClipboardManager from '../../utils/ClipboardManager'
import PasteIcon from '../images/PasteIcon'
import PersonIcon from '../images/PersonIcon'
import ScanQrCodeIcon from '../images/ScanQrCodeIcon'
import PktManager from '../../utils/PktManager'
import { useTheme } from '@react-navigation/native'
import translate from '../../translations'

const RemoteAddressWidget = (props, ref) => {
  // TODO: lookup address by ContactManager name or by federated address
  const { colors, dimensions } = useTheme()
  const [address, _setAddress] = useState(props.address)
  const [displayAddress, setDisplayAddress] = useState('')
  const [inputWidth, setInputWidth] = useState(10)
  const [isInputWidthSet, setIsInputWidthSet] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)
  const [, setIsValid] = useState(false)

  useImperativeHandle(ref, () => ({
    setAddress: (address) => setAddress(address)
  }))

  const pasteAddressFromClipboard = async () => {
    const clipboardContent = await ClipboardManager.get()
    if (clipboardContent && clipboardContent !== '') {
      setAddress(clipboardContent)
    }
  }

  const setAddress = (address) => {
    _setAddress(address)
    setDisplayAddress(address)
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

  const styles = StyleSheet.create({
    container: {
      width: '100%'
    },
    textInput: {
      flexDirection: 'row',
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
    inputContainer: {
      flexGrow: 1
    },
    input: {
      paddingHorizontal: dimensions.inputs.paddingHorizontal,
      paddingVertical: dimensions.inputs.paddingVertical,
      width: inputWidth,
      overflow: 'hidden',
      overflowWrap: 'normal',
      wordBreak: 'none',
      whiteSpace: 'normal'
    },
    inputText: {
      color: colors.inputs.color
    },
    inputPlaceholder: {
      color: colors.inputs.placeholderTextColor,
      overflow: 'hidden'
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
        {/*
        <TextInput
          style={styles.input}
          placeholder={props.placeholder}
          value={address}
          onChangeText={(text) => {
            setAddress(text)
          }}
          onFocus={() => {
            // FIXME: prevent this from firing on paste, etc
            if (props.onPress) {
              props.onPress()
            }
          }}
        />
        */}
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={props.onPress}
          onLayout={(event) => {
            if (!isInputWidthSet) {
              const { width } = event.nativeEvent.layout
              setInputWidth(width)
              setIsInputWidthSet(true)
              setDisplayAddress(address)
            }
          }}
        >
          {(address && isInputWidthSet)
            ? <BodyText style={[styles.input, styles.inputText]}>{displayAddress}</BodyText>
            : <BodyText style={[styles.input, styles.inputPlaceholder]}>{props.placeholder}</BodyText>}
        </TouchableOpacity>
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

export default forwardRef(RemoteAddressWidget)
