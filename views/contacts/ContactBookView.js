import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/inputs/SearchInput'
import LinkButton from '../../components/buttons/LinkButton'
import ContactList from '../../components/contacts/ContactList'
import AppConstants from '../../utils/AppConstants'
import AdaptiveStorage from '../../utils/AdaptiveStorage'

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

const ContactBookView = ({ navigation, route }) => {
  const [addresses, setAddresses] = useState([])
  let isInSelectorMode = false
  if (route.params && route.params.selectorMode) {
     isInSelectorMode = route.params.selectorMode === true
  }
  const loadAddresses = async () => {
    // FIXME: remove fake addresses
    return fakeAddresses
    /*
    const rawAddresses = AdaptiveStorage.get(AppConstants.CONTACT_LIST_KEY)
    if (rawAddresses === unndefined || rawAddresses === null) {
      return []
    } else {
      try {
        return JSON.eval(rawAddresses)
      } catch (e) {
        // TODO: show error alert
        return []
      }
    }
    /* */
  }
  useEffect(() => {
    const localLoadAddresses = async () => {
      return loadAddresses()
    }
    const addresses = localLoadAddresses()
    setAddresses(addresses)
  })
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.searchBar}>
          <View style={styles.searchInputContainer}>
            <SearchInput
              placeholder='Search addresses...'
            />
          </View>
          <View style={styles.addContactButtonContainer}>
            <LinkButton title='+' />
          </View>
        </View>
        <ContactList
          addresses={addresses}
          onListItemPress={(row) => {
            if (isInSelectorMode) {
              // TODO: select address and return to previous screen
              console.log(`selected row: ${row}`)
            } else {
              navigation.navigate('Address')
            }
          }}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    width: '100%'
  },
  screen: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchBar: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: '20px',
    paddingVertical: '10px'
  },
  searchInputContainer: {
    flexGrow: 1
  },
  addContactButtonContainer: {
    paddingTop: '16px',
    paddingLeft: '20px',
    paddingBottom: '16px'
  }
})

export default ContactBookView
