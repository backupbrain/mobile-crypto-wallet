import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import DotDashPinCharEmpty from '../images/DotDashPinCharEmpty'
import DotDashPinCharFilled from '../images/DotDashPinCharFilled'
import { useTheme } from '@react-navigation/native'
import translate from '../../translations'

const DotDashPinInput = (props) => {
  const { colors, dimensions } = useTheme()
  const pinIndexes = [1, 2, 3, 4]

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
      marginRight: dimensions.horizontalSpacingBetweenItems
    },
    pinCharLast: {
      marginRight: '0px'
    },
    errorText: {
      color: colors.inputs.errorTextColor,
      paddingTop: dimensions.inputs.supportingTextPaddingTop,
      paddingHorizontal: dimensions.inputs.supportingTextPaddingHorizontal
    }
  })

  const getPinCharStyle = (index) => {
    const pinStyles = [styles.pinChar]
    if (index >= pinIndexes.length) {
      pinStyles.push(styles.pinCharLast)
    }
    return pinStyles
  }

  return (
    <View style={styles.container}>
      <View style={styles.pinInputContainer}>
        <View style={styles.pinCharContainer}>
          {pinIndexes.map(index => (
            <View key={index}>
              {props.pin.length >= index
                ? (
                  <DotDashPinCharFilled
                    style={getPinCharStyle(index)}
                    color={colors.text}
                  />)
                : (
                  <DotDashPinCharEmpty
                    style={getPinCharStyle(index)}
                    color={colors.text}
                  />)}
            </View>
          ))}
        </View>
        {props.error
          ? <Text style={styles.errorText}>{translate('invalidPin')}</Text>
          : <Text style={styles.errorText}>&nbsp;</Text>}
      </View>
    </View>
  )
}

export default DotDashPinInput
