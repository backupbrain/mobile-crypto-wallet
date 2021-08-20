import 'react-native-gesture-handler'
import React from 'react'
import HamburgerMenuButon from '../components/buttons/HamburgerMenuButton'
// import { createDrawerNavigator } from '@react-navigation/drawer'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from '@react-navigation/native'

// import HamburgerMenuButton from '../components/buttons/HamburgerMenuButton'
import translate from '../translations'

import SecurityView from '../views/SecurityView'
import FirstView from '../views/FirstView'
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
import TransactionSuccessView from '../views/send/TransactionSuccessView'
import ContactBookView from '../views/contacts/ContactBookView'
import EditContactView from '../views/contacts/EditContactView'
import Verify2FaDeviceView from '../views/2fa/Verify2FaDeviceView'
import Pair2FaDeviceView from '../views/2fa/Pair2FaDeviceView'
import ChangePinView from '../views/pin/ChangePinView'
import CreatePinView from '../views/pin/CreatePinView'
import LogOutView from '../views/LogOutView'
import PinLoginView from '../views/pin/PinLoginView'
import TransactionView from '../views/TransactionView'

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

const FirstViewSet = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName='FirstView'>
      <Stack.Screen
        name='FirstView'
        options={{ title: translate('first'), headerShown: false }}
        component={FirstView}
      />
      <Stack.Screen
        name='CreateNewWalletIntroView'
        options={{
          title: translate('newWalletIntro')
        }}
        component={NewWalletIntroView}
      />
      <Stack.Screen
        name='LoadExistingWalletIntroView'
        options={{
          title: translate('loadExistingWalletIntro')
        }}
        component={LoadExistingWalletIntroView}
      />
      <Stack.Screen
        name='CreateNewWalletView'
        options={{
          title: translate('createNewWallet')
        }}
        component={NewWalletView}
      />
      <Stack.Screen
        name='VerifyRecoveryPhraseView'
        options={{
          title: translate('verifyRecoveryPhrase')
        }}
        component={VerifyRecoveryPhraseView}
      />
      <Stack.Screen
        name='CreatePassphraseView'
        options={{
          title: translate('createPassphrase')
        }}
        component={CreatePassphraseView}
      />
      <Stack.Screen
        name='WalletCreatedView'
        options={{
          title: translate('walletCreated')
        }}
        component={WalletCreatedView}
      />
      <Stack.Screen
        name='CreatePinView'
        options={{
          title: translate('createPin')
        }}
        component={CreatePinView}
      />
    </Stack.Navigator>
  )
}

const WalletHomeViewSet = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName='WalletHomeView'>
      <Stack.Screen
        name='WalletHomeView'
        options={{
          title: translate('walletHome'),
          headerRight: () => <HamburgerMenuButon navigation={navigation} />
        }}
        component={WalletHomeView}
      />
      <Stack.Screen
        name='AddressView'
        options={{
          title: translate('address'),
          headerRight: () => <HamburgerMenuButon navigation={navigation} />
        }}
        component={AddressView}
      />
      <Stack.Screen
        name='TransactionView'
        options={{
          title: translate('transaction'),
          headerRight: () => <HamburgerMenuButon navigation={navigation} />
        }}
        component={TransactionView}
      />
    </Stack.Navigator>
  )
}

const SendCryptoViewSet = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName='SendFormView'>
      <Stack.Screen
        name='QrCodeScannerView'
        component={QrCodeScannerView}
        options={{
          title: translate('qrCodeScanner')
        }}
      />
      <Stack.Screen
        name='SendFormView'
        options={{
          title: translate('sendForm'),
          headerRight: () => <HamburgerMenuButon navigation={navigation} />
        }}
        component={SendFormView}
      />
      <Stack.Screen
        name='SendPreviewView'
        options={{
          title: translate('sendPreview'),
          headerRight: () => <HamburgerMenuButon navigation={navigation} />
        }}
        component={SendPreviewView}
      />
      <Stack.Screen
        name='ContactBookView'
        options={{
          title: translate('contactBook'),
          headerRight: () => <HamburgerMenuButon navigation={navigation} />
        }}
        component={ContactBookView}
      />
      <Stack.Screen
        name='TransactionSuccessView'
        options={{
          title: translate('transactionSucceeded'),
          headerRight: () => <HamburgerMenuButon navigation={navigation} />
        }}
        component={TransactionSuccessView}
      />
    </Stack.Navigator>
  )
}

const ChangePinViewSet = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName='ChangePinView'>
      <Stack.Screen
        name='ChangePinView'
        options={{
          title: translate('changePin'),
          headerRight: () => <HamburgerMenuButon navigation={navigation} />
        }}
        component={ChangePinView}
      />
    </Stack.Navigator>
  )
}

const ChangePassphraseViewSet = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName='ChangePassphraseView'>
      <Stack.Screen
        name='ChangePassphraseView'
        options={{
          title: translate('changePassphrase'),
          headerRight: () => <HamburgerMenuButon navigation={navigation} />
        }}
        component={ChangePassphraseView}
      />
    </Stack.Navigator>
  )
}

const RePair2FaDeviceViewSet = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName='ChangePassphraseView'>
      <Stack.Screen
        name='Pair2FaDeviceView'
        options={{
          title: translate('pair2FaDevice'),
          headerRight: () => <HamburgerMenuButon navigation={navigation} />
        }}
        component={Pair2FaDeviceView}
      />
      <Stack.Screen
        name='Verify2FaDeviceView'
        options={{
          title: translate('verify2FaDevice'),
          headerRight: () => <HamburgerMenuButon navigation={navigation} />
        }}
        component={Verify2FaDeviceView}
      />
    </Stack.Navigator>
  )
}

const ContactsViewSet = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName='ContactBookView'>
      <Stack.Screen
        name='ContactBookView'
        options={{
          title: translate('contactBook'),
          headerRight: () => <HamburgerMenuButon navigation={navigation} />
        }}
        component={ContactBookView}
      />
      <Stack.Screen
        name='EditContactView'
        options={{
          title: translate('editContact'),
          headerRight: () => <HamburgerMenuButon navigation={navigation} />
        }}
        component={EditContactView}
      />
    </Stack.Navigator>
  )
}

const LogOutViewSet = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName='LogOutView'>
      <Stack.Screen
        name='LogOutView'
        options={{
          title: translate('logOut'),
          headerRight: () => <HamburgerMenuButon navigation={navigation} />
        }}
        component={LogOutView}
      />
    </Stack.Navigator>
  )
}

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        {...props}
        label={translate('walletHome')}
        onPress={() => props.navigation.navigate('WalletHomeViewSet')}
      />
      <DrawerItem
        {...props}
        label={translate('changePin')}
        onPress={() => props.navigation.navigate('ChangePinView')}
      />
      <DrawerItem
        {...props}
        label={translate('changePassphrase')}
        onPress={() => props.navigation.navigate('ChangePassphraseViewSet')}
      />
      <DrawerItem
        {...props}
        label={translate('pair2FaDevice')}
        onPress={() => props.navigation.navigate('RePair2FaDeviceViewSet')}
      />
      <DrawerItem
        {...props}
        label={translate('contactBook')}
        onPress={() => props.navigation.navigate('ContactBookView')}
      />
      <DrawerItem
        {...props}
        label={translate('logOut')}
        onPress={() => props.navigation.navigate('LogOutViewSet')}
      />
    </DrawerContentScrollView>
  )
}

const DrawerNavigator = () => {
  // TODO: make sure drawer opens on right and has the right theme.
  // https://reactnavigation.org/docs/drawer-navigator/
  const { colors } = useTheme()
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerPosition: 'right'
      }}
    >
      <Drawer.Screen name='FirstViewSet' component={FirstViewSet} />
      <Drawer.Screen name='WalletHomeViewSet' component={WalletHomeViewSet} />

      <Drawer.Screen name='ChangePinViewSet' component={ChangePinViewSet} />
      <Drawer.Screen name='RePair2FaDeviceViewSet' component={RePair2FaDeviceViewSet} />
      <Drawer.Screen name='ChangePassphraseViewSet' component={ChangePassphraseViewSet} />
      <Drawer.Screen name='ContactsViewSet' component={ContactsViewSet} />
      <Drawer.Screen name='LogOutViewSet' component={LogOutViewSet} />
      <Drawer.Screen name='SendCryptoView' component={SendCryptoViewSet} />

      <Stack.Screen
        name='SecurityView'
        options={{ title: translate('security'), headerShown: false }}
        component={SecurityView}
      />
      <Stack.Screen
        name='PinLoginView'
        options={{ title: translate('pinLogin'), headerShown: false }}
        component={PinLoginView}
      />
    </Drawer.Navigator>
  )
}

/*
const AppNavigator = (props) => {
  return <DrawerNavigator />
}
/* */

const AppNavigator = (props) => {
  if (props.state.match(/inactive|background/)) {
    return <SecurityView />
  } else {
    return (
      <DrawerNavigator />
    )
  }
}

export default AppNavigator
