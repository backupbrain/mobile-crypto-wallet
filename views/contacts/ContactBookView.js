import React, { useState, useEffect, useRef } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native'
import SearchInput from '../../components/inputs/SearchInput'
import ContactManager from '../../utils/ContactManager'
import PktManager from '../../utils/PktManager'
import ContactList from '../../components/contacts/ContactList'
import Screen from '../../components/Screen'
import PlusIcon from '../../components/images/PlusIcon'
import BodyText from '../../components/text/BodyText'
import { useTheme } from '@react-navigation/native'
import translate from '../../translations'
import Modal from '../../components/Modal'
import PktAddressInput from '../../components/inputs/PktAddressInput'
import GenericTextInput from '../../components/inputs/GenericTextInput'
import ActivityButton from '../../components/buttons/ActiveButton'
import ActiveButton from '../../components/buttons/ActiveButton'

const ContactBookView = ({ navigation, route }) => {
  const { colors, dimensions } = useTheme()
  const contactManager = useRef(new ContactManager())
  const pktManager = useRef(new PktManager())
  const [addresses, setAddresses] = useState([])
  const [searchFilter, setSearchFilter] = useState('')
  const [isInSelectorMode, setIsInSelectorMode] = useState(false)
  const [, setAreContactsLoaded] = useState(false)
  const [noSearchResults, setNoSearchResults] = useState(false)
  const [isLocalOnly, setIsLocalOnly] = useState(route.params?.localOnly)
  const [editAddress, setEditAddress] = useState({})
  const modal = useRef(null)
  /* const fetchMyAddress = async () => {
    // TODO: load this list from the pkd gRPC
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(myFakeAddresses)
      }, 1)
    })
  } */
  const buildContactList = async (myAddresses, contactManager) => {
    // force reload of contacts, which otherwise will pull previous list
    await contactManager.getAll()
    const contacts = [...contactManager.contacts]
    const formattedAddresses = []
    const lookup = contactManager.lookup
    const lookupByInitial = {}

    const formattedMyAddresses = {
      title: translate('myAddresses'),
      data: []
    }
    for (const row in myAddresses) {
      const myAddress = myAddresses[row]
      const myContact = await contactManager.getByAddress(myAddress.address)
      const mergedAddress = {
        address: myAddress.address,
        amount: myAddress.total,
        isLocal: true,
        name: null
      }
      if (myContact) {
        mergedAddress.name = myContact.name
        delete lookup[myAddress.address]
      }
      formattedMyAddresses.data.push(mergedAddress)
    }
    formattedAddresses.push(formattedMyAddresses)

    if (!isLocalOnly) {
      for (const lookupAddress in lookup) {
        const row = lookup[lookupAddress]
        const contact = contacts[row]
        const initial = contact.name.substr(0, 1).toUpperCase()
        if (!(initial in lookupByInitial)) {
          lookupByInitial[initial] = []
        }
        if (!(contact.address in myAddresses)) {
          lookupByInitial[initial].push(contact)
        }
      }
      // loop through initials
      for (const key in lookupByInitial) {
        const contacts = lookupByInitial[key]
        const contactGroup = {
          title: key,
          data: contacts
        }
        formattedAddresses.push(contactGroup)
      }
    }
    setAddresses(formattedAddresses)
    setAreContactsLoaded(true)
  }

  const styles = StyleSheet.create({
    screen: {
      paddingHorizontal: dimensions.screen.paddingHorizontal,
      paddingBottom: dimensions.screen.paddingHorizontal,
      flex: 1,
      justifyContent: 'space-between'
    },
    searchBar: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: dimensions.paddingVertical
    },
    searchInputContainer: {
      flex: 1
    },
    searchInput: {
    },
    addContactButtonContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: dimensions.paddingHorizontal
    },
    addButton: {
      flexShrink: 1,
      flexDirection: 'row'
    },
    noResult: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    contactListContainer: {
      paddingHorizontal: dimensions.horizontalSpacingBetweenItemsShort
    },
    newAddressText: {

    },
    addressInput: {
      paddingVertical: dimensions.paddingHorizontal
    },
    lastButton: {
      paddingBottom: dimensions.paddingVertical
    }
  })

  const loadContacts = async () => {
    await contactManager.current.initialize()
    const myAddresses = await pktManager.current.getAddresses()
    // REMOVE: DUMMY DATA ------------
    /* if (contactManager.current.contacts.length === 0) {
      await contactManager.current.clearAll()
      await contactManager.current.set(
        new Contact('John', 'pktdkgutlaktigstoskthsfgtpourhgtksdfhgtksfa')
      )
      await contactManager.current.set(
        new Contact('Natasha', 'pktikgutlaktigstoskhfgfgtpouogitksdfhgortb')
      )
    } */
    // --------------------------------
    buildContactList(myAddresses, contactManager.current)
  }

  useEffect(() => {
    if (route.params && route.params.selectorMode) {
      setIsInSelectorMode(route.params.selectorMode === true)
    }
    if (route.params && route.params.localOnly) {
      setIsLocalOnly(true)
    }
    loadContacts()
  }, [route, setIsInSelectorMode, contactManager, navigation])

  const filter = (addresses) => {
    if (!searchFilter) return addresses
    const filtered = []
    for (const index in addresses) {
      const data = addresses[index].data.filter(
        (data) => (
          (data.name && data.name.toLowerCase().startsWith(searchFilter.toLowerCase())) ||
          (data.address && data.address.includes(searchFilter))
        )
      )
      if (data.length !== 0) {
        filtered.push({
          ...addresses[index],
          data
        })
      }
    }
    if (filtered.length === 0) setNoSearchResults(true)
    return filtered
  }

  const _onChangeTextHandler = (text) => {
    setSearchFilter(text)
    setNoSearchResults(false)
  }

  return (
    <Screen>
      <Modal
        ref={modal}
        title={translate('editContact')}
      >
        <View>
          <GenericTextInput
            initialValue={editAddress.name}
            placeholder={translate('addressName')}
            onChangeText={(text) => setEditAddress({ ...editAddress, name: text })}
          />
          <PktAddressInput
            address={editAddress.address}
            style={styles.addressInput}
            placeholder={translate('pktAddress')}
            onChangeText={(text) => setEditAddress({ ...editAddress, address: text })}
            address={editAddress.address}
          />
        </View>
        <ActivityButton
          title={translate('saveAddress')}
          style={styles.addressInput}
          onPress={async () => {
            await contactManager.current.remove(editAddress.startingAddress)
            await contactManager.current.add(editAddress.name, editAddress.address)
            await contactManager.current.save()
            setEditAddress({})
            loadContacts()
            modal.current.close()
          }}
        />
        {!editAddress.isLocal &&
          <ActiveButton
            style={styles.lastButton}
            title={translate('deleteAddress')}
            variant='danger'
            onPress={async () => {
              await contactManager.current.remove(editAddress.startingAddress)
              await contactManager.current.save()
              modal.current.close()
            }}
          />
        }
      </Modal>
      <View style={styles.screen}>
        <View>
          <View style={styles.searchBar}>
            <View style={styles.searchInputContainer}>
              <SearchInput
                placeholder={translate('searchAddresses')}
                style={styles.searchInput}
                onChangeText={_onChangeTextHandler}
              />
            </View>
          </View>
          <View style={styles.contactListContainer}>
            {noSearchResults ? (
              <View style={styles.noResult}>
                <BodyText>No results</BodyText>
              </View>
            ) : (
              <ContactList
                addresses={filter(addresses)}
                onListItemPress={(address) => {
                  if (isInSelectorMode) {
                    route.params.onContactSelected(address)
                    navigation.goBack()
                  } else {
                    setEditAddress({ ...address, startingAddress: address.address })
                    modal.current.open()
                    /* navigation.push(
                      'EditContactView', {
                      address: address.address,
                      name: address.name,
                      isLocal: address.isLocal
                    }
                    ) */
                  }
                }}
                navigation={navigation}
              />
            )}
          </View>
        </View>
        <View>
          {
            searchFilter ||
            <View style={styles.addContactButtonContainer}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  navigation.push('EditContactView')
                }}
              >
                {/* <PlusIcon fill={colors.link.color} size={25} /> */}
                <BodyText style={styles.newAddressText}>{'+ ' + translate('newContact')}</BodyText>
              </TouchableOpacity>
            </View>
          }
        </View>
      </View>
    </Screen>
  )
}

export default ContactBookView
