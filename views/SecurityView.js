import * as React from 'react'
import { View, KeyboardAvoidingView, StyleSheet } from 'react-native'
import Screen from '../components/Screen'
import AnodeTextLogo from '../components/images/AnodeTextLogo'
import { useTheme } from '@react-navigation/native'

const SecurityView = ({ navigation, route }) => {
  const { colors } = useTheme()

  const styles = StyleSheet.create({
    fillScreen: {
      flex: 1
    },
    container: {
      flex: 1
    },
    screen: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: '20px',
      paddingVertical: '20px'
    }
  })

  return (
    /* <Screen> */
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.screen}>
          <AnodeTextLogo
            primaryColor={colors.logo.primaryColor}
            secondaryColor={colors.logo.secondaryColor}
            size={100}
          />
        </View>
      </KeyboardAvoidingView>
    /* </Screen> */
  )
}

export default SecurityView
