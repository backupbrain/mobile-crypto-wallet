import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Screen from '../../components/Screen'
import SecureWalletGraphic from '../../components/images/SecureWalletGraphic'
import ActivityButton from '../../components/buttons/ActiveButton'
import BodyText from '../../components/text/BodyText'
import { useTheme } from '@react-navigation/native'
import translate from '../../translations'
// import SecureWalletGraphic from '../../components/images/SecureWalletGraphic'

const CreateWalletIntroView = ({ navigation, route }) => {
  const { dimensions } = useTheme()

  const styles = StyleSheet.create({
    screen: {
      justifyContent: 'space-between',
      flex: 1
    },
    paragraph: {
      paddingBottom: dimensions.verticalSpacingBetweenItems,
      textAlign: dimensions.infoScreen.bodyText.textAlign
    },
    important: {
      fontWeight: 'bold'
    },
    textBlock: {
      paddingBottom: dimensions.paddingVertical,
      textAlign: 'center'
    }
  })

  return (
    <Screen>
      <View style={styles.screen}>
        <View>
          <SecureWalletGraphic />
          <Text style={styles.textBlock}>
            <BodyText style={[styles.paragraph]}>{translate('secureYourWalletInfo1')} </BodyText>
            <BodyText style={[styles.paragraph, styles.important]}>{translate('secureYourWalletInfo2')}</BodyText>
          </Text>
        </View>
        <ActivityButton
          title={translate('startSecuringYourWallet')}
          onPress={() => navigation.push('CreateNewWalletIntroView')}
        />
      </View>
    </Screen>
  )
}

export default CreateWalletIntroView
