import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Screen from '../../components/Screen'
import HeaderText from '../../components/text/HeaderText'
import BodyText from '../../components/text/BodyText'
import DotDashPinInput from '../../components/inputs/DotDashPinInput'
import PinPad from '../../components/buttons/PinPad'
import translate from '../../translations'
import PinManager from '../../utils/PinManager'
import { useTheme } from '@react-navigation/native'

const PinLoginView = ({ navigation, route }) => {
  const { dimensions } = useTheme()
  const pinManager = useRef(new PinManager())
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
  }, [setActiveView])

  const styles = StyleSheet.create({
    screen: {
      paddingHorizontal: dimensions.screen.paddingHorizontal,
      paddingVertical: dimensions.screen.paddingVertical,
      flex: 1,
      border: '1px solid #fff'
    },
    container: {
      paddingHorizontal: dimensions.screen.paddingHorizontal,
      paddingVertical: dimensions.screen.paddingVertical,
      flex: 1
    },
    header: {
      paddingBottom: dimensions.paddingVertical
    },
    text: {
      paddingBottom: dimensions.paddingVertical
    },
    flexibleTop: {
      flexGrow: 1
    },
    bottomAlign: {
      justifyContent: 'flex-end'
    }
  })

  return (
    <Screen>
      <View style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.flexibleTop}>
            <HeaderText style={styles.header}>{translate('pinLogin')}</HeaderText>
            <BodyText style={styles.text}>{translate('pinLoginIntro1')}</BodyText>
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
    </Screen>
  )
}

export default PinLoginView
