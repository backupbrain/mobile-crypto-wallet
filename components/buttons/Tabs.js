import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

const Tabs = (props) => {
  const [selectedTabId, setSelectedTabId] = useState(0)
  const [isFirstRun, setIsFirstRun] = useState(true)
  useEffect(() => {
    if (isFirstRun) {
      setIsFirstRun(false)
      if (props.initialTabId !== undefined) {
        setSelectedTabId(props.initialTabId)
      }
    }
  }, [setIsFirstRun, setSelectedTabId])
  for (let i = 0; i < props.tabs.length; i++) {
    const tab = props.tabs[i]
    if (i === selectedTabId) {
      tab.style = styles.selectedTab
      tab.textStyle = styles.selectedTabText
    } else {
      tab.style = styles.tab
      tab.textStyle = styles.tabText
    }
  }
  const currentTab = () => {
    return props.tabs[selectedTabId].card
  }
  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        {props.tabs.map((tab, index) => (
          <TouchableOpacity
            key={`tab${index}`}
            style={tab.style}
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
      <View style={styles.thing}>
        {currentTab()}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  thing: {
    width: '100%'
  },
  tabs: {
    borderRadius: '6px',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: '20px',
    marginBottom: '20px'
  },
  tab: {
    border: '1px solid #D4D9DE',
    paddingVertical: '15px',
    paddingHorizontal: '15px',
    textAlign: 'center',
    flexGrow: 1
  },
  selectedTab: {
    border: '1px solid #000',
    backgroundColor: '#000',
    paddingVertical: '15px',
    paddingHorizontal: '15px',
    textAlign: 'center',
    flexGrow: 1
  },
  selectedTabText: {
    fontWeight: 'bold',
    color: '#fff'
  }
})

export default Tabs
