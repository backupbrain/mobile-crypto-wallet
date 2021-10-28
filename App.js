import React, { useEffect, useRef, useState, useReducer } from 'react'
import { AppState, Linking, Platform } from 'react-native'
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
import AdaptiveStorage from './utils/AdaptiveStorage'
import AppConstants from './utils/AppConstants'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import { SecurityReducer } from './store/SecurityReducer'

const rootReducer = combineReducers({
  security: SecurityReducer
});

const store = createStore(rootReducer);

export default function App() {
  const [pktPriceTimeout, setPktPriceTimeout] = useState(null)
  const pktPriceTicker = useRef(new PktPriceTicker())
  const mountedRef = useRef(true)


  const scheme = useColorScheme()
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  const appState = useRef(AppState.currentState)
  const [appStateVisible, setAppStateVisible] = useState(appState.current)
  setI18nConfig()


  // DELETE
  /* const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();
  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        // TODO: DELETE true
        if (true || Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AdaptiveStorage.get(AppConstants.NAVIGATION_STATE_KEY);
          const state = savedStateString ? JSON.parse(savedStateString) : undefined;

          if (mountedRef.current && state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        if (mountedRef.current)
          setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }

    return () => {
      mountedRef.current = false
    }
  }, [isReady]); */

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

  // DELETE
  /* if (!isReady) {
    return null;

  } */

  return (
    <Provider store={store}>
      <AppearanceProvider>
        <SafeAreaProvider>
          <NavigationContainer
            // DELETE
            /* initialState={initialState}
            onStateChange={(state) => {
              if (state && state.routes[state.index].name !== 'SecurityView')
              AdaptiveStorage.set(AppConstants.NAVIGATION_STATE_KEY, JSON.stringify(state))
            }
          } */
            theme={scheme !== 'dark' ? AnodeDarkTheme : AnodeLightTheme} /* TODO : UNDO   */
          >
            <AppNavigator state={appStateVisible} />
          </NavigationContainer>
        </SafeAreaProvider>
      </AppearanceProvider>
    </Provider>
  )
}

registerRootComponent(App)
