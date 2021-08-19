import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import LinkButton from '../buttons/LinkButton'
import AccountBalance from './AccountBalance'
import translate from '../../translations'
import AdaptiveStorage from '../../utils/AdaptiveStorage'
import AppConstants from '../../utils/AppConstants'
import { useTheme } from '@react-navigation/native'

const sumBalances = (addresses) => {
  let sum = 0.0
  for (const row in addresses) {
    sum += addresses[row].total
  }
  return sum
}

const MainAccountBalance = (props) => {
  const { colors, dimensions } = useTheme()
  const [isBalanceVisible, setIsBalanceVisibleVar] = useState(true)
  const [isVisibilityChanged, setIsVisibilityChanged] = useState(true)
  const [isFirstRead, setIsFirstRead] = useState(true)
  const addresses = props.addresses
  useEffect(() => {
    if (props.showBalance !== undefined && !isVisibilityChanged) {
      setIsBalanceVisible(props.showBalance)
      setIsVisibilityChanged(true)
    }
  })
  const setIsBalanceVisible = (isBalanceVisible) => {
    AdaptiveStorage.set(AppConstants.BALANCE_VISIBILITY_KEY, isBalanceVisible)
    setIsBalanceVisibleVar(isBalanceVisible)
  }
  useEffect(() => {
    const setBalanceVisibilityFromStorage = async () => {
      if (isFirstRead) {
        setIsFirstRead(false)
        const isBalanceVisible = await AdaptiveStorage.get(AppConstants.BALANCE_VISIBILITY_KEY)
        if (isBalanceVisible !== undefined) {
          setIsBalanceVisibleVar(isBalanceVisible)
        }
      }
    }
    setBalanceVisibilityFromStorage()
  })

  const styles = StyleSheet.create({
    container: {
      width: '100%'
    },
    balanceHeader: {
      flexDirection: 'row',
      width: '100',
      justifyContent: 'between',
      alignItems: 'flex-end',
      paddingBottom: dimensions.verticalSpacingBetweenItems
    },
    balanceHeaderTitle: {
      flexGrow: 1,
      fontWeight: dimensions.accountBalance.fontWeight,
      color: colors.text
    }
  })

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.balanceHeader}>
        <Text style={styles.balanceHeaderTitle}>{translate('balanceHeader')}</Text>
        {isBalanceVisible ? (
          <LinkButton
            style={styles.balanceHeaderToggle}
            title={translate('hideBalance')}
            onPress={() => setIsBalanceVisible(!isBalanceVisible)}
          />
        ) : (
          <LinkButton
            style={styles.balanceHeaderToggle}
            title={translate('showBalance')}
            onPress={() => setIsBalanceVisible(!isBalanceVisible)}
          />
        )}
      </View>
      <AccountBalance
        amount={sumBalances(addresses)}
        visible={isBalanceVisible}
      />
    </View>
  )
}

export default MainAccountBalance
