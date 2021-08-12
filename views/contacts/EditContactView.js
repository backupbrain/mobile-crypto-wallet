import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View, Keyboard } from 'react-native'
import Screen from '../../components/Screen'
import ActiveButton from '../../components/buttons/ActiveButton'
import GenericTextInput from '../../components/inputs/GenericTextInput'
import PktAddressInput from '../../components/inputs/PktAddressInput'
import ContactManager from '../../utils/ContactManager'
import PktManager from '../../utils/PktManager'
import translate from '../../translations'
import { useTheme } from '@react-navigation/native'

const EditContactView = ({ navigation, route }) => {
  const { dimensions } = useTheme()
  const contactManager = useRef(new ContactManager())
  const [areContactsLoaded, setAreContactsLoaded] = useState(false)
  const [name, setName] = useState(route?.params?.name ?? '')
  const [address, setAddress] = useState(route?.params?.address ?? '')
  const [startingAddress, setStartingAddress] = useState(route?.params?.address ?? '')
  const [isAddressValid, setIsAddressValid] = useState(false)
  const [allowDelete, setAllowDelete] = useState(true)
  useEffect(() => {
    if (route.params && route.params.address) {
      if (route.params.isLocal) {
        setAllowDelete(false)
      }
      let isAddressValid = false
      if (route.params.address) {
        isAddressValid = PktManager.isValidAddress(route.params.address)
      }
      setIsAddressValid(isAddressValid)
    } else {
      setAllowDelete(false)
    }
  }, [setName, setAddress, setAllowDelete, contactManager, route])

  useEffect(() => {
    const loadContacts = async () => {
      if (!areContactsLoaded) {
        await contactManager.current.initialize()
        setAreContactsLoaded(true) // prevent race condition on save()
      }
    }
    loadContacts()
  }, [areContactsLoaded, setAreContactsLoaded])

  const updateName = (text) => {
    const strippedText = text.replace(/^\s+|\s+$/g, '')
    setName(strippedText)
  }
  const updateIsAddressValid = (name, address, isAddressValid) => {
    setAddress(address)
    setIsAddressValid(isAddressValid)
  }

  const updateAddressAndNavigateBack = async (name, address) => {
    await contactManager.current.remove(startingAddress)
    await contactManager.current.add(name, address)
    await contactManager.current.save()
    setStartingAddress(address)
    navigation.navigate('ContactBookView', { contactSaved: true })
  }

  const deleteAddressAndNavigateBack = async (address) => {
    await contactManager.current.remove(address)
    await contactManager.current.save()
    navigation.navigate('ContactBookView', { contactSaved: true })
  }

  const disableHandler = () => {
    let isDisabled = true
    if (name && name.length > 0 && address.length > 0 && isAddressValid) {
      isDisabled = false
    } else {
      isDisabled = true
    }
    return isDisabled
  }

  const styles = StyleSheet.create({
    screen: {
      paddingHorizontal: dimensions.screen.paddingHorizontal,
      paddingVertical: dimensions.screen.paddingVertical
    },
    formContainer: {
      marginBottom: 5
    },
    nameInput: {
      paddingBottom: dimensions.paddingVertical
    },
    addressInput: {
      paddingBottom: dimensions.paddingVertical
    },
    lastButton: {
      paddingTop: dimensions.paddingVertical
    }
  })

  return (
    <Screen>
      <View style={styles.screen}>
        <View
          style={styles.formContainer}
          onBlur={() => {
            Keyboard.dismiss()
          }}
        >
          <GenericTextInput
            label={translate('addressName')}
            style={styles.nameInput}
            placeholder={translate('addressName')}
            onChangeText={(text) => {
              updateName(text)
            }}
            value={name}
            initialValue={name}
          />
          <PktAddressInput
            label={translate('address')}
            style={styles.addressInput}
            placeholder={translate('pktAddress')}
            navigation={navigation}
            onChangeText={(address, isValid) => {
              updateIsAddressValid(name, address, isValid)
            }}
            address={address}
          />
        </View>
        <ActiveButton
          style={styles.button}
          title={translate('saveAddress')}
          disabled={disableHandler()}
          onPress={async () => {
            updateAddressAndNavigateBack(name, address)
          }}
        />
        {allowDelete && (
          <ActiveButton
            style={styles.lastButton}
            title={translate('deleteAddress')}
            variant='danger'
            onPress={() => {
              deleteAddressAndNavigateBack(address)
            }}
          />
        )}
      </View>
    </Screen>
  )
}

export default EditContactView
