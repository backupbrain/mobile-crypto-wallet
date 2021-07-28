import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import PinManager from '../utils/PinManager'
import PassphraseManager from '../utils/PassphraseManager'
import SlideToConfirmInput from '../components/inputs/SlideToConfirmInput'
import translate from '../translations'

const LogOutView = ({ navigation, route }) => {
  const pinManager = new PinManager()
  const passphraseManager = new PassphraseManager()
  const logout = () => {
    // TOdO: unlink wallet from pktd
    pinManager.clear()
    passphraseManager.clear()
    // QUEStION; clear address book?
  }
  const navigateToFirstView = () => {
    navigation.push('FirstView', { reset: true })
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <Text style={styles.header}>{translate('logoutHeader')}</Text>
        <View style={styles.textBlock}>
          <Text style={styles.text}>{translate('logoutIntro1')}</Text>
          <Text style={styles.text}>{translate('logoutIntro2')}</Text>
          <Text style={styles.text}>{translate('logoutIntro3')}</Text>
        </View>
        <SlideToConfirmInput
          label={translate('slideToLogout')}
          onComplete={() => {
            logout()
            navigateToFirstView()
          }}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
    flex: 1
  },
  screen: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: '20px',
    paddingVertical: '20px'
  },
  header: {
    fontSize: '2em',
    fontWeight: 'bold',
    paddingBottom: '12px'
  },
  textBlock: {
    paddingBottom: '12px'
  },
  text: {
    textAlign: 'left',
    paddingBottom: '8px'
  }
})

export default LogOutView
