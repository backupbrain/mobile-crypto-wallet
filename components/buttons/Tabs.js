import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'

const Tabs = (props) => {
  const { colors, dimensions } = useTheme()
  const [selectedTabId, setSelectedTabId] = useState(0)
  const [isFirstRun, setIsFirstRun] = useState(true)
  useEffect(() => {
    if (isFirstRun) {
      setIsFirstRun(false)
      if (props.initialTabId !== undefined) {
        setSelectedTabId(props.initialTabId)
      }
    }
  }, [setIsFirstRun, setSelectedTabId, props.initialTabId, isFirstRun])

  const styles = StyleSheet.create({
    contentContainer: {
      width: '100%'
    },
    tabs: {
      flexDirection: 'row',
      width: '100%',
      marginBottom: dimensions.button.paddingVertical,
      paddingHorizontal: dimensions.tabs.tabMarginHorizontal
    },
    firstTab: {
      borderTopLeftRadius: dimensions.button.borderRadius,
      borderBottomLeftRadius: dimensions.button.borderRadius,
      borderLeftWidth: dimensions.button.borderWidth,
      borderRightWidth: dimensions.button.borderWidth
    },
    lastTab: {
      borderTopRightRadius: dimensions.button.borderRadius,
      borderBottomRightRadius: dimensions.button.borderRadius,
      borderRightWidth: dimensions.button.borderWidth,
      borderLeftWidth: dimensions.button.borderWidth
    },
    middleTab: {
      borderLeftWidth: dimensions.button.borderWidth,
      borderRightWidth: dimensions.button.borderWidth
    },
    tab: {
      borderTopWidth: dimensions.button.borderWidth,
      borderBottomWidth: dimensions.button.borderWidth,
      paddingVertical: dimensions.button.paddingVertical,
      paddingHorizontal: dimensions.button.paddingHorizontal,
      textAlign: 'center',
      flexGrow: 1
    },
    unselectedTab: {
      borderColor: colors.unselectedButton.borderColor
    },
    selectedTab: {
      borderColor: colors.primaryButton.borderColor,
      backgroundColor: colors.primaryButton.backgroundColor,
      flexGrow: 1
    },
    selectedTabText: {
      fontWeight: dimensions.button.fontWeight,
      textTransform: dimensions.button.textTransform,
      textAlign: dimensions.button.textAlign,
      color: colors.primaryButton.color
    },
    unselectedTabText: {
      fontWeight: dimensions.button.fontWeight,
      textTransform: dimensions.button.textTransform,
      textAlign: dimensions.button.textAlign,
      color: colors.unselectedButton.color
    }
  })

  for (let i = 0; i < props.tabs.length; i++) {
    const tab = props.tabs[i]
    tab.styles = [styles.tab]
    if (i === selectedTabId) {
      tab.styles.push(styles.selectedTab)
      tab.textStyle = styles.selectedTabText
    } else {
      tab.styles.push(styles.unselectedTab)
      tab.textStyle = styles.unselectedTabText
    }
    if (i === 0) {
      tab.styles.push(styles.firstTab)
    } else if (i === props.tabs.length - 1) {
      tab.styles.push(styles.lastTab)
    } else {
      tab.styles.push(styles.middleTab)
    }
  }
  const currentTab = () => {
    return props.tabs[selectedTabId].content
  }
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.tabs}>
        {props.tabs.map((tab, index) => (
          <TouchableOpacity
            key={`tab${index}`}
            style={tab.styles}
            onPress={() => {
              setSelectedTabId(index)
              if (props.onChange) {
                props.onChange(index)
              }
            }}
          >
            <Text style={tab.textStyle}>{tab.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.contentContainer}>
        {currentTab()}
      </View>
    </View>
  )
}

export default Tabs
