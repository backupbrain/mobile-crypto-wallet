import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ActivityButton from '../../components/buttons/ActiveButton'
import BodyText from '../../components/text/BodyText'
import { useTheme } from '@react-navigation/native'
import translate from '../../translations'

const WalletCreatedView = ({ navigation, route }) => {
  const { dimensions } = useTheme()

  const styles = StyleSheet.create({
    screen: {
      paddingHorizontal: dimensions.screen.paddingHorizontal,
      paddingVertical: dimensions.screen.paddingVertical
    },
    paragraph: {
      paddingBottom: dimensions.verticalSpacingBetweenItems
    },
    textBlock: {
      paddingBottom: dimensions.paddingVertical
    }
  })

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.textBlock}>
          <BodyText style={styles.paragraph}>{translate('newWalletIntro1')}</BodyText>
          <BodyText style={styles.paragraph}>{translate('newWalletIntro2')}</BodyText>
          <BodyText>{translate('newWalletIntro3')}</BodyText>
        </View>
        <View style={styles.textBlock}>
          <BodyText style={styles.paragraph}>{translate('dontLoseTheseWords')}</BodyText>
          <BodyText>{translate('ifYouLoseTheseWords')}</BodyText>
        </View>
        <ActivityButton
          title={translate('continueToRecoveryPhrase')}
          onPress={() => navigation.push('CreateNewWalletView')}
        />
      </View>
    </SafeAreaView>
  )
}

export default WalletCreatedView
