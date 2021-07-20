import * as React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

const Tabs = (props) => {
  const tabs = props.tabs
  return (
    <View style={styles.tabs}>
      <TouchableOpacity style={styles.selectedTab}>

        <Text style={styles.selectedTabText}>QR</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Text>Text</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Text>Transactions</Text>
      </TouchableOpacity>
      {tabs.map((tab, index) => {
        <TouchableOpacity key={index}>
          <Text>{ tab.name }</Text>
        </TouchableOpacity>
      })}
    </View>
  )
}

const styles = StyleSheet.create({
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
