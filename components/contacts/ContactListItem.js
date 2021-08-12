import React from 'react'
import { TouchableOpacity } from 'react-native'
import WalletListItem from './../wallet/WalletListItem'

const ContactListItem = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (props.onListItemPress) {
          props.onListItemPress(props.item)
        }
      }}
    >
      <WalletListItem
        style={props.style}
        name={props.item?.name}
        address={props.item?.address}
        amount={props.item?.amount}
        local={props.item?.isLocal}
        navigation={props?.navigation}
      />
    </TouchableOpacity>
  )
}

export default ContactListItem
