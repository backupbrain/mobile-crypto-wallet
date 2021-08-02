// FIXME: importing react-navigation-header-icons produces a warning:
// Attempted import error: 'ActionSheetIOS' is not exported from 'react-native-web/dist/index'.
// https://stackoverflow.com/a/68105939/5671180
import React from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HamburgerMenuButton from './HamburgerMenuButton'
import { useTheme } from '@react-navigation/native'

const NavMenuButton = (props) => {
  const { colors } = useTheme()
  const isDrawerOpen = false // useIsDrawerOpen()
  const iconName = isDrawerOpen ? 'close' : 'menu'
  return (
    <HeaderButtons HeaderButtonComponent={HamburgerMenuButton}>
      <Item
        buttonStyle={{
          color: colors.screen.color
        }}
        title='Toggle Menu'
        iconName={iconName}
      />
    </HeaderButtons>
  )
}

export default NavMenuButton
