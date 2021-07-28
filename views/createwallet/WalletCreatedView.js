import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ActivityButton from '../../components/buttons/ActiveButton'
import translate from '../../translations'

const WalletCreatedView = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.textBlock}>
          <Text style={styles.text}>{translate('walletCreatedIntro1')}</Text>
          <Text style={styles.text}>{translate('walletCreatedIntro2')}</Text>
        </View>
        <ActivityButton
          title={translate('viewWalletBalance')}
          onPress={() => navigation.navigate('WalletHomeView', { reset: true })}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
    flex: 1
  },
  screen: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: '20px',
    paddingVertical: '20px'
  },
  header: {
    fontSize: '2em',
    fontWeight: 'bold',
    paddingBottom: '12px'
  },
  textBlock: {
    paddingBottom: '12px',
    width: '100%'
  },
  text: {
    textAlign: 'left',
    paddingBottom: '8px'
  }
})

export default WalletCreatedView
