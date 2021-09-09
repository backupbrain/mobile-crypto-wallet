import React, { useEffect } from 'react'
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import TransactionListItem from './TransactionListItem'
import translate from '../../translations'
import { useTheme } from '@react-navigation/native'

const TransactionList = (props) => {
  const { colors, dimensions } = useTheme()

  useEffect(() => {
    console.log('transaction list changed')
  })

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
    },
    noTransactions: {
      color: colors.disabledText,
      fontStyle: 'italic',
      paddingVertical: dimensions.listItem.paddingVertical
    }
  })

  return (
    <View style={styles.container}>
      {props.transactions.length > 0 &&
        <FlatList
          refreshing={props.refreshing}
          data={props.transactions}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={props.onListItemPress.bind(this, index)}
            >
              <TransactionListItem
                transaction={item}
                style={styles.listItem}
                contact={props.contactLookup}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />}
      {props.transactions.length === 0 &&
        <Text style={styles.noTransactions}>{translate('noTransactions')}</Text>}
    </View>
  )
}

export default TransactionList
