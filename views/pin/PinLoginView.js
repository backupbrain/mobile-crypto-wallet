import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import DotDashPinInput from '../../components/inputs/DotDashPinInput'
import PinPad from '../../components/buttons/PinPad'
import translate from '../../translations'
import PinManager from '../../utils/PinManager'

const CreatePinView = ({ navigation, route }) => {
  const pinManager = new PinManager()
  const [activeView, setActiveView] = useState('WalletHomeView')
  const [pin, setPin] = useState('')
  const [isPinValid, setIsPinValid] = useState(null)
  const onKeyPress = (number) => {
    let newPin = pin + number
    if (newPin.length > 4) {
      newPin = newPin.substr(0, 4)
    }
    setPin(newPin)
    if (newPin.length === 4) {
      const isPinValid = pinManager.isValid(newPin)
      setIsPinValid(isPinValid)
      if (isPinValid) {
        navigation.navigate(activeView)
      } else {
        setPin('')
      }
    } else {
      setIsPinValid(null)
    }
    return newPin
  }
  const onBackspace = () => {
    let newPin = ''
    if (pin.length > 0) {
      newPin = pin.substr(0, pin.length - 1)
    }
    setPin(newPin)
  }
  useEffect(() => {
    // TODO: route to last-used page
    setActiveView('WalletHomeView')
  })
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.flexibleTop}>
            <Text style={styles.header}>{translate('pinLogin')}</Text>
            <Text style={styles.text}>{translate('pinLoginIntro1')}</Text>
          </View>
          <View style={styles.bottomAlign}>
            <DotDashPinInput pin={pin} error={isPinValid === false} />
            <PinPad
              onKeyPress={(number) => {
                onKeyPress(number)
              }}
              onDelete={() => {
                onBackspace()
              }}
            />
          </View>
        </View>
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
    justifyContent: 'flex-start'
  },
  container: {
    width: '100%',
    flex: 1,
    paddingHorizontal: '20px',
    paddingVertical: '20px'
  },
  header: {
    fontSize: '2em',
    fontWeight: 'bold',
    paddingBottom: '20px',
    textAlign: 'left'
  },
  text: {
    textAlign: 'left',
    paddingBottom: '20px'
  },
  flexibleTop: {
    flexGrow: 1
  },
  bottomAlign: {
    justifyContent: 'flex-end'
  }
})

export default CreatePinView
