import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import Screen from '../../components/Screen'
import BodyText from '../../components/text/BodyText'
import ActivityButton from '../../components/buttons/ActiveButton'
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
    <Screen>
      <View style={styles.screen}>
        <View style={styles.textBlock}>
          <BodyText style={styles.paragraph}>{translate('walletCreatedIntro1')}</BodyText>
          <BodyText>{translate('walletCreatedIntro2')}</BodyText>
        </View>
        <ActivityButton
          title={translate('viewWalletBalance')}
          onPress={() => navigation.navigate('WalletHomeView', { reset: true })}
        />
      </View>
    </Screen>
  )
}

export default WalletCreatedView
