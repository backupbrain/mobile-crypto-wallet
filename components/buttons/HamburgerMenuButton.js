import React from 'react'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'

const HamburgerMenuButton = (props) => {
  const { colors } = useTheme()
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={colors.screen.color}
    />
  )
}

export default HamburgerMenuButton
