import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import ActiveButton from '../components/buttons/ActiveButton'
import AlertBanner from '../components/AlertBanner'
import { SafeAreaView } from 'react-native-safe-area-context'
import PktPalLogo from '../components/images/PktPalLogo'
import translate from '../translations'

const FirstView = ({ navigation, route }) => {
  let isResetAlertVisible = false
  if (route.params && route.params.showResetAlert) {
    isResetAlertVisible = route.params.showResetAlert
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <AlertBanner
        variant='success'
        label={translate('logoutSuccessAlert')}
        visible={isResetAlertVisible}
      />
      <View style={styles.screen}>
        <View style={styles.pktPalLogo}>
          <PktPalLogo />
        </View>
        <Text style={styles.pktPalText}>{translate('pktWallet')}</Text>
        <ActiveButton
          title={translate('createNewWallet')}
          onPress={() => navigation.push('CreateNewWalletIntroView')}
        />
        <ActiveButton
          title={translate('loadFromRecoveryPassphrase')}
          onPress={() => navigation.push('LoadExistingWalletIntroView')}
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
    justifyContent: 'center',
    paddingHorizontal: '20px',
    flexGrow: 1
  },
  pktPalLogo: {
    width: '100%',
    marginBottom: '25px',
    alignItems: 'center'
  },
  pktPalText: {
    marginBottom: '30px',
    fontSize: '1.6em',
    fontWeight: 'bold'
  }
})

export default FirstView
