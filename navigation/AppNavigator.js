import 'react-native-gesture-handler'
import React, { useEffect, useRef, useState } from 'react'
import HamburgerMenuButon from '../components/buttons/HamburgerMenuButton'
// import { createDrawerNavigator } from '@react-navigation/drawer'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, useNavigationState, useTheme } from '@react-navigation/native'

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
import ChangePinView from '../views/pin/ChangePinView'
import CreatePinView from '../views/pin/CreatePinView'
import LogOutView from '../views/LogOutView'
import PinLoginView from '../views/pin/PinLoginView'
import TransactionView from '../views/TransactionView'
import PktManager from '../utils/PktManager'
import PassphraseManager from '../utils/PassphraseManager'
import PinManager from '../utils/PinManager'
import { Text } from 'react-native'
import WalletPassphraseView from '../views/createwallet/WalletPassphraseView'
import { useDispatch } from 'react-redux'
import { securityDisable, securityEnable } from '../store/SecurityAction'
import NewWalletIntroView2 from '../views/createwallet/NewWalletIntroView2'
import RequestView from '../views/RequestView'
import TabNavigatorButtons from '../components/Tabs/TabNavigatorButtons'

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={props => <TabNavigatorButtons {...props} />}
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen
        name="Home"
        component={WalletHomeViewSet}
        options={{
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={ContactsViewSet}
        options={{
        }}
      />
      <Tab.Screen
        name="Settings"
        component={WalletHomeViewSet}
        options={{
        }}
      />
    </Tab.Navigator>
  );
}

const FirstViewSet = ({ navigation }) => {
  const { dimensions } = useTheme()
  const [initialRoute, setInitialRoute] = useState('')
  const WalletManager = useRef(new PktManager())
  const PassPhraseManager = useRef(new PassphraseManager())
  const pinManager = useRef(new PinManager())
  const navigationState = useNavigationState(state => state)

  const PinCheck = () => {
    pinManager.current.get().then(async pin => {
      if (pin) {
        const logoutTimeExpired = await PinManager.hasLogoutTimeExpired()
        if (logoutTimeExpired)
          navigation.navigate('PinLoginView', { navigationState })
        else
          navigation.navigate('WalletHomeViewSet')
      } else {
        setInitialRoute('CreatePinView')
      }
    })
  }

  const PassPhraseCheck = () => {
    PassPhraseManager.current.get().then(pass => {
      if (pass) {
        PinCheck()
      } else {
        setInitialRoute('CreatePassphraseView')
      }
    })
  }

  useEffect(() => {
    WalletManager.current.getAddresses()
      .then(wallets => {
        if (wallets.length !== 0) {
          PassPhraseCheck()
        } else {
          setInitialRoute('FirstView')
        }
      })
  }, [])

  if (!initialRoute)
    return <SecurityView />

  return (
    <Stack.Navigator initialRouteName={initialRoute}
      screenOptions={{
        headerTitleAlign: 'center',
        header: (props) => <Header {...props} />,
      }}>

      <Stack.Screen
        name='FirstView'
        options={{ title: translate('first') }}
        component={FirstView}
      />
      <Stack.Screen
        name='CreateNewWalletIntroView'
        options={{
          title: translate('newWalletIntro')
        }}
        component={NewWalletIntroView2}
      />
      <Stack.Screen
        name='LoadExistingWalletIntroView'
        options={{
          title: translate('loadExistingWalletIntro'),
          headerTitleContainerStyle: {
            paddingVertical: dimensions.headers.vertical,
            paddingHorizontal: dimensions.headers.horizontal
          },
          headerStyle: {
            height: 'auto'
          }
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
          title: translate('createPassphrase'),
          progressShown: true,
          progressActiveStep: 0,
          progressSteps: 4
        }}
        component={CreatePassphraseView}
        initialParams={{ firstScreen: true }}
      />
      <Stack.Screen
        name='WalletPassphraseView'
        options={{
          title: translate('enterWalletPassphrase')
        }}
        component={WalletPassphraseView}
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
          title: translate('createPin'),
          progressShown: true,
          progressActiveStep: 1,
          progressSteps: 4
        }}
        component={CreatePinView}
        initialParams={{ firstScreen: true }}
      />
      <Stack.Screen
        name='PinLoginView'
        options={{ title: translate('pinLogin'), headerShown: false }}
        component={PinLoginView}
      />
    </Stack.Navigator>
  )
}

const WalletHomeViewSet = ({ navigation }) => {
  const { dimensions } = useTheme()
  return (
    <Stack.Navigator initialRouteName='WalletHomeView'
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleContainerStyle: {
          paddingVertical: dimensions.headers.vertical,
          paddingHorizontal: dimensions.headers.horizontal
        },
        headerStyle: {
          height: 'auto'
        }
      }}>
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
        name='RequestView'
        options={{
          title: translate('request'),
          headerRight: () => <HamburgerMenuButon navigation={navigation} />
        }}
        component={RequestView}
      />
      <Stack.Screen
        name='TransactionView'
        options={{
          title: translate('transaction'),
          headerRight: () => <HamburgerMenuButon navigation={navigation} />
        }}
        component={TransactionView}
      />
      <Stack.Screen
        name='SendView'
        options={{
          title: translate('transaction'),
          headerRight: () => <HamburgerMenuButon navigation={navigation} />,
          headerShown: false
        }}
        component={SendCryptoViewSet}
      />
    </Stack.Navigator>
  )
}

const SendCryptoViewSet = ({ navigation }) => {
  const { dimensions } = useTheme()
  return (
    <Stack.Navigator initialRouteName='SendFormView'
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleContainerStyle: {
          paddingVertical: dimensions.headers.vertical,
          paddingHorizontal: dimensions.headers.horizontal
        },
        headerStyle: {
          height: 'auto'
        }
      }}>
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
  const { dimensions } = useTheme()
  return (
    <Stack.Navigator initialRouteName='ChangePinView'
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleContainerStyle: {
          paddingVertical: dimensions.headers.vertical,
          paddingHorizontal: dimensions.headers.horizontal
        },
        headerStyle: {
          height: 'auto'
        }
      }}>
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
  const { dimensions } = useTheme()
  return (
    <Stack.Navigator initialRouteName='ChangePassphraseView'
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleContainerStyle: {
          paddingVertical: dimensions.headers.vertical,
          paddingHorizontal: dimensions.headers.horizontal
        },
        headerStyle: {
          height: 'auto'
        }
      }}>
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

const ContactsViewSet = ({ navigation }) => {
  const { dimensions } = useTheme()
  return (
    <Stack.Navigator initialRouteName='ContactBookView'
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleContainerStyle: {
          paddingVertical: dimensions.headers.vertical,
          paddingHorizontal: dimensions.headers.horizontal
        },
        headerStyle: {
          height: 'auto'
        }
      }}>
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
  const { dimensions } = useTheme()
  return (
    <Stack.Navigator initialRouteName='LogOutView'
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleContainerStyle: {
          paddingVertical: dimensions.headers.vertical,
          paddingHorizontal: dimensions.headers.horizontal
        },
        headerStyle: {
          height: 'auto'
        }
      }}>
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
  const { colors } = useTheme()
  /*  const [security, setSecurity] = useState(props.security)
   const firstRender = useRef(true)
 
   useEffect(
     () => {
       console.log(security)
       console.log(props.navigation.getState())
       
       if(firstRender.current){
         firstRender.current=false
         return
       }
 
       setSecurity(props.security)
       
       if (props.security)
       props.navigation.navigate('SecurityView')
       else
       props.navigation.goBack()
       
 
     }, [props.security]) */

  return (
    <DrawerContentScrollView {...props}  >
      <DrawerItem
        {...props}
        label={({ focused, color }) => <Text style={{ color: colors.bodyText.color }}>Tabs Preview</Text>}
        onPress={() => props.navigation.navigate('Tabs')}
      />
      <DrawerItem
        {...props}
        label={({ focused, color }) => <Text style={{ color: colors.bodyText.color }}>{translate('walletHome')}</Text>}
        onPress={() => props.navigation.navigate('WalletHomeViewSet', { screen: 'WalletHomeView' })}
      />
      <DrawerItem
        {...props}
        label={({ focused, color }) => <Text style={{ color: colors.bodyText.color }}>{translate('changePin')}</Text>}
        onPress={() => props.navigation.navigate('ChangePinViewSet')}
      />
      <DrawerItem
        {...props}
        label={({ focused, color }) => <Text style={{ color: colors.bodyText.color }}>{translate('changePassphrase')}</Text>}
        onPress={() => props.navigation.navigate('ChangePassphraseViewSet')}
      />
      <DrawerItem
        {...props}
        label={({ focused, color }) => <Text style={{ color: colors.bodyText.color }}>{translate('contactBook')}</Text>}
        onPress={() => props.navigation.navigate('ContactsViewSet')}
      />
      <DrawerItem
        {...props}
        label={({ focused, color }) => <Text style={{ color: colors.bodyText.color }}>{translate('logOut')}</Text>}
        label={translate('logOut')}
        onPress={() => props.navigation.navigate('LogOutViewSet')}
      />
    </DrawerContentScrollView>
  )
}

const DrawerNavigator = (props) => {
  // TODO: make sure drawer opens on right and has the right theme.
  // https://reactnavigation.org/docs/drawer-navigator/
  const { colors } = useTheme()
  const pinManager = useRef(new PinManager())
  const navigation = useNavigation()
  const navigationState = useNavigationState(state => state)
  const dispatch = useDispatch()

  if (props.security)
    dispatch(securityEnable())
  else
    dispatch(securityDisable())

  useEffect(() => {
    const checkForLogoutExpiry = async () => {
      const logoutTimeExpired = await PinManager.hasLogoutTimeExpired()
      if (logoutTimeExpired) {
        pinManager.current.get().then(async pin => {
          if (pin) {
            navigation.navigate('PinLoginView', { navigationState })
          }
        })
      }
    }

    checkForLogoutExpiry()
  }, [props.security])

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerPosition: 'right',
        drawerStyle: {
          backgroundColor: colors.screen.backgroundColor,
          width: 210
        },
        drawerType: 'front',
        headerShown: false,
        swipeEdgeWidth: 0,
      }}
    >
      <Drawer.Screen name='FirstViewSet' component={FirstViewSet} />
      <Drawer.Screen name='WalletHomeViewSet' component={WalletHomeViewSet} />
      <Drawer.Screen name='Tabs' component={TabNavigator} />

      <Drawer.Screen name='ChangePinViewSet' component={ChangePinViewSet} />
      <Drawer.Screen name='ChangePassphraseViewSet' component={ChangePassphraseViewSet} />
      <Drawer.Screen name='ContactsViewSet' component={ContactsViewSet} />
      <Drawer.Screen name='LogOutViewSet' component={LogOutViewSet} />
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
  const navigationState = useNavigationState(state => state);

  if (props.state.match(/inactive|background/)) {
    if (navigationState && navigationState.routes[navigationState.index].name !== 'FirstViewSet')
      PinManager.saveTime()
  }

  return (
    <DrawerNavigator security={!!props.state.match(/inactive|background/)} />
  )

  /* if (props.state.match(/inactive|background/)) {
    if (navigationState && navigationState.routes[navigationState.index].name !== 'FirstViewSet')
      PinManager.saveTime()

    return <SecurityView />
  } else {
    return (
      <DrawerNavigator />
    )
  } */
}

export default AppNavigator
