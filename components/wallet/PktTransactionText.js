import React, { useState, useEffect, useCallback } from 'react'
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

const PktTransactionText = (props) => {
  const { colors, dimensions } = useTheme()
  const [, setCardDimensions] = useState({ width: 0, height: 0 })
  const [isReady, _setIsReady] = useState(false)
  const [formattedTransaction, setFormattedTransaction] = useState([])
  const [maxTextWidth, setMaxTextWidth] = useState(1)

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center'
    },
    card: {
      alignItems: 'center',
      paddingVertical: dimensions.paddingHorizontal,
      paddingHorizontal: dimensions.paddingHorizontal,
      width: dimensions.transactionCard.width,
      backgroundColor: colors.transactionCard.backgroundColor,
      borderRadius: dimensions.transactionCard.borderRadius
    },
    activityIndicatorCard: {
      height: dimensions.transactionCard.width,
      justifyContent: 'center'
    },
    transactionText: {
      fontFamily: dimensions.transactionCard.fontFamily,
      lineHeight: dimensions.transactionCard.lineHeight,
      fontSize: dimensions.transactionCard.fontSize,
      textAlign: dimensions.transactionCard.textAlign
    },
    transactionTextLast: {
      width: maxTextWidth
    }
  })
  const formatTransaction = (transactionId) => {
    if (transactionId && transactionId.length > 0) {
      const numRows = 5
      // break up into numRows
      const maxRowLength = Math.floor(transactionId.length / numRows)
      const newLineRegex = new RegExp('.{' + maxRowLength + '}|.{1,' + (maxRowLength - 1) + '}', 'g')
      const transactionRows = transactionId.match(newLineRegex)
      // split strings by space if they are longer than
      // maxRowLength / 2
      const spaceDistance = Math.ceil(maxRowLength / 2)
      const spacesRegex = new RegExp('(.{' + spaceDistance + '})', 'g')
      for (let row = 0; row < transactionRows.length; row++) {
        const transactionRow = transactionRows[row].replace(spacesRegex, '$1 ')
        transactionRows[row] = transactionRow
      }
      setFormattedTransaction(transactionRows)
    } else {
      setFormattedTransaction([])
    }
  }

  const setIsReady = useCallback((transactionId, width) => {
    if (width > 0 && transactionId && transactionId !== '') {
      _setIsReady(true)
    } else {
      _setIsReady(false)
    }
  }, [_setIsReady])

  const getTransactionTextLayout = (index) => {
    const transactionTextLayout = [styles.transactionText]
    if (index >= formattedTransaction.length - 1) {
      transactionTextLayout.push(styles.transactionTextLast)
    }
    return transactionTextLayout
  }

  useEffect(() => {
    setIsReady(props.transactionId, dimensions.width)
    formatTransaction(props.transactionId)
  }, [props.transactionId, dimensions.width, setIsReady])

  return (
    <View
      style={[styles.container, props.style]}
    >
      <View
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout
          setCardDimensions({ width, height })
          setIsReady(props.transactionId, width)
        }}
      >
        {isReady
          ? (
            <View style={styles.card}>
              {formattedTransaction.map((transactionRow, index) => (
                <Text
                  key={index}
                  style={getTransactionTextLayout(index)}
                  onLayout={(event) => {
                    const { width } = event.nativeEvent.layout
                    if (index === 0) {
                      setMaxTextWidth(width, index)
                    }
                  }}
                >
                  {transactionRow}
                </Text>
              ))}
            </View>)
          : (
            <View
              style={[styles.card, styles.activityIndicatorCard]}
            >
              <ActivityIndicator
                size='large'
                color={colors.primaryButton.backgroundColor}
              />
            </View>)}
      </View>
    </View>
  )
}

export default PktTransactionText
