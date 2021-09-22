import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import SecurityView from '../views/SecurityView'

const Screen = (props) => {
  const { colors } = useTheme()
  const security = useSelector(state => state.security.securityScreen)
  console.log('security', security)

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.screen.backgroundColor
    },
    security: {
      flex: 1,
      height:'100%',
      width:'100%',
      position:'absolute',
    }
  })

  return (
    <View style={styles.screen}>
      {
        security ?
          <View style={styles.security}>
            <SecurityView />
          </View>
          :
          <>
            {props.children}
          </>
      }
    </View>
  )
}

export default Screen
