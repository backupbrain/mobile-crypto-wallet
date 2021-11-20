import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Screen from '../../components/Screen'
import RecoveryWordGrid from '../../components/inputs/RecoveryWordGrid'
import ActiveButton from '../../components/buttons/ActiveButton'
import BodyText from '../../components/text/BodyText'
import PktManager from '../../utils/PktManager'
import translate from '../../translations'
import { useTheme } from '@react-navigation/native'
import ProgressStepBar from '../../components/ProgressStepBar'
import DotPinFilled from '../../components/images/DotPinFilled'
import CopyIcon from '../../components/images/CopyIcon'
import ClipboardManager from '../../utils/ClipboardManager'

const NewWalletView = ({ navigation, route }) => {
  const { colors, dimensions } = useTheme()
  const [isVisible, setIsVisible] = useState(true)
  const [isRecoveryPhraseSet, setIsRecoveryPhraseSet] = useState(false)
  const [recoveryPhrase, setRecoveryPhrase] = useState([])
  const pktManager = useRef(new PktManager())

  const openWalletAndGetRecoveryPhrase = async () => {
    const recoveryPhrase = await pktManager.current.createWallet()
    console.log('recoveryPhrase')
    console.log(recoveryPhrase.join(' '))
    setRecoveryPhrase(recoveryPhrase)
    setIsRecoveryPhraseSet(true)
  }
  useEffect(() => {
    // Update the document title using the browser API
    if (isRecoveryPhraseSet === false) {
      openWalletAndGetRecoveryPhrase()
    }
  }, [])
  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      paddingHorizontal: dimensions.screens.horizontal,
      paddingBottom: dimensions.screens.bottomPadding,
      paddingTop: dimensions.screens.topPadding,
      justifyContent: 'space-between'
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
      /*  paddingBottom: dimensions.paddingVertical */
    },
    firstButton: {
      marginBottom: dimensions.paddingVertical
    },
    writeDownText: {
      color: 'red'
    },
    bullets: {
      flexDirection: 'row',
      /* paddingLeft: dimensions.verticalSpacingBetweenItems */
    },
    copyContainer: {
      height: 40,
      marginTop: dimensions.paddingVertical,
      marginBottom: dimensions.paddingHorizontal,
      borderRadius: 20,
      alignItems: 'center'
    },
    copy: {
      height: 40,
      backgroundColor: colors.recoveryWord.backgroundColor,
      borderRadius: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignItems: 'center'
    },
    copyIcon:{
      marginLeft: dimensions.horizontalSpacingBetweenItems,
    },
    text: {
      padding: dimensions.verticalSpacingBetweenItems,
      paddingRight: dimensions.horizontalSpacingBetweenItems,
      color: colors.text
    }
  })

  return (
    <Screen>
      <View style={styles.screen}>
        <View>
          <ProgressStepBar steps={4} activeStep={1} />
          <View style={styles.container}>
            <View style={styles.textBlock}>
              <BodyText style={styles.paragraph}><BodyText style={styles.writeDownText}>{translate('writeDown')}</BodyText>{translate('writeDownMore')} </BodyText>
              <View style={styles.bullets}>
                <DotPinFilled color={colors.text} />
                <BodyText >{translate('seedPhraseWarning1')}</BodyText>
              </View>
              <View style={styles.bullets}>
                <DotPinFilled color={colors.text} />
                <BodyText >{translate('seedPhraseWarning2')}</BodyText>
              </View>
            </View>
            <View style={styles.recoveryWordGrid}>
              <RecoveryWordGrid words={recoveryPhrase} visible={isVisible} />
            </View>
          </View>
        </View>
        <View style={styles.copyContainer}>
          <TouchableOpacity style={styles.copy} onPress={() => ClipboardManager.set(recoveryPhrase.join(' '))}>
            <View style={styles.copyIcon}>
              <CopyIcon color={colors.primaryButton.backgroundColor} />
            </View>
            <BodyText style={styles.text}>{translate('seedCopy')}</BodyText>
          </TouchableOpacity>
        </View>
        <View>
          <ActiveButton
            title={translate('next')}
            onPress={() => { navigation.push('VerifyRecoveryPhraseView', { recoveryPhrase }) }}
          />
        </View>
      </View>
    </Screen>
  )
}

export default NewWalletView
