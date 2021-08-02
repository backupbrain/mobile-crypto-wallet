import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

const Screen = (props) => {
  const { colors } = useTheme()

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.screen.backgroundColor
    }
  })

  return (
    <View style={styles.screen}>
      {props.children}
    </View>
  )
}

export default Screen
