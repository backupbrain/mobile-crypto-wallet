import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import LeftChevronIcon from '../images/LeftChevronIcon'
import { useTheme } from '@react-navigation/native'

const HamburgerMenuButton = (props) => {
  const { colors, dimensions } = useTheme()

  const styles = StyleSheet.create({
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 42,
      height: 42
    }
  })

  return (
    <TouchableOpacity
      style={[styles.button, props.style]}
      onPress={props.onPress}
    >
      <LeftChevronIcon
        color={colors.headerBackButton.color}
        size={dimensions.headerBackButton.height}
      />
    </TouchableOpacity>
  )
}

export default HamburgerMenuButton
