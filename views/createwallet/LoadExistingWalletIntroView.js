import React from 'react'
import { View, StyleSheet } from 'react-native'
import Screen from '../../components/Screen'
import ActivityButton from '../../components/buttons/ActiveButton'
import BodyText from '../../components/text/BodyText'
import translate from '../../translations'
import { useTheme } from '@react-navigation/native'

const LoadExistingWalletIntroView = ({ navigation, route }) => {
  const { dimensions } = useTheme()

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'space-between'
    },
    paragraph: {
      paddingBottom: dimensions.verticalSpacingBetweenItems
    },
    textBlock: {
      paddingBottom: dimensions.paddingVertical
    }
  })

  return (
    <Screen>
      <View style={styles.screen}>
        <View style={styles.textBlock}>
          <BodyText style={styles.paragraph}>{translate('loadExistingWalletIntro1')}</BodyText>
          <BodyText>{translate('loadExistingWalletIntro2')}</BodyText>
        </View>
        <View style={styles.button}>
          <ActivityButton
            title={translate('continueToRecoveryPhrase')}
            onPress={() => navigation.push('EnterSeedPhraseView')}
          />
        </View>
      </View>
    </Screen>
  )
}

export default LoadExistingWalletIntroView
