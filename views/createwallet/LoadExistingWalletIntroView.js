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
          <DefaultTextLeft>{translate('loadexistingWalletIntro1')}</DefaultTextLeft>
          <DefaultTextLeft>{translate('loadexistingWalletIntro2')}</DefaultTextLeft>
        </View>
        <ActivityButton
          title={translate('continueToSecretPassphrase')}
          onPress={() => navigation.push('VerifyRecoveryPhraseView')}
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
    alignItems: 'center',
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
    paddingBottom: '12px',
    width: '100%'
  }
})

export default WalletCreatedView
