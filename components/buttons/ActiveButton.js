import React, { forwardRef } from 'react'
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import BodyText from '../text/BodyText'

const ActiveButton = (props,ref) => {
  const { colors, dimensions } = useTheme()
  const isDisabled = props.disabled

  const styles = StyleSheet.create({
    container: {
      width: '100%'
    },
    button: {
      textAlign: dimensions.button.textAlign,
      paddingHorizontal: dimensions.button.paddingHorizontal,
      paddingVertical: dimensions.button.paddingVertical,
      width: dimensions.button.width,
      borderRadius: dimensions.button.borderRadius,
      borderWidth: dimensions.button.borderWidth
    },
    disabledButton: {
      backgroundColor: colors.disabledButton.backgroundColor,
      borderColor: colors.disabledButton.borderColor,
      borderWidth: dimensions.button.borderWidth
    },
    primaryButton: {
      backgroundColor: colors.primaryButton.backgroundColor,
      borderColor: colors.primaryButton.borderColor
    },
    secondaryButton: {
      backgroundColor: colors.secondaryButton.backgroundColor,
      borderColor: colors.secondaryButton.borderColor
    },
    dangerButton: {
      backgroundColor: colors.dangerButton.backgroundColor
    },
    buttonText: {
      textTransform: dimensions.button.textTransform,
      color: colors.primaryButton.color,
      fontWeight: dimensions.button.fontWeight
    },
    disabledButtonText: {
      color: colors.disabledButton.color
    }
  })

  const buttonStyles = [styles.button]
  switch (props.variant) {
    case 'danger':
      buttonStyles.push(styles.dangerButton)
      break
    case 'secondary':
      buttonStyles.push(styles.secondaryButton)
      break
    default:
      buttonStyles.push(styles.primaryButton)
  }

  return (
    <View style={[styles.container, props.style]} ref={ref}>
      {isDisabled ? (
        <View style={[styles.button, styles.disabledButton]} onPress={props.onPress}>
          <BodyText style={styles.disabledButtonText}>{props.title}</BodyText>
        </View>
      ) : (
        <TouchableOpacity
          style={buttonStyles}
          onPress={props.onPress}
          onPressIn={props.onPressIn}
          onPressOut={props.onPressOut}
          onLongPress={props.onLongPress}
        >
          <BodyText style={styles.buttonText}>{props.title}</BodyText>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default forwardRef(ActiveButton)
