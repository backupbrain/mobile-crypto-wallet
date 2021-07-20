import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import DotDashPinCharEmpty from '../images/DotDashPinCharEmpty'
import DotDashPinCharFilled from '../images/DotDashPinCharFilled'
import translate from '../../translations'

const DotDashPinInput = (props) => {
  const pinIndexes = [1, 2, 3, 4]
  return (
    <View style={styles.container}>
      <View style={styles.pinInputPadding}>&nbsp;</View>
      <View style={styles.pinInputContainer}>
        <View style={styles.pinCharContainer}>
          {pinIndexes.map(index => (
            <View key={index}>
              {props.pin.length >= index
                ? <DotDashPinCharFilled style={styles.pinChar} />
                : <DotDashPinCharEmpty style={styles.pinChar} />}
            </View>
          ))}
        </View>
        <Text>{props.error}</Text>
        {props.error
          ? <Text style={styles.errorText}>{translate('invalidPin')}</Text>
          : <Text style={styles.errorText}>&nbsp;</Text>}
      </View>
      <View style={styles.pinInputPadding}>&nbsp;</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  pinInputContainer: {
    justifyContent: 'center',
    flexShrink: 1
  },
  pinCharContainer: {
    flexDirection: 'row',
    flexShrink: 1
  },
  pinChar: {
    width: '60px',
    marginRight: '10px'
  },
  pinCharLast: {
    marginRight: '0px'
  },
  pinInputPadding: {
    flexGrow: 1
  },
  errorText: {
    color: '#f00',
    marginTop: '8px'
  }
})

export default DotDashPinInput
