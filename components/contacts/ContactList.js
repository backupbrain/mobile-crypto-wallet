import React from 'react'
import {
  SectionList,
  StyleSheet,
  View
} from 'react-native'
import ListSectionHeader from '../lists/ListSectionHeader'
import ContactListItem from './ContactListItem'
import BodyText from '../text/BodyText'
import { useTheme } from '@react-navigation/native'
import translate from '../../translations'

const ContactList = (props) => {
  const { colors, dimensions } = useTheme()
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%'
    },
    listItem: {
      paddingVertical: dimensions.listItem.paddingVertical,
      paddingHorizontal: dimensions.listItem.paddingHorizontal,
      marginHorizontal: dimensions.listItem.marginHorizontal
    },
    noAddresses: {
      color: colors.disabledText,
      fontStyle: 'italic',
      paddingVertical: dimensions.listItem.paddingVertical
    }
  })

  return (
    <View style={styles.container}>
      <SectionList
        sections={props.addresses}
        keyExtractor={(item, index) => item + index.toString()}
        renderItem={({ item }) => (
          <ContactListItem
            item={item}
            onListItemPress={props.onListItemPress}
            navigation={props?.navigation}
            style={styles.listItem}
          />
        )}
        renderSectionHeader={({ section }) => (
          <ListSectionHeader
            title={section.title}
            linkText={null}
          />
        )}
      />
      {!props.addresses.length &&
        <BodyText style={styles.noAddresses}>{translate('noAddresses')}</BodyText>}
    </View>
  )
}

export default ContactList
