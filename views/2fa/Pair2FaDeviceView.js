import React, { useEffect, useState } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import Screen from '../../components/Screen'
import BodyText from '../../components/text/BodyText'
import Tabs from '../../components/buttons/Tabs'
import AddressQrCode from '../../components/wallet/AddressQrCode'
import ActiveButton from '../../components/buttons/ActiveButton'
import LinkButton from '../../components/buttons/LinkButton'
import TwoFactorPairText from '../../components/2fa/TwoFactorPairText'
import translate from '../../translations'
import TwoFactorAuth from '../../utils/TwoFactorAuth'
import SharingManager from '../../utils/SharingManager'
import ClipboardManager from '../../utils/ClipboardManager'
import { useTheme } from '@react-navigation/native'

const Pair2FaDeviceView = ({ navigation, route }) => {
  const { dimensions } = useTheme()
  const [is2FaReady, setIs2FaReady] = useState(false)
  const [is2FaInitialized, setIs2FaInitialized] = useState(false)
  const [pairingCode, setPairingCode] = useState('')
  const [pairingSecret, setPairingSecret] = useState('')
  const [twoFactorAuth, setTwoFactorAuth] = useState(null)
  const isPlatformMobile = (Platform.OS === 'ios' || Platform.OS === 'android')

  const user = translate('pktWallet')
  const service = translate('pktWallet')

  useEffect(() => {
    const initializeTwoFactorAuth = async () => {
      if (!is2FaInitialized) {
        const twoFactorAuth = new TwoFactorAuth(user, service)
        setTwoFactorAuth(twoFactorAuth)
        setIs2FaInitialized(true)
        await twoFactorAuth.initialize()
        /* await twoFactorAuth.createPairingCode() */
        const potentialSecret = twoFactorAuth.generateRandomPairingCode()
        console.log(`temporary secret: ${potentialSecret}`)
        const potentialOtp = twoFactorAuth.getGooglePairingUrl(potentialSecret)
        console.log(`new code: ${twoFactorAuth.generateToken(potentialSecret)}`)
        setPairingCode(potentialOtp)
        setPairingSecret(potentialSecret)
        setIs2FaReady(true)
      }
    }
    initializeTwoFactorAuth()
  }, [is2FaInitialized])

  const styles = StyleSheet.create({
    screen: {
      paddingHorizontal: dimensions.screen.paddingHorizontal,
      paddingVertical: dimensions.screen.paddingVertical
    },
    container: {
    },
    text: {
      paddingBottom: dimensions.paddingVertical
    },
    otpInput: {
      paddingHorizontal: dimensions.paddingHorizontal,
      paddingVertical: dimensions.paddingVertical
    },
    linkButtons: {
      paddingBottom: dimensions.verticalSpacingBetweenItems,
      paddingTop: dimensions.paddingVertical
    },
    linkButton: {
      paddingBottom: dimensions.verticalSpacingBetweenItems
    }
  })

  return (
    <Screen>
      <View style={styles.screen}>
        <BodyText style={styles.text}>{translate('pair2faDeviceIntro')}</BodyText>
        <View style={styles.otpInput}>
          <Tabs
            tabs={[
              {
                title: translate('qrCode'),
                content: (
                  <View>
                    <AddressQrCode address={pairingCode} ready={is2FaReady} />
                    <View style={styles.linkButtons}>
                      <View style={styles.linkButton}>
                        <LinkButton
                          title={translate('copyPairingCode')}
                          onPress={() => { ClipboardManager.set(pairingSecret) }}
                        />
                      </View>
                      {isPlatformMobile && <View style={styles.linkButton}><LinkButton title={translate('sharePairingCode')} onPress={() => SharingManager.share(twoFactorAuth.pairingCode)} /></View>}
                    </View>
                  </View>
                )
              },
              {
                title: translate('textCode'),
                content: (
                  <>
                    <TwoFactorPairText pairingCode={pairingSecret} ready={is2FaReady} />
                    <View style={styles.linkButtons}>
                      <View style={styles.linkButton}>
                        <LinkButton
                          title={translate('copyPairingCode')}
                          onPress={() => { ClipboardManager.set(pairingSecret) }}
                        />
                      </View>
                      {isPlatformMobile && <View style={styles.linkButton}><LinkButton title={translate('sharePairingCode')} onPress={() => SharingManager.share(twoFactorAuth.pairingCode)} /></View>}
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
              navigation.push('Verify2FaDeviceView',{secret:pairingSecret})
            }}
          />
        </View>
      </View>
    </Screen>
  )
}

export default Pair2FaDeviceView
