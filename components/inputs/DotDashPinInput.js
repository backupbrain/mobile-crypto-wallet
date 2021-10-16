import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import DotDashPinCharEmpty from '../images/DotDashPinCharEmpty'
import DotDashPinCharFilled from '../images/DotDashPinCharFilled'
import { useTheme } from '@react-navigation/native'
import translate from '../../translations'
import BodyText from '../text/BodyText'
import DotPinFilled from '../images/DotPinFilled'

const DotDashPinInput = (props) => {
  const { colors, dimensions } = useTheme()
  const pinIndexes = [1, 2, 3, 4]


  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      flexDirection: 'row',
      width: '100%',
      marginBottom: 70,
      marginTop:10
    },
    pinInputContainer: {
      justifyContent: 'center',
      /* flexShrink: 1 */
    },
    pinCharContainer: {
      flexDirection: 'row',
      /* flexShrink: 1 */
      width: '100%',
      justifyContent: 'space-between',
      maxWidth: 300
    },
    pinChar: {
      width: 46,
      height: 52,
    },
    pinCharLast: {
      marginRight: 0
    },
    errorText: {
      color: colors.inputs.errorTextColor,
      paddingTop: dimensions.inputs.supportingTextPaddingTop,
      paddingHorizontal: dimensions.inputs.supportingTextPaddingHorizontal
    },
    pinCharShown: {
      fontSize: 36,
      color: colors.bodyText.color,
      lineHeight: 46,
      textAlign: 'center'
    },
    dash: {
      fontSize: 24,
      color: colors.bodyText.color,
      lineHeight: 46,
      textAlign: 'center'
    },
    pinCharBox: {
      borderBottomColor: '#A9A9A9',
      borderBottomWidth: 1,
      marginRight: dimensions.horizontalSpacingBetweenItems
    },
    errorColors: {
      borderBottomColor: 'red',
      borderBottomWidth: 1,
    }
  })

  const getPinCharStyle = (index) => {
    const pinStyles = [styles.pinChar]
    if (index >= pinIndexes.length) {
      pinStyles.push(styles.pinCharLast)
    }
    return pinStyles
  }

  const getBoxStyle = (index) => {
    const boxStyle = [styles.pinCharBox]
    if (index == pinIndexes.length) {
      boxStyle.push(styles.pinCharLast)
    }

    if (props.error)
      boxStyle.push(styles.errorColors)

    return boxStyle
  }

  return (
    <View style={styles.container}>
      <View style={styles.pinInputContainer}>
        <View style={styles.pinCharContainer}>
          {pinIndexes.map((index, pos) => (
            <View key={index} style={getBoxStyle(index)}>
              {props.pin.length >= index ?
                (
                  pos == props.pin.length - 1 ?
                    (
                      <BodyText style={[getPinCharStyle(index), styles.pinCharShown]} >{props.pin[pos]}</BodyText>
                    )
                    :
                    (
                      <DotPinFilled
                        style={getPinCharStyle(index)}
                        color={colors.text}
                      />
                    )
                )
                :
                (
                  <BodyText style={[getPinCharStyle(index), styles.dash, props.error ? { color: 'red' } : null]} >-</BodyText>
                  /* <DotDashPinCharEmpty
                    style={getPinCharStyle(index)}
                    color={colors.text}
                  /> */
                )
              }
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
