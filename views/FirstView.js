import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import Screen from '../components/Screen'
import ActiveButton from '../components/buttons/ActiveButton'
import AlertBanner from '../components/AlertBanner'
import AnodeTextLogo from '../components/images/AnodeTextLogo'
import HeaderText from '../components/text/HeaderText'
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
      justifyContent: 'center',
      paddingHorizontal: '20px',
      flexGrow: 1
    },
    pktPalLogo: {
      width: '100%',
      paddingBottom: dimensions.paddingVertical,
      marginBottom: dimensions.paddingVertical,
      alignItems: 'center'
    },
    pktPalText: {
      paddingBottom: dimensions.paddingVertical,
      marginBottom: dimensions.paddingVertical,
      color: colors.text
    },
    firstButton: {
    },
    secondButton: {
      marginTop: dimensions.paddingVertical
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
          />
        </View>
        <HeaderText style={styles.pktPalText}>{translate('pktWallet')}</HeaderText>
        <ActiveButton
          title={translate('createNewWallet')}
          onPress={() => navigation.push('CreateNewWalletIntroView')}
          style={styles.firstButton}
        />
        <ActiveButton
          title={translate('loadFromRecoveryPassphrase')}
          onPress={() => navigation.push('LoadExistingWalletIntroView')}
          style={styles.secondButton}
        />
      </View>
    </Screen>
  )
}

export default FirstView
