import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import Screen from '../components/Screen'
import ActiveButton from '../components/buttons/ActiveButton'
import AlertBanner from '../components/AlertBanner'
import AnodeTextLogo from '../components/images/AnodeTextLogo'
import translate from '../translations'
import { useTheme } from '@react-navigation/native'

const FirstView = ({ navigation, route }) => {
  const { colors, dimensions } = useTheme()
  let isResetAlertVisible = false
  if (route.params && route.params.showResetAlert) {
    isResetAlertVisible = route.params.showResetAlert
  }

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexGrow: 1
    },
    pktPalLogo: {
      width: '100%',
      paddingBottom: dimensions.paddingVertical,
      marginBottom: dimensions.paddingVertical,
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 1
    },
    pktPalText: {
      paddingBottom: dimensions.paddingVertical,
      marginBottom: dimensions.paddingVertical,
      color: colors.headerText.color
    },
    firstButton: {
    },
    secondButton: {
      marginTop: dimensions.paddingVertical,
      paddingBottom: dimensions.verticalSpacingBetweenItems
    },
    buttonContainer: {
      width: '100%',
      maxWidth: 400
    }
  })

  return (
    <Screen>
      <AlertBanner
        variant='success'
        label={translate('logoutSuccessAlert')}
        visible={isResetAlertVisible}
      />
      <View style={styles.screen}>
        <View style={styles.pktPalLogo}>
          <AnodeTextLogo
            primaryColor={colors.logo.primaryColor}
            secondaryColor={colors.logo.secondaryColor}
            size={220}
          />
        </View>
        <View style={styles.buttonContainer}>
          <ActiveButton
            title={translate('createNewWallet')}
            onPress={() => navigation.push('CreatePassphraseView')}
            style={styles.firstButton}
          />
          <ActiveButton
            title={translate('loadFromRecoveryPassphrase')}
            onPress={() => navigation.push('LoadExistingWalletIntroView')}
            style={styles.secondButton}
            variant='secondary'
          />
        </View>
      </View>
    </Screen>
  )
}

export default FirstView
