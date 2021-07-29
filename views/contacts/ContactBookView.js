import React, { useState, useEffect } from 'react'
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native'
import SearchInput from '../../components/inputs/SearchInput'
import ContactManager from '../../utils/ContactManager'
import ContactList from '../../components/contacts/ContactList'
import { AntDesign } from '@expo/vector-icons'
import translate from '../../translations'

const myFakeAddresses = [
  'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk',
  'pkt1yclh96uk6p4glgyaakqz40pvqy3s296ma02tulj'
]
const fakeAddresses = [
  {
    title: 'My Addresses',
    data: [
      {
        name: 'Account 1',
        amount: 123456.00134,
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk'
      },
      {
        name: 'Account 2',
        amount: 56.00134,
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk'
      },
      {
        name: 'Account 3',
        amount: 0.0000134,
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk'
      }
    ]
  },
  {
    title: 'A',
    data: [
      {
        name: 'Adonis',
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk'
      }
    ]
  },
  {
    title: 'J',
    data: [
      {
        name: 'Josh',
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk'
      },
      {
        name: 'Jesse',
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk'
      },
      {
        name: 'James',
        address: 'pkt1qz40pvqy3s26p4glgyaak02tulj96mayclh96uk'
      }
    ]
  }
]

const App = ({ navigation, route }) => {
  const contactManager = new ContactManager()
  const [addresses, setAddresses] = useState([])
  const [isInSelectorMode, setIsInSelectorMode] = useState(false)
  const [areContactsLoaded, setAreContactsLoaded] = useState(false)
  const fetchMyAddress = async () => {
    // TODO: load this list from the pkd gRPC
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(myFakeAddresses)
      }, 1)
    })
  }
  const buildContactList = (myAddresses, contactManager) => {
    const formattedAddresses = []
    const contacts = contactManager.contacts
    const lookup = contactManager.lookup
    const lookupByInitial = {}

    const formattedMyAddresses = {
      title: translate('myAddresses'),
      data: []
    }
    for (const index in myAddresses) {
      const address = myAddresses[index]
      const row = lookup[address]
      if (row !== undefined) {
        formattedMyAddresses.data.push(contacts[row])
      } else {
        const fakeContact = {
          name: '',
          address: address,
          isLocal: true
        }
        formattedMyAddresses.data.push(fakeContact)
      }
    }
    formattedAddresses.push(formattedMyAddresses)
    for (const contact in contacts) {
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
    setAddresses(formattedAddresses)
    setAreContactsLoaded(true)
  }
  useEffect(() => {
    if (route.params && route.params.selectorMode) {
      setIsInSelectorMode(route.params.selectorMode === true)
    }
    const loadContacts = async () => {
      const myAddresses = await fetchMyAddress()
      await contactManager.initialize()
      buildContactList(myAddresses, contactManager)
    }
    if (!areContactsLoaded) {
      loadContacts()
    }
  }, [route, setIsInSelectorMode, contactManager])

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.searchBar}>
          <View style={styles.searchInputContainer}>
            <SearchInput
              placeholder={translate('searchAddresses')}
            />
          </View>
          <View style={styles.addContactButtonContainer}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                console.log('CLIIICK')
                navigation.push('EditContactView')
              }}
            >
              <AntDesign name='plus' size={24} color='blue' />
            </TouchableOpacity>
          </View>
        </View>
        <ContactList
          addresses={addresses}
          onListItemPress={(row) => {
            if (isInSelectorMode) {
              // TODO: select address and return to previous screen
              console.log(`selected row: ${row}`)
            } else {
              navigation.push('EditContactView', { address: row })
            }
          }}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff'
  },
  searchBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '16px',
    paddingHorizontal: '20px'
  },
  searchInputContainer: {
    flexGrow: 1
  },
  addContactButtonContainer: {
  },
  addButton: {
    flexShrink: 1,
    paddingVertical: '10px',
    paddingRight: '20px',
    paddingLeft: '16px'
  }
})

export default App
