import React, { useRef, useState } from 'react'
import { View, StyleSheet, CheckBox, Text } from 'react-native'
import Screen from '../components/Screen'
import PinManager from '../utils/PinManager'
import PassphraseManager from '../utils/PassphraseManager'
import SlideToConfirmInput from '../components/inputs/SlideToConfirmInput'
import HeaderText from '../components/text/HeaderText'
import BodyText from '../components/text/BodyText'
import translate from '../translations'
import { useTheme } from '@react-navigation/native'
import ContactManager from '../utils/ContactManager'
import TransactionNoteManager from '../utils/TransactionNoteManager'
import AdaptiveStorage from '../utils/AdaptiveStorage'
import AppConstants from '../utils/AppConstants'

const LogOutView = ({ navigation, route }) => {
  const { colors, dimensions } = useTheme()
  const [isChecked, setIsChecked] = useState(false)
  const pinManager = useRef(new PinManager())
  const passphraseManager = useRef(new PassphraseManager())
  const contactManager = useRef(new ContactManager())
  const transactionNoteManager = useRef(new TransactionNoteManager())
  const logout = () => {
    // TOdO: unlink wallet from pktd
    pinManager.current.clear()
    passphraseManager.current.clear()
    AdaptiveStorage.remove(AppConstants.NAVIGATION_STATE_KEY)
    if (isChecked) {
      contactManager.current.clearAll()
      transactionNoteManager.current.clearAll()
    }
    // QUESTION; clear wallet history?
  }

  const navigateToFirstView = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'FirstViewSet' }],
    })
  }

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'flex-start',
      paddingHorizontal: dimensions.screens.horizontal,
      paddingBottom: dimensions.screens.bottomPadding,
      paddingTop: dimensions.screens.topPadding,
    },
    header: {
      paddingBottom: dimensions.paddingVertical
    },
    textBlock: {
      paddingBottom: dimensions.paddingVertical
    },
    text: {
      paddingBottom: dimensions.verticalSpacingBetweenItems
    },
    checkbox: {
      marginRight: dimensions.horizontalSpacingBetweenItems,
      marginTop: 2
    },
    checkboxContainer: {
      flex: 1,
      paddingBottom: dimensions.verticalSpacingBetweenItems,
      flexDirection: 'row',
      alignSelf: 'center'

    }
  })

  const _onCompleteHandler = () => {
    logout()
    navigateToFirstView()
  }

  return (
    <Screen>
      <View style={styles.screen}>
        <HeaderText style={styles.header}>{translate('logoutHeader')}</HeaderText>
        <View style={styles.textBlock}>
          <BodyText style={styles.text}>{translate('logoutIntro1')}</BodyText>
          <BodyText style={styles.text}>{translate('logoutIntro2')}</BodyText>
          <BodyText style={styles.text}>{translate('logoutIntro3')}</BodyText>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isChecked}
            onValueChange={setIsChecked}
            style={styles.checkbox}
          />
          <BodyText >{translate('confirmDeleteContacts')}</BodyText>
        </View>
        <SlideToConfirmInput
          label={translate('slideToLogout')}
          onComplete={_onCompleteHandler}
        />
      </View>
    </Screen>
  )
}

export default LogOutView
