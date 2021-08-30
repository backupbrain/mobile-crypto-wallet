import React, { useState,useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import Screen from '../../components/Screen'
import BodyText from '../../components/text/BodyText'
import OtpInput from '../../components/inputs/OtpInput'
import ActiveButton from '../../components/buttons/ActiveButton'
import translate from '../../translations'
import { useTheme } from '@react-navigation/native'
import TwoFactorAuth from '../../utils/TwoFactorAuth'

const Verify2FaDeviceView = ({ navigation, route }) => {
  const { dimensions } = useTheme()
  const [isPinValid, setIsPinValid] = useState(false)
  const secret = useRef(route.params.secret)
  const styles = StyleSheet.create({
    screen: {
      paddingHorizontal: dimensions.screen.paddingHorizontal,
      paddingVertical: dimensions.screen.paddingVertical
    },
    otpInput: {
      paddingVertical: dimensions.screen.paddingVertical
    }
  })

  return (
    <Screen>
      <View style={styles.screen}>
        <BodyText style={styles.text}>{translate('verify2faIntro')}</BodyText>
        <View style={styles.otpInput}>
          <OtpInput
            error={translate('invalidPin')}
            onValidPin={() => {
              setIsPinValid(true)
            }}
            secret={secret.current}
          />
        </View>
        <View style={styles.container}>
          <ActiveButton
            title={translate('next')}
            onPress={() => {
              TwoFactorAuth.savePairingCode(secret.current)
              navigation.reset({
                index: 0,
                routes: [{ name: 'WalletHomeViewSet' }],
              });
            }}
            disabled={!isPinValid}
          />
        </View>
      </View>
    </Screen>
  )
}

export default Verify2FaDeviceView
