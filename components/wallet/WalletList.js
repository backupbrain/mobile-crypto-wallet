import React from 'react'
import { SectionList, StyleSheet, View, TouchableOpacity } from 'react-native'
import WalletListItem from './WalletListItem.js'
import ListSectionHeader from '../lists/ListSectionHeader'
import translate from '../../translations'
import { useTheme } from '@react-navigation/native'

const WalletList = (props) => {
  const { colors, dimensions } = useTheme()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%'
    },
    listItem: {
      paddingVertical: dimensions.listItem.paddingVertical,
      paddingHorizontal: dimensions.listItem.paddingHorizontal,
      marginHorizontal: dimensions.listItem.marginHorizontal,
      borderTopWidth: dimensions.listItem.borderTopWidth,
      borderLeftWidth: dimensions.listItem.borderLeftWidth,
      borderRightWidth: dimensions.listItem.orderRightWidth,
      borderBottomWidth: dimensions.listItem.borderBottomWidth,
      borderRadius: dimensions.listItem.borderRadius,
      borderColor: colors.listItem.borderColor
    }
  })

  return (
    <View style={styles.container}>
      <SectionList
        sections={[{ title: translate('myAddresses'), data: props.addresses }]}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={props.onListItemPress}
          >
            <WalletListItem
              name={item.name}
              address={item.address}
              amount={item.amount}
              style={styles.listItem}
            />
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section }) => (
          <ListSectionHeader
            title={translate('myAddresses')}
            linkText={translate('createAddress')}
          />
        )}
        keyExtractor={(item, index) => index}
      />
    </View>
  )
}

export default WalletList
