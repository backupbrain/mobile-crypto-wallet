import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import OtpInput from '../../components/inputs/OtpInput'
import ActiveButton from '../../components/buttons/ActiveButton'
import translate from '../../translations'

const Verify2FaDeviceView = ({ navigation, route }) => {
  const [isPinValid, setIsPinValid] = useState(false)
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <Text style={styles.text}>{translate('verify2faIntro')}</Text>
        <View style={styles.otpInput}>
          <OtpInput
            error={translate('invalidPin')}
            onValidPin={() => {
              setIsPinValid(true)
            }}
          />
        </View>
        <View style={styles.container}>
          <ActiveButton
            title={translate('next')}
            onPress={() => {
              // TODO: move to next screen
            }}
            disabled={!isPinValid}
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
  container: {
    width: '100%',
    paddingHorizontal: '20px',
    paddingVertical: '16px'
  },
  screen: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '100%'
  },
  text: {
    paddingHorizontal: '20px',
    paddingVertical: '16px'
  },
  otpInput: {
    paddingHorizontal: '20px',
    paddingVertical: '16px'
  }
})

export default Verify2FaDeviceView
