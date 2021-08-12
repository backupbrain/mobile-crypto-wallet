import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import Close from '../images/Close'
import { useTheme } from '@react-navigation/native'

const hasText = (text) => {
  return (text !== '' && hasText != null)
}

const SearchInput = (props) => {
  const { colors, dimensions } = useTheme()
  const [text, setText] = useState('')

  const styles = StyleSheet.create({
    container: {
      width: '100%'
    },
    label: {
      paddingBottom: dimensions.inputs.labelPaddingBottom,
      color: colors.inputs.labelColor
    },
    input: {
      flexGrow: 1,
      paddingHorizontal: 0,
      paddingVertical: dimensions.inputs.paddingVertical,
      color: colors.inputs.color
    },
    textInput: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
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
    closeButton: {
      height: '100%',
      minHeight: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: dimensions.inputs.paddingHorizontal,
      paddingLeft: dimensions.button.paddingHorizontal,
      paddingVertical: dimensions.inputs.paddingVertical
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
  if (props.error) {
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
          value={text}
          onChangeText={(text) => setText(text)}
        />
        {hasText(text) &&
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setText('')
            }}
          >
            <Close color={colors.text} size='12' />
          </TouchableOpacity>}
      </View>
      {props.help && <Text style={styles.helpText}>{props.help}</Text>}
      {props.error && <Text style={styles.errorText}>{props.error}</Text>}
    </View>
  )
}

export default SearchInput
