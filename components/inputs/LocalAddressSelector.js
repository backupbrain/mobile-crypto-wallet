import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import translate from '../../translations'
import { useTheme } from '@react-navigation/native'

const LocalAddressSelector = (props) => {
  const { colors, dimensions } = useTheme()
  const placeholder = props.placeholder || translate('localAddressSelectorPlaceholder')

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      paddingBottom: '16px'
    },
    label: {
      width: '100%',
      paddingBottom: '10px'
    },
    textInput: {
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
      fontWeight: 'bold',
      flexGrow: 1
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
  if (props.error) {
    textInputStyles.push(styles.textInputError)
  } else {
    textInputStyles.push(styles.textInputRegular)
  }

  return (
    <View style={styles.container}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <View style={textInputStyles}>
        <Text style={styles.input}>{placeholder}</Text>
      </View>
      {(props.help && !props.error) && <Text style={[styles.helpText, styles.supportingText]}>{props.help}</Text>}
      {props.error && <Text style={[styles.errorText, styles.supportingText]}>{props.error}</Text>}
    </View>
  )
}

export default LocalAddressSelector
