import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Tabs from '../../components/buttons/Tabs'
import AddressQrCode from '../../components/wallet/AddressQrCode'
import ActiveButton from '../../components/buttons/ActiveButton'
import LinkButton from '../../components/buttons/LinkButton'

const Pair2FaDeviceBackupCodesView = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Write down these recovery tokens in a safe place.
          </Text>
          <Text style={styles.text}>
            These tokens will allow you to reset your 2FA pairing if you ever lose your device
          </Text>
        </View>
        <View style={styles.otpInput}>
          <View style={styles.card}>
            <Text>abc123</Text>
          </View>
          <View style={styles.linkButtons}>
            <View style={styles.linkButton}>
              <LinkButton title='Copy to Clipboard' />
            </View>
          </View>
        </View>
        <View style={styles.button}>
          <ActiveButton
            title='Return to Wallet Balance'
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    width: '100%'
  },
  screen: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '100%'
  },
  textContainer: {
    paddingHorizontal: '20px',
    paddingVertical: '16px'
  },
  text: {
    paddingVertical: '4px'
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
  },
  card: {
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '6px'
  },
  button: {
    paddingHorizontal: '20px',
    width: '100%'
  }
})

export default Pair2FaDeviceBackupCodesView
