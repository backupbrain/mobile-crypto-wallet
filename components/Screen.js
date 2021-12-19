import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import SecurityView from '../views/SecurityView'

const Screen = (props) => {
  const { colors, dimensions } = useTheme()
  const security = useSelector(state => state.security.securityScreen)

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.screen.backgroundColor,
      paddingTop: dimensions.screen.underHeaderPaddingTop,
      paddingBottom: dimensions.screen.paddingBottom,
      paddingHorizontal: dimensions.screen.paddingHorizontal
    },
    security: {
      flex: 1,
      height: '100%',
      width: '100%',
      position: 'absolute'
    }
  })

  return (
    <ScrollView contentContainerStyle={[styles.screen, props.style]}>
      {security
        ? (
          <View style={styles.security}>
            <SecurityView />
          </View>
        )
        : (
          <>
            {props.children}
          </>
        )}
    </ScrollView>
  )
}

export default Screen
