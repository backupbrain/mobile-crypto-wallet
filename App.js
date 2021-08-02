import React, { useEffect, useReducer } from 'react'
import { registerRootComponent } from 'expo'
import translate, { setI18nConfig } from './translations'
import * as RNLocalize from 'react-native-localize'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import NavMenuButton from './components/buttons/NavMenuButton'

import SecurityView from './views/SecurityView'
import FirstView from './views/FirstView.js'
import NewWalletView from './views/createwallet/NewWalletView'
import NewWalletIntroView from './views/createwallet/NewWalletIntroView'
import LoadExistingWalletIntroView from './views/createwallet/LoadExistingWalletIntroView'
import VerifyRecoveryPhraseView from './views/createwallet/VerifyRecoveryPhraseView'
import CreatePassphraseView from './views/passphrase/CreatePassphraseView'
import ChangePassphraseView from './views/passphrase/ChangePassphraseView'
import WalletCreatedView from './views/createwallet/WalletCreatedView'
import WalletHomeView from './views/WalletHomeView'
import AddressView from './views/AddressView'
import QrCodeScannerView from './views/QrCodeScannerView'
import SendFormView from './views/send/SendFormView'
import SendPreviewView from './views/send/SendPreviewView'
import ContactBookView from './views/contacts/ContactBookView'
import EditContactView from './views/contacts/EditContactView'
import Verify2FaDeviceView from './views/2fa/Verify2FaDeviceView'
import Pair2FaDeviceView from './views/2fa/Pair2FaDeviceView'
import Pair2FaDeviceBackupCodesView from './views/2fa/Pair2FaDeviceBackupCodesView'
import ChangePinView from './views/pin/ChangePinView'
import CreatePinView from './views/pin/CreatePinView'
import LogOutView from './views/LogOutView'
import PinLoginView from './views/pin/PinLoginView'
// import { useIsDrawerOpen } from '@react-navigation/drawer';

// You can import from local files
import { NavigationContainer } from '@react-navigation/native'
import { AnodeDarkTheme, AnodeLightTheme } from './themes/AnodeThemes'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

export default function App () {
  const scheme = useColorScheme()
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  setI18nConfig()

  const handleLocalizationChange = () => {
    setI18nConfig()
      .then(() => forceUpdate())
      .catch(error => {
        console.error(error)
      })
  }

  useEffect(() => {
    // Update the document title using the browser API
    RNLocalize.addEventListener('change', handleLocalizationChange)
  })

  return (
    <AppearanceProvider>
      <SafeAreaProvider>
        <NavigationContainer theme={scheme === 'dark' ? AnodeDarkTheme : AnodeLightTheme}>
          <Stack.Navigator>
            <Stack.Screen
              name='Pair2FaDeviceView'
              options={{ title: translate('pair2FaDevice'), headerRight: () => <NavMenuButton /> }}
              component={Pair2FaDeviceView}
            />
            <Stack.Screen
              name='Verify2FaDeviceView'
              options={{ title: translate('verify2FaDevice'), headerRight: () => <NavMenuButton /> }}
              component={Verify2FaDeviceView}
            />

            <Stack.Screen
              name='FirstView'
              options={{ title: translate('first'), headerShown: false }}
              component={FirstView}
            />
            <Stack.Screen
              name='SecurityView'
              options={{ title: translate('security'), headerShown: false }}
              component={SecurityView}
            />
            <Stack.Screen
              name='CreateNewWalletIntroView'
              options={{ title: translate('newWalletIntro'), headerRight: () => <NavMenuButton /> }}
              component={NewWalletIntroView}
            />
            <Stack.Screen
              name='LoadExistingWalletIntroView'
              options={{ title: translate('loadExistingWalletIntro'), headerRight: () => <NavMenuButton /> }}
              component={LoadExistingWalletIntroView}
            />
            <Stack.Screen
              name='CreateNewWalletView'
              options={{ title: translate('createNewWallet'), headerRight: () => <NavMenuButton /> }}
              component={NewWalletView}
            />
            <Stack.Screen
              name='VerifyRecoveryPhraseView'
              options={{ title: translate('verifyRecoveryPhrase'), headerRight: () => <NavMenuButton /> }}
              component={VerifyRecoveryPhraseView}
            />
            <Stack.Screen
              name='CreatePassphraseView'
              options={{ title: translate('createPassphrase'), headerRight: () => <NavMenuButton /> }}
              component={CreatePassphraseView}
            />
            <Stack.Screen
              name='WalletCreatedView'
              options={{ title: translate('walletCreated'), headerRight: () => <NavMenuButton /> }}
              component={WalletCreatedView}
            />

            <Stack.Screen
              name='WalletHomeView'
              options={{ title: translate('walletHome'), headerRight: () => <NavMenuButton /> }}
              component={WalletHomeView}
            />

            <Stack.Screen
              name='AddressView'
              options={{ title: translate('address'), headerRight: () => <NavMenuButton /> }}
              component={AddressView}
            />
            <Stack.Screen
              name='QrCodeScannerView'
              options={{ title: translate('qrCodeScanner'), headerRight: () => <NavMenuButton /> }}
              component={QrCodeScannerView}
            />
            <Stack.Screen
              name='SendFormView'
              options={{ title: translate('sendForm'), headerRight: () => <NavMenuButton /> }}
              component={SendFormView}
            />
            <Stack.Screen
              name='SendPreviewView'
              options={{ title: translate('sendPreview'), headerRight: () => <NavMenuButton /> }}
              component={SendPreviewView}
            />
            <Stack.Screen
              name='CreatePinView'
              options={{ title: translate('createPin'), headerRight: () => <NavMenuButton /> }}
              component={CreatePinView}
            />
            <Stack.Screen
              name='ChangePinView'
              options={{ title: translate('changePin'), headerRight: () => <NavMenuButton /> }}
              component={ChangePinView}
            />
            <Stack.Screen
              name='Pair2FaDeviceBackupCodesView'
              options={{ title: translate('pair2FaDeviceBackupCode'), headerRight: () => <NavMenuButton /> }}
              component={Pair2FaDeviceBackupCodesView}
            />


            <Stack.Screen
              name='EditContactView'
              options={{ title: translate('editContact'), headerRight: () => <NavMenuButton /> }}
              component={EditContactView}
            />
            <Stack.Screen
              name='ContactBookView'
              options={{ title: translate('contactBook'), headerRight: () => <NavMenuButton /> }}
              component={ContactBookView}
            />
            <Stack.Screen
              name='ChangePassphraseView'
              options={{ title: translate('changePassphrase'), headerRight: () => <NavMenuButton /> }}
              component={ChangePassphraseView}
            />
            <Stack.Screen
              name='PinLoginView'
              options={{ title: translate('pinLogin'), headerShown: false }}
              component={PinLoginView}
            />
            <Stack.Screen
              name='LogOutView'
              options={{ title: translate('logOut'), headerRight: () => <NavMenuButton /> }}
              component={LogOutView}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </AppearanceProvider>
  )
}

registerRootComponent(App)
