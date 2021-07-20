import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import LinkButton from '../buttons/LinkButton'

const ListSectionHeader = (props) => {
  const doShowLink = (props.linkText != null && props.linkText !== '')
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{props.title}</Text>
      {doShowLink &&
        <View style={styles.sectionHeaderLink}>
          <LinkButton
            style={styles.sectionHeaderLink}
            title={props.linkText}
          />
        </View>}
    </View>
  )
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    backgroundColor: '#DEDFE3',
    paddingVertical: '10px',
    paddingHorizontal: '10px'
  },
  sectionHeaderText: {
    flexGrow: 1,
    paddingHorizontal: '10px'
  },
  sectionHeaderLink: {
    paddingRight: '10px'
  }
})

export default ListSectionHeader
