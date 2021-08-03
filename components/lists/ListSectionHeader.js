import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import LinkButton from '../buttons/LinkButton'
import { useTheme } from '@react-navigation/native'

const ListSectionHeader = (props) => {
  const { colors, dimensions } = useTheme()
  const doShowLink = (props.linkText != null && props.linkText !== '')

  const styles = StyleSheet.create({
    sectionHeader: {
      flexDirection: 'row',
      backgroundColor: colors.listSectionHeader.backgroundColor,
      paddingVertical: dimensions.listSectionHeader.paddingVertical,
      paddingHorizontal: dimensions.listSectionHeader.paddingHorizontal,
      alignItems: 'flex-end'
    },
    sectionHeaderText: {
      flexGrow: 1,
      color: colors.listSectionHeader.color,
      fontWeight: dimensions.listSectionHeader.fontWeight,
      textTransform: dimensions.listSectionHeader.textTransform
    },
    sectionHeaderLink: {
    }
  })

  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{props.title}</Text>
      {doShowLink &&
        <View style={styles.sectionHeaderLink}>
          <LinkButton
            style={styles.sectionHeaderLink}
            title={props.linkText}
            onPress={props.onLinkPress}
          />
        </View>}
    </View>
  )
}

export default ListSectionHeader
