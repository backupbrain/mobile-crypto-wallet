import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ActivityButton from '../../components/buttons/ActiveButton'
import DefaultTextLeft from '../../components/text/DefaultTextLeft'
import translate from '../../translations'

const WalletCreatedView = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.textBlock}>
          <DefaultTextLeft>{translate('newWalletIntro1')}</DefaultTextLeft>
          <DefaultTextLeft>{translate('newWalletIntro2')}</DefaultTextLeft>
          <DefaultTextLeft>{translate('newWalletIntro3')}</DefaultTextLeft>
        </View>
        <View style={styles.textBlock}>
          <DefaultTextLeft>{translate('dontLoseTheseWords')}</DefaultTextLeft>
          <DefaultTextLeft>{translate('ifYouLoseTheseWords')}</DefaultTextLeft>
        </View>
        <ActivityButton
          title={translate('continueToRecoveryPhrase')}
          onPress={() => navigation.push('CreateNewWalletView')}
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
  }
})

export default WalletCreatedView
