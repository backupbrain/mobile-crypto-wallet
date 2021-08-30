import React from 'react'
import { TouchableOpacity } from 'react-native'
import WalletListItem from './../wallet/WalletListItem'

const ContactListItem = (props) => {

  const _onPressHandler = () => {
    if (props.onListItemPress) {
      props.onListItemPress(props.item)
    }
  }

  return (
    <TouchableOpacity
      onPress={_onPressHandler}
    >
      <WalletListItem
        style={props.style}
        name={props.item?.name}
        address={props.item?.address}
        amount={props.item?.total}
        local={props.item?.isLocal}
        navigation={props?.navigation}
      />
    </TouchableOpacity>
  )
}

export default ContactListItem
