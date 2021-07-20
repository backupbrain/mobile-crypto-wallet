import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import translate from '../../translations'

const LocalAddressSelector = (props) => {
  const placeholder = props.placeholder || translate('localAddressSelectorPlaceholder')
  return (
    <View style={styles.container}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <View style={styles.textInput}>
        <Text style={styles.accountName}>{placeholder}</Text>
      </View>
      {props.help && <Text style={styles.helpText}>{props.help}</Text>}
      {props.error && <Text style={styles.errorText}>{props.error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: '16px'
  },
  accountName: {
    fontWeight: 'bold',
    paddingBottom: '3px'
  },
  label: {
    width: '100%',
    paddingBottom: '10px'
  },
  textInput: {
    backgroundColor: '#F1F2F4',
    color: '#424A52',
    paddingHorizontal: '20px',
    paddingVertical: '16px',
    width: '100%',
    borderRadius: 6
  },
  helpText: {
    color: '#666',
    paddingTop: '10px',
    paddingHorizontal: '6px'
  },
  errorText: {
    color: '#600',
    paddingTop: '10px',
    paddingHorizontal: '6px'
  }
})

export default LocalAddressSelector
