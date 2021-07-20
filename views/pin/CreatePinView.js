import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ActiveButton from '../../components/buttons/ActiveButton'
import CreateNewPasswordInput from '../../components/inputs/CreateNewPasswordInput'
import translate from '../../translations'
import PinManager from '../../utils/PinManager'

const CreatePinView = ({ navigation, route }) => {
  const pinManager = PinManager()
  const [pin1, setPin1] = useState('')
  const [pin2, setPin2] = useState('')
  const [isFormFilled, setisFormFilled] = useState(false)
  const verifyFormFilled = (pin1, pin2) => {
    let isFormFilled = false
    if (pin1.length === 4 && pin1 === pin2) {
      isFormFilled = true
    }
    setisFormFilled(isFormFilled)
    return isFormFilled
  }
  const savePin = () => {
    pinManager.set(pin1)
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.container}>
          <CreateNewPasswordInput
            maxLength={4}
            passwordPlaceholder={translate('pin')}
            passwordHelp={translate('pinHelpText')}
            passwordVerifyPlaceholder={translate('verifyPin')}
            passwordVerifyHelp=''
            onPasswordChangeText={(text) => {
              setPin1(text)
              verifyFormFilled(text, pin2)
            }}
            onPasswordVerifyChangeText={(text) => {
              setPin2(text)
              verifyFormFilled(pin1, text)
            }}
            onPasswordsMatch={(doPasswordsMatch, password) => {}}
          />
          <ActiveButton
            title={translate('createPin')}
            disabled={!isFormFilled}
            onPress={() => {
              savePin()
              navigation.push('WalletHomeView')
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
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  container: {
    width: '100%',
    paddingHorizontal: '20px',
    paddingVertical: '20px'
  }
})

export default CreatePinView
