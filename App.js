import React, { useEffect, useRef, useState, useReducer } from 'react'
import { AppState } from 'react-native'
import { registerRootComponent } from 'expo'
import { setI18nConfig } from './translations'
import * as RNLocalize from 'react-native-localize'
import { SafeAreaProvider } from 'react-native-safe-area-context'
// import { useIsDrawerOpen } from '@react-navigation/drawer';

import AppNavigator from './navigation/AppNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { AnodeDarkTheme, AnodeLightTheme } from './themes/AnodeThemes'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance'

import PktPriceTicker from './utils/PktPriceTicker'

export default function App () {
  const [pktPriceTimeout, setPktPriceTimeout] = useState(null)
  const pktPriceTicker = useRef(new PktPriceTicker())

  const scheme = useColorScheme()
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  const appState = useRef(AppState.currentState)
  const [appStateVisible, setAppStateVisible] = useState(appState.current)
  setI18nConfig()

  const handleLocalizationChange = () => {
    setI18nConfig()
      .then(() => forceUpdate())
      .catch(error => {
        console.error(error)
      })
  }

  const onAppStateChange = (nextAppState) => {
    appState.current = nextAppState
    setAppStateVisible(appState.current)
  }

  useEffect(() => {
    const setupPktPriceTimout = async () => {
      const pktPriceTimeout = setTimeout(() => {
        const updatePktPriceAsync = async () => {
          await pktPriceTicker.current.fetchSpotPrice(pktPriceTicker.current.getUserFiatCurrency())
        }
        updatePktPriceAsync()
      }, PktPriceTicker.UPDATE_FREQUENCY_S * 1000)
      setPktPriceTimeout(pktPriceTimeout)
      await pktPriceTicker.current.fetchSpotPrice(pktPriceTicker.current.getUserFiatCurrency())
    }
    if (!pktPriceTimeout) {
      setupPktPriceTimout()
    }

    // Update the document title using the browser API
    RNLocalize.addEventListener('change', handleLocalizationChange)

    // change tha app state when switching away from the app
    AppState.addEventListener('change', onAppStateChange)
    return () => {
      AppState.removeEventListener('change', onAppStateChange)
    }
  }, [pktPriceTicker, setPktPriceTimeout])

  return (
    <AppearanceProvider>
      <SafeAreaProvider>
        <NavigationContainer theme={scheme === 'dark' ? AnodeDarkTheme : AnodeLightTheme}>
          <AppNavigator state={appStateVisible} />
        </NavigationContainer>
      </SafeAreaProvider>
    </AppearanceProvider>
  )
}

registerRootComponent(App)
