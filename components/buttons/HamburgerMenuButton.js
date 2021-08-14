import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import HamburgerMenuIcon from '../images/HamburgerMenuIcon'
import { useTheme } from '@react-navigation/native'

const HamburgerMenuButton = (props) => {
  const { colors } = useTheme()

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
      style={styles.button}
      onPress={() => {
        // open the
        console.log(props)
        props.navigation.openDrawer()
      }}
    >
      <HamburgerMenuIcon
        color={colors.text}
      />
    </TouchableOpacity>
  )
}

export default HamburgerMenuButton
