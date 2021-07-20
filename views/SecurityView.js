import * as React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import PktPalLogo from '../components/images/PktPalLogo'

const SecurityView = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        onPress={() => navigation.navigate('FirstView')}
        style={styles.fillScreen}
      >
        <View style={styles.screen}>
          <PktPalLogo />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
    flex: 1
  },
  fillScreen: {
    flex: 1
  },
  screen: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '20px',
    paddingVertical: '20px'
  },
  header: {
    fontSize: '2em',
    fontWeight: 'bold',
    paddingBottom: '12px'
  }
})

export default SecurityView
