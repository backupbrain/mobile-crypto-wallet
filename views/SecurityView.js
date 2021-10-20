import * as React from 'react'
import { View, KeyboardAvoidingView, StyleSheet } from 'react-native'
import Screen from '../components/Screen'
import AnodeTextLogo from '../components/images/AnodeTextLogo'
import { useTheme } from '@react-navigation/native'
import AnodeALogo from '../components/images/AnodeALogo'
import AnodeALogo_test from '../components/images/AnodeALogo_test'
import AnodeTextLogo_test from '../components/images/AnodeTextLogo_test'
import RadialGradientDarkSvg from '../components/images/RadialGradientDarkSvg'
import { useColorScheme } from 'react-native-appearance'
import RadialGradientLightSvg from '../components/images/RadialGradientLightSvg'

const SecurityView = ({ navigation, route }) => {
  const { colors, dark } = useTheme()

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
      paddingVertical: '20px',
      backgroundColor: colors.securityBackground
    },
    textLogo: {
      position: 'absolute',
      bottom: 40
    },
    logoContainer: {
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center'
    },
    gradient: {
      position: 'absolute',
      zIndex: -2
    }
  })

  return (
    /* <Screen> */
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.screen}>
        <View style={styles.logoContainer}>
          <AnodeALogo_test />
          <View style={styles.gradient}>
            {dark ? <RadialGradientDarkSvg /> : <RadialGradientLightSvg />}
          </View>
        </View>
        {/* <AnodeTextLogo
            primaryColor={colors.logo.primaryColor}
            secondaryColor={colors.logo.secondaryColor}
            size={100}
          /> */}
        <View style={styles.textLogo}>
          <AnodeTextLogo_test />
        </View>
      </View>
    </KeyboardAvoidingView>
    /* </Screen> */
  )
}

export default SecurityView
