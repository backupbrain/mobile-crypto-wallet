import React, { useRef } from 'react'
import { View, StyleSheet } from 'react-native'
import Screen from '../components/Screen'
import PinManager from '../utils/PinManager'
import PassphraseManager from '../utils/PassphraseManager'
import SlideToConfirmInput from '../components/inputs/SlideToConfirmInput'
import HeaderText from '../components/text/HeaderText'
import BodyText from '../components/text/BodyText'
import translate from '../translations'
import { useTheme } from '@react-navigation/native'

const LogOutView = ({ navigation, route }) => {
  const { dimensions } = useTheme()
  const pinManager = useRef(new PinManager())
  const passphraseManager = useRef(new PassphraseManager())
  const logout = () => {
    // TOdO: unlink wallet from pktd
    pinManager.current.clear()
    passphraseManager.current.clear()
    // QUEStION; clear address book?
    // QUEStION; clear transaction notes book?
    // QUEStION; clear wallet history?
  }
  const navigateToFirstView = () => {
    navigation.push('FirstView', { reset: true })
  }

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'flex-start',
      paddingHorizontal: dimensions.screen.paddingHorizontal,
      paddingVertical: dimensions.screen.paddingHorizontal
    },
    header: {
      paddingBottom: dimensions.paddingVertical
    },
    textBlock: {
      paddingBottom: dimensions.paddingVertical
    },
    text: {
      paddingBottom: dimensions.verticalSpacingBetweenItems
    }
  })

  return (
    <Screen>
      <View style={styles.screen}>
        <HeaderText style={styles.header}>{translate('logoutHeader')}</HeaderText>
        <View style={styles.textBlock}>
          <BodyText style={styles.text}>{translate('logoutIntro1')}</BodyText>
          <BodyText style={styles.text}>{translate('logoutIntro2')}</BodyText>
          <BodyText style={styles.text}>{translate('logoutIntro3')}</BodyText>
        </View>
        <SlideToConfirmInput
          label={translate('slideToLogout')}
          onComplete={() => {
            logout()
            navigateToFirstView()
          }}
        />
      </View>
    </Screen>
  )
}

export default LogOutView
