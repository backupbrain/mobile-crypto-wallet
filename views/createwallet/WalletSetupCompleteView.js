import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Screen from '../../components/Screen'
import WalletSetupCompleteGraphic from '../../components/images/WalletSetupCompleteGraphic'
import ActivityButton from '../../components/buttons/ActiveButton'
import BodyText from '../../components/text/BodyText'
import HeaderText from '../../components/text/HeaderText'
import { useTheme } from '@react-navigation/native'
import translate from '../../translations'
// import SecureWalletGraphic from '../../components/images/SecureWalletGraphic'

const WalletSetupCompleteView = ({ navigation, route }) => {
  const { colors, dimensions } = useTheme()

  const styles = StyleSheet.create({
    screen: {
      justifyContent: 'space-between',
      flex: 1
    },
    graphicContainer: {
      alignItems: 'center'
    },
    headerText: {
      fontSize: 40,
      textAlign: dimensions.infoScreen.bodyText.textAlign,
      marginBottom: 40
    },
    paragraph: {
      paddingBottom: dimensions.verticalSpacingBetweenItems,
      textAlign: dimensions.infoScreen.bodyText.textAlign
    },
    important: {
      color: colors.primaryButton.backgroundColor
    },
    textBlock: {
      paddingBottom: dimensions.paddingVertical,
      textAlign: dimensions.infoScreen.bodyText.textAlign
    }
  })

  return (
    <Screen>
      <View style={styles.screen}>
        <View>
          <View style={styles.graphicContainer}>
            <WalletSetupCompleteGraphic />
          </View>
          <HeaderText style={styles.headerText}>
            {translate('success')}
          </HeaderText>
          <Text style={styles.textBlock}>
            <BodyText style={[styles.paragraph]}>{translate('walletSetupCompleteInfo1')} </BodyText>
          </Text>
          <Text style={styles.textBlock}>
            <BodyText style={[styles.paragraph]}>{translate('walletSetupCompleteInfo2')} </BodyText>
            <BodyText style={[styles.paragraph, styles.important]}>{translate('walletSetupCompleteInfo3')}</BodyText>
            <BodyText style={styles.paragraph}>{translate('walletSetupCompleteInfo4')}</BodyText>
          </Text>
        </View>
        <ActivityButton
          title={translate('done')}
          onPress={() => navigation.push('CreateNewWalletIntroView')}
        />
      </View>
    </Screen>
  )
}

export default WalletSetupCompleteView
