import React from 'react'
import {
  SectionList,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native'
import WalletListItem from './../wallet/WalletListItem.js'
import ListSectionHeader from '../lists/ListSectionHeader'

const ContactList = (props) => {
  return (
    <View style={styles.container}>
      <SectionList
        sections={props.addresses}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={props.onListItemPress}>
            <WalletListItem
              name={item.name}
              address={item.address}
              amount={item.amount}
              showAmount={item.amount !== undefined}
            />
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section }) => (
          <ListSectionHeader
            title={section.title}
            linkText={null}
          />
        )}
        keyExtractor={(item, index) => index}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    width: '100%'
  }
})

export default ContactList
