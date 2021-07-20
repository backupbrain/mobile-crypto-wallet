import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const AlertBanner = (props) => {
  const [isAltered, setIsAltered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  let doDisplayCloseButton = true
  if (props.disableClose) {
    doDisplayCloseButton = false
  }
  useEffect(() => {
    if (props.visible) {
      if (!isAltered) {
        setIsVisible(props.visible)
        setIsAltered(true)
      }
    }
  })
  const getStyles = () => {
    const bannerStyle = [styles.banner]
    switch (props.variant) {
      case 'success':
        bannerStyle.push(styles.successContainer)
        break
      case 'warning':
        bannerStyle.push(styles.warningContainer)
        break
      case 'danger':
        bannerStyle.push(styles.dangerContainer)
        break
      case 'info':
        bannerStyle.push(styles.infoContainer)
        break
    }
    return bannerStyle
  }
  return (
    <View style={styles.container}>
      {isVisible &&
        <View style={getStyles()}>
          <Text style={styles.textStyle}>{props.label}</Text>
          {doDisplayCloseButton &&
            <TouchableOpacity
              onPress={() => {
                if (props.onClose) {
                  props.onClose()
                }
                setIsVisible(false)
                console.log('Close!')
              }}
            >
              <View style={styles.closeButton}>
                <Ionicons name='close' size={24} color='white' />
              </View>
            </TouchableOpacity>}
        </View>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  banner: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  successContainer: {
    backgroundColor: '#10BC81'
  },
  warningContainer: {
    backgroundColor: '#CA9016'
  },
  dangerContainer: {
    backgroundColor: '#ED1A33'
  },
  infoContainer: {
    // TODO: decide on a background color
  },
  textStyle: {
    flexGrow: 1,
    color: '#fff',
    paddingVertical: '16px',
    paddingLeft: '20px'
  },
  closeButton: {
    paddingHorizontal: '10px',
    paddingVertical: '10px'
  }
})

export default AlertBanner
