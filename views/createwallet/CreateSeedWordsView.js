import React, { useState, useEffect, useRef } from 'react'
import { ActivityIndicator, View, StyleSheet, TouchableOpacity } from 'react-native'
import Screen from '../../components/Screen'
import SeedWordGrid from '../../components/inputs/SeedWordGrid'
import ActiveButton from '../../components/buttons/ActiveButton'
import BodyText from '../../components/text/BodyText'
import PktManager from '../../utils/PktManager'
import PassphraseManager from '../../utils/PassphraseManager'
import translate from '../../translations'
import { useTheme } from '@react-navigation/native'
import DotPinFilled from '../../components/images/DotPinFilled'
import CopyIcon from '../../components/images/CopyIcon'
import ClipboardManager from '../../utils/ClipboardManager'
import Modal from '../../components/Modal'

const CreateSeedWordsView = ({ navigation, route }) => {
  const { colors, dimensions } = useTheme()
  const [isRecoveryPhraseSet, setIsRecoveryPhraseSet] = useState(false)
  const [recoveryPhrase, setRecoveryPhrase] = useState([])
  const pktManager = useRef(new PktManager())
  const passphraseManager = useRef(new PassphraseManager())
  const seedWordsErrorModalRef = useRef(null)
  const generatingSeedWordsModalRef = useRef(null)

  const openWalletAndGetRecoveryPhrase = async () => {
    const passphrase = passphraseManager.current.get()
    generatingSeedWordsModalRef.current.open()
    try {
      const seedWords = await pktManager.current.genSeed(passphrase)
      console.log('seedWords')
      console.log(seedWords.join(' '))
      setRecoveryPhrase(seedWords)
      setIsRecoveryPhraseSet(true)
      generatingSeedWordsModalRef.current.close()
    } catch (error) {
      console.error('Error retrieving seed words!')
      console.log(error)
      generatingSeedWordsModalRef.current.close()
      seedWordsErrorModalRef.current.open()
    }
    /*
    const recoveryPhrase = await pktManager.current.createWallet()
    */
  }
  useEffect(() => {
    // Update the document title using the browser API
    if (isRecoveryPhraseSet === false) {
      openWalletAndGetRecoveryPhrase()
    }
  }, [])
  const styles = StyleSheet.create({
    screen: {
    },
    container: {
      justifyContent: 'space-between'
    },
    recoveryWordGrid: {
      paddingVertical: dimensions.horizontalSpacingBetweenItems
    },
    paragraph: {
      paddingBottom: dimensions.verticalSpacingBetweenItems
    },
    textBlock: {
      paddingBottom: dimensions.verticalSpacingBetweenItems
    },
    extremelyImportantText: {
      color: 'red',
      textTransform: 'uppercase'
    },
    bullets: {
      flexDirection: 'row'
    },
    copyContainer: {
      height: 40,
      marginBottom: dimensions.paddingHorizontal,
      borderRadius: 20,
      alignItems: 'center'
    },
    copyButton: {
      height: 40,
      backgroundColor: colors.recoveryWord.backgroundColor,
      borderRadius: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: dimensions.horizontalSpacingBetweenItems
    },
    copyIcon: {
      marginLeft: dimensions.horizontalSpacingBetweenItems
    },
    text: {
      padding: dimensions.verticalSpacingBetweenItems,
      paddingRight: dimensions.horizontalSpacingBetweenItems,
      color: colors.text
    },
    activityIndicatorContainer: {
      flexDirection: 'row'
    },
    activityIndicator: {
      marginRight: dimensions.horizontalSpacingBetweenItems
    },
    seedWordsErrorModalContainer: {
      paddingHorizontal: 10,
      paddingBottom: 20
    },
    generatingSeedWordsModalContainer: {
      paddingHorizontal: 10,
      paddingVertical: 20
    },
    modalErrorText: {
      marginBottom: 10
    }
  })

  return (
    <>
      <Screen style={{ flex: 0 }}>
        <View style={styles.screen}>
          <View>
            <View style={styles.container}>
              <View style={styles.textBlock}>
                <BodyText style={styles.paragraph}>
                  <BodyText style={styles.extremelyImportantText}>{translate('writeDown')} </BodyText>
                  {translate('writeDownMore')}
                </BodyText>
                <View style={styles.bullets}>
                  <DotPinFilled color={colors.text} />
                  <BodyText>{translate('seedPhraseWarning1')}</BodyText>
                </View>
                <View style={styles.bullets}>
                  <DotPinFilled color={colors.text} />
                  <BodyText>{translate('seedPhraseWarning2')}</BodyText>
                </View>
              </View>
              <View style={styles.recoveryWordGrid}>
                {recoveryPhrase.length > 0
                  ? <SeedWordGrid words={recoveryPhrase} />
                  : (
                    <View style={styles.activityIndicatorContainer}>
                      <ActivityIndicator
                        animating
                        color={colors.primaryButton.backgroundColor}
                        style={styles.activityIndicator}
                      />
                      <BodyText>{translate('generatingSeedPhrase')}</BodyText>
                    </View>
                  )}
              </View>
            </View>
          </View>
          {recoveryPhrase.length > 0 &&
            <View style={styles.copyContainer}>
              <TouchableOpacity
                style={styles.copyButton}
                onPress={() => {
                  console.log(recoveryPhrase.join(' '))
                  ClipboardManager.set(recoveryPhrase.join(' '))
                }}
              >
                <View style={styles.copyIcon}>
                  <CopyIcon color={colors.primaryButton.backgroundColor} />
                </View>
                <BodyText style={styles.text}>{translate('copySeedWords')}</BodyText>
              </TouchableOpacity>
            </View>}
          <View>
            <ActiveButton
              disabled={recoveryPhrase.length === 0}
              title={translate('next')}
              onPress={() => { navigation.push('ConfirmSeedWordsView', { recoveryPhrase }) }}
            />
          </View>
        </View>
      </Screen>
      <Modal
        ref={seedWordsErrorModalRef}
        title={translate('errorTitle')}
      >
        <View style={styles.seedWordsErrorModalContainer}>
          <BodyText style={styles.modalErrorText}>{translate('errorGeneratingSeedWords')}</BodyText>
          <BodyText>{translate('errorGeneratingSeedWordsInfo')}</BodyText>
        </View>
      </Modal>
      <Modal
        ref={generatingSeedWordsModalRef}
      >
        <View style={styles.generatingSeedWordsModalContainer}>
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator
              animating
              color={colors.primaryButton.backgroundColor}
              style={styles.activityIndicator}
            />
            <BodyText>{translate('generatingSeedPhrase')}</BodyText>
          </View>
        </View>
      </Modal>
    </>
  )
}

export default CreateSeedWordsView
