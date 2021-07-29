import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ActiveButton from '../../components/buttons/ActiveButton'
import GenericTextInput from '../../components/inputs/GenericTextInput'
import PktAddressInput from '../../components/inputs/PktAddressInput'
import ContactManager, { Contact } from '../../utils/ContactManager'
import translate from '../../translations'

const EditContactView = ({ navigation, route }) => {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [isAddressValid, setIsAddressValid] = useState(false)
  const [isFormFilled, setIsFormFilled] = useState(false)
  const [isNew, setIsNew] = useState(false)
  const [allowDelete, setAllowDelete] = useState(false)
  useEffect(() => {
    if (route.params && route.params.address) {
      setName(route.params.address.name)
      setAddress(route.params.address.address)
      setIsNew(true)
      if (!route.params.address.isLocal) {
        setAllowDelete(true)
      }
      // TODO: verify if address is valid
      const isAddressValid = true
      updateIsFormFilled(
        route.params.address.name,
        route.params.address.address,
        isAddressValid
      )
    }
  }, [setName, setAddress, setIsNew, setAllowDelete, route])
  const updateName = (text) => {
    const strippedText = text.replace(/^\s+|\s+$/g, '')
    setName(strippedText)
    updateIsFormFilled(strippedText, address, isAddressValid)
  }
  const updateAddress = (text) => {
    const strippedText = text.replace(/^\s+|\s+$/g, '')
    setAddress(strippedText)
  }
  const updateIsAddressValid = (name, address, isAddressValid) => {
    setAddress(address)
    setIsAddressValid(isAddressValid)
    updateIsFormFilled(name, address, isAddressValid)
  }
  const updateIsFormFilled = (name, address, isAddressValid) => {
    if (name.length > 0 && address.length > 0 && isAddressValid) {
      setIsFormFilled(true)
    } else {
      setIsFormFilled(false)
    }
  }
  const constructContact = () => {
    return new Contact(name, address)
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.screenPadding}>
          <View style={styles.formContainer}>
            <GenericTextInput
              placeholder={translate('addressName')}
              onChangeText={(text) => {
                updateName(text)
              }}
              value={name}
            />
            <PktAddressInput
              placeholder={translate('pktAddress')}
              help='0 characters remaining'
              navigation={navigation}
              onValid={(address, isValid) => {
                updateIsAddressValid(name, address, isValid)
              }}
              initialValue={address}
            />
          </View>
          <ActiveButton
            title='Save Address'
            disabled={!isFormFilled}
            onPress={() => {
              ContactManager.save(constructContact())
              navigation.push('ContactBookView', { contactSaved: true })
            }}
          />
          {allowDelete &&
            <ActiveButton
              title='Delete Address'
              variant='danger'
              onPress={() => {
                ContactManager.remove(constructContact())
                navigation.goBack()
              }}
            />}
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
    paddingVertical: '16px'
  },
  formContainer: {
    marginBottom: '5px'
  },
  screenPadding: {
    width: '100%',
    paddingHorizontal: '20px'
  }
})

export default EditContactView
