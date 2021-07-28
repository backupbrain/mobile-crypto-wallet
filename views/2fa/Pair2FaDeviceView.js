import React, { useEffect, useState } from 'react'
import { Platform, StyleSheet, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Tabs from '../../components/buttons/Tabs'
import AddressQrCode from '../../components/wallet/AddressQrCode'
import ActiveButton from '../../components/buttons/ActiveButton'
import LinkButton from '../../components/buttons/LinkButton'
import TwoFactorPairText from '../../components/2fa/TwoFactorPairText'
import translate from '../../translations'
import TwoFactorAuth from '../../utils/TwoFactorAuth'
import shareMessage from '../../utils/ShareMessage'
import ClipboardManager from '../../utils/ClipboardManager'

const Pair2FaDeviceView = ({ navigation, route }) => {
  const [is2FaReady, setIs2FaReady] = useState(false)
  const [pairingCode, setPairingCode] = useState('')
  const [pairingSecret, setPairingSecret] = useState('')
  const twoFactorAuth = new TwoFactorAuth(translate('pktWallet'), translate('pktWallet'))
  const isPlatformMobile = (Platform.OS === 'ios' || Platform.OS === 'android')
  useEffect(() => {
    twoFactorAuth.initialize().then(() => {
      setPairingCode(twoFactorAuth.otpauth)
      setPairingSecret(twoFactorAuth.secret)
      setIs2FaReady(true)
    })
  })
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <Text style={styles.text}>{translate('pair2faDeviceIntro')}</Text>
        <View style={styles.otpInput}>
          <Tabs
            tabs={[
              {
                title: translate('qrCode'),
                card: (
                  <>
                    {/* <Text>{pairingCode}</Text> */}
                    <AddressQrCode address={pairingCode} ready={is2FaReady} />
                    <View style={styles.linkButtons}>
                      <View style={styles.linkButton}>
                        <LinkButton
                          title={translate('copyPairingCode')}
                          onPress={() => { ClipboardManager.set(pairingSecret) }}
                        />
                      </View>
                      {isPlatformMobile && <View style={styles.linkButton}><LinkButton title={translate('sharePairingCode')} onPress={() => shareMessage(twoFactorAuth.pairingCode)} /></View>}
                    </View>
                  </>
                )
              },
              {
                title: translate('textCode'),
                card: (
                  <>
                    <TwoFactorPairText pairingCode={pairingSecret} ready={is2FaReady} />
                    <View style={styles.linkButtons}>
                      <View style={styles.linkButton}>
                        <LinkButton
                          title={translate('copyPairingCode')}
                          onPress={() => { ClipboardManager.set(pairingSecret) }}
                        />
                      </View>
                      {isPlatformMobile && <View style={styles.linkButton}><LinkButton title={translate('sharePairingCode')} onPress={() => shareMessage(twoFactorAuth.pairingCode)} /></View>}
                    </View>
                  </>
                )
              }
            ]}
            style={styles.tabHeader}
          />
        </View>
        <View style={styles.container}>
          <ActiveButton
            title={translate('next')}
            onPress={() => {
              navigation.push('Verify2FaDeviceView')
            }}
          />
        </View>
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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '100%'
  },
  container: {
    width: '100%',
    paddingHorizontal: '20px'
  },
  text: {
    paddingHorizontal: '20px',
    paddingVertical: '16px'
  },
  otpInput: {
    paddingHorizontal: '20px',
    paddingVertical: '16px'
  },
  linkButtons: {
    paddingTop: '16px',
    paddingBottom: '12px'
  },
  linkButton: {
    paddingBottom: '8px'
  }
})

export default Pair2FaDeviceView
