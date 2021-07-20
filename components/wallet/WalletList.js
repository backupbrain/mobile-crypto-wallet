import React from 'react'
import { SectionList, StyleSheet, View, TouchableOpacity } from 'react-native'
import WalletListItem from './WalletListItem.js'
import ListSectionHeader from '../lists/ListSectionHeader'

const WalletList = (props) => {
  return (
    <View style={styles.container}>
      <SectionList
        sections={[{ title: 'My Addresses', data: props.addresses }]}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={props.onListItemPress}
          >
            <WalletListItem
              name={item.name}
              address={item.address}
              amount={item.amount}
            />
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section }) => (
          <ListSectionHeader
            title='My Addresses'
            linkText='Create Address'
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
    width: '100%'
  }
})

export default WalletList
