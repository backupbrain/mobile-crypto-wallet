import React, { useState, useRef, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import Screen from '../../components/Screen'
import ActiveButton from '../../components/buttons/ActiveButton'
import CreateNewPasswordInput from '../../components/inputs/CreateNewPasswordInput'
import PassphraseManager from '../../utils/PassphraseManager'
import PktManager from '../../utils/PktManager'
import translate from '../../translations'
import PinManager from '../../utils/PinManager'
import { useTheme } from '@react-navigation/native'
import BodyText from '../../components/text/BodyText'
import Modal from '../../components/Modal'

/*
  {route.params?.from == 'load' && <ProgressStepBar steps={3} activeStep={2} />}
  {route.params?.from == 'create' && <ProgressStepBar steps={4} activeStep={3} />}
*/

const CreatePinView = ({ navigation, route }) => {
  const { colors, dimensions } = useTheme()
  const pinManager = useRef(new PinManager())
  const [pin1, setPin1] = useState('')
  const [pin2, setPin2] = useState('')
  const passphraseManager = useRef(new PassphraseManager())
  const pktManager = useRef(new PktManager())
  const [isFormFilled, setisFormFilled] = useState(false)
  const creatingWalletModalRef = useRef(null)
  const errorCreatingWalletModalRef = useRef(null)
  const verifyFormFilled = (pin1, pin2) => {
    let isFormFilled = false
    if (pin1.length === 4 && pin1 === pin2) {
      isFormFilled = true
    }
    setisFormFilled(isFormFilled)
    return isFormFilled
  }
  const savePin = async () => {
    await pinManager.current.set(pin1)
  }

  useEffect(() => {
    console.log(route.params)
    if (route.params.loadWallet) {
      navigation.setOptions({ progressActiveStep: 3 })
    }
  }, [])

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'space-between'
    },
    inputContainer: {
      paddingVertical: dimensions.paddingVertical,
      paddingBottom: dimensions.paddingVertical
    },
    activityIndicatorContainer: {
      flexDirection: 'row'
    },
    activityIndicator: {
      marginRight: dimensions.horizontalSpacingBetweenItems
    },
    errorCreatingWalletModalContainer: {
      paddingHorizontal: 10,
      paddingBottom: 20
    },
    creatingWalletModalContainer: {
      paddingHorizontal: 10,
      paddingVertical: 20
    }
  })

  const _onNewPasswordChangeHandler = (text) => {
    setPin1(text)
    verifyFormFilled(text, pin2)
  }

  const _onNewPasswordVerifyChangeHandler = (text) => {
    setPin2(text)
    verifyFormFilled(pin1, text)
  }

  const _onNewPasswordMatchHandler = (doPasswordsMatch, password) => { }

  const _onActivityPressHandler = async () => {
    await savePin()
    if (route.params?.loadWallet) {
      const passphrase = await passphraseManager.current.get()
      const seedWords = route.params.seedWords
      creatingWalletModalRef.current.open()
      try {
        await pktManager.current.createWallet(passphrase, seedWords)
        navigation.push('WalletSetupCompleteView')
        creatingWalletModalRef.current.close()
      } catch (error) {
        creatingWalletModalRef.current.close()
        errorCreatingWalletModalRef.current.open()
      }
    } else {
      navigation.push('SecureYourWalletInfoView') // TODO: push route.params
    }
  }

  return (
    <>
      <Screen>
        <View style={styles.screen}>
          <View>
            <BodyText>{translate('createPinIntro')}</BodyText>
            <View style={styles.inputContainer}>
              <CreateNewPasswordInput
                maxLength={4}
                passwordPlaceholder={translate('pin')}
                passwordHelp={translate('pinHelpText')}
                passwordVerifyPlaceholder={translate('verifyPin')}
                passwordVerifyHelp={translate('retypeNewPin')}
                onPasswordChangeText={_onNewPasswordChangeHandler}
                onPasswordVerifyChangeText={_onNewPasswordVerifyChangeHandler}
                onPasswordsMatch={_onNewPasswordMatchHandler}
                keyboardType='numeric'
              />
            </View>
          </View>
          <View>
            <ActiveButton
              title={translate('createAccPin')}
              disabled={!isFormFilled}
              onPress={_onActivityPressHandler}
            />
          </View>
        </View>
      </Screen>
      <Modal
        ref={creatingWalletModalRef}
      >
        <View style={styles.creatingWalletModalContainer}>
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator
              animating
              color={colors.primaryButton.backgroundColor}
              style={styles.activityIndicator}
            />
            <BodyText>{translate('creatingWallet')}</BodyText>
          </View>
        </View>
      </Modal>
      <Modal
        ref={errorCreatingWalletModalRef}
        title={translate('errorTitle')}
      >
        <View style={styles.errorCreatingWalletModalContainer}>
          <BodyText style={styles.modalErrorText}>{translate('errorCreatingWallet')}</BodyText>
          <BodyText>{translate('errorCreatingWalletInfo')}</BodyText>
        </View>
      </Modal>
    </>
  )
}

export default CreatePinView
