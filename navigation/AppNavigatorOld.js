import 'react-native-gesture-handler'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
// import HamburgerMenuButton from '../components/buttons/HamburgerMenuButton'
import translate from '../translations'

import SecurityView from '../views/SecurityView'
import FirstView from '../views/FirstView.js'
import NewWalletView from '../views/createwallet/NewWalletView'
import NewWalletIntroView from '../views/createwallet/NewWalletIntroView'
import LoadExistingWalletIntroView from '../views/createwallet/LoadExistingWalletIntroView'
import VerifyRecoveryPhraseView from '../views/createwallet/VerifyRecoveryPhraseView'
import CreatePassphraseView from '../views/passphrase/CreatePassphraseView'
import ChangePassphraseView from '../views/passphrase/ChangePassphraseView'
import WalletCreatedView from '../views/createwallet/WalletCreatedView'
import WalletHomeView from '../views/WalletHomeView'
import AddressView from '../views/AddressView'
import QrCodeScannerView from '../views/QrCodeScannerView'
import SendFormView from '../views/send/SendFormView'
import SendPreviewView from '../views/send/SendPreviewView'
import ContactBookView from '../views/contacts/ContactBookView'
import EditContactView from '../views/contacts/EditContactView'
import Verify2FaDeviceView from '../views/2fa/Verify2FaDeviceView'
import Pair2FaDeviceView from '../views/2fa/Pair2FaDeviceView'
import Pair2FaDeviceBackupCodesView from '../views/2fa/Pair2FaDeviceBackupCodesView'
import ChangePinView from '../views/pin/ChangePinView'
import CreatePinView from '../views/pin/CreatePinView'
import LogOutView from '../views/LogOutView'
import PinLoginView from '../views/pin/PinLoginView'

const MainNavigator = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <MainNavigator.Navigator>
      <MainNavigator.Screen
        name='FirstView'
        options={{ title: translate('first') }}
        component={FirstView}
      />
      <MainNavigator.Screen
        name='SecurityView'
        options={{ title: translate('security'), headerShown: false }}
        component={SecurityView}
      />
      <MainNavigator.Screen
        name='CreateNewWalletIntroView'
        options={{ title: translate('newWalletIntro') }}
        component={NewWalletIntroView}
      />
      <MainNavigator.Screen
        name='LoadExistingWalletIntroView'
        options={{ title: translate('loadExistingWalletIntro') }}
        component={LoadExistingWalletIntroView}
      />
      <MainNavigator.Screen
        name='CreateNewWalletView'
        options={{ title: translate('createNewWallet') }}
        component={NewWalletView}
      />
      <MainNavigator.Screen
        name='VerifyRecoveryPhraseView'
        options={{ title: translate('verifyRecoveryPhrase') }}
        component={VerifyRecoveryPhraseView}
      />
      <MainNavigator.Screen
        name='CreatePassphraseView'
        options={{ title: translate('createPassphrase') }}
        component={CreatePassphraseView}
      />
      <MainNavigator.Screen
        name='WalletCreatedView'
        options={{ title: translate('walletCreated') }}
        component={WalletCreatedView}
      />
      <MainNavigator.Screen
        name='WalletHomeView'
        options={{ title: translate('walletHome') }}
        component={WalletHomeView}
      />
      <MainNavigator.Screen
        name='AddressView'
        options={{ title: translate('address') }}
        component={AddressView}
      />
      <MainNavigator.Screen
        name='QrCodeScannerView'
        options={{ title: translate('qrCodeScanner') }}
        component={QrCodeScannerView}
      />
      <MainNavigator.Screen
        name='SendFormView'
        options={{ title: translate('sendForm') }}
        component={SendFormView}
      />
      <MainNavigator.Screen
        name='SendPreviewView'
        options={{ title: translate('sendPreview') }}
        component={SendPreviewView}
      />
      <MainNavigator.Screen
        name='CreatePinView'
        options={{ title: translate('createPin') }}
        component={CreatePinView}
      />
      <MainNavigator.Screen
        name='ChangePinView'
        options={{ title: translate('changePin') }}
        component={ChangePinView}
      />
      <MainNavigator.Screen
        name='Pair2FaDeviceBackupCodesView'
        options={{ title: translate('pair2FaDeviceBackupCode') }}
        component={Pair2FaDeviceBackupCodesView}
      />
      <MainNavigator.Screen
        name='Pair2FaDeviceView'
        options={{ title: translate('pair2FaDevice') }}
        component={Pair2FaDeviceView}
      />
      <MainNavigator.Screen
        name='Verify2FaDeviceView'
        options={{ title: translate('verify2FaDevice') }}
        component={Verify2FaDeviceView}
      />
      <MainNavigator.Screen
        name='EditContactView'
        options={{ title: translate('editContact') }}
        component={EditContactView}
      />
      <MainNavigator.Screen
        name='ContactBookView'
        options={{ title: translate('contactBook') }}
        component={ContactBookView}
      />
      <MainNavigator.Screen
        name='ChangePassphraseView'
        options={{ title: translate('changePassphrase') }}
        component={ChangePassphraseView}
      />
      <MainNavigator.Screen
        name='PinLoginView'
        options={{ title: translate('pinLogin'), headerShown: false }}
        component={PinLoginView}
      />
      <MainNavigator.Screen
        name='LogOutView'
        options={{ title: translate('logOut') }}
        component={LogOutView}
      />
    </MainNavigator.Navigator>
  )
}

const AppNavigator = (props) => {
  return <DrawerNavigator />
}

export default AppNavigator
