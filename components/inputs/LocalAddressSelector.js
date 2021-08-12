import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import BodyText from '../text/BodyText'
import translate from '../../translations'
import { useTheme } from '@react-navigation/native'

const LocalAddressSelector = (props) => {
  const { colors, dimensions } = useTheme()
  const placeholder = props.placeholder || translate('localAddressSelectorPlaceholder')

  const styles = StyleSheet.create({
    container: {
      width: '100%'
    },
    label: {
      width: '100%',
      paddingVertical: dimensions.verticalSpacingBetweenItems
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
      {props.label && <BodyText style={styles.label}>{props.label}</BodyText>}
      <View style={textInputStyles}>
        <BodyText style={styles.input}>{placeholder}</BodyText>
      </View>
      {(props.help && !props.error) && <BodyText style={[styles.helpText, styles.supportingText]}>{props.help}</BodyText>}
      {props.error && <BodyText style={[styles.errorText, styles.supportingText]}>{props.error}</BodyText>}
    </View>
  )
}

export default LocalAddressSelector
