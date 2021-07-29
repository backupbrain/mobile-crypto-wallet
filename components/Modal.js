import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react'
import { Animated, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const Modal = (props, ref) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const [isVisible, setIsVisible] = useState(false)
  useImperativeHandle(ref, () => ({
    open: () => open(),
    close: () => close()
  }))
  const open = () => {
    setIsVisible(true)
    fadeIn()
  }
  const close = () => {
    fadeOut()
  }

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100
    }).start()
  }

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 100
    }).start(({ finished }) => {
      setIsVisible(false)
    })
  }
  return (
    <>
      {isVisible &&
        <View style={styles.container}>
          <Animated.View style={[styles.background, { opacity: fadeAnim }]}>
            <Animated.View style={[styles.modal, { opacity: fadeAnim }]}>
              <View style={styles.modalTitle}>
                <Text style={styles.modalText}>{props.title}</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => close()}
                >
                  <Ionicons name='close' size={24} color='black' />
                </TouchableOpacity>
              </View>
              <View style={styles.modalContainer}>
                {props.content}
              </View>
              <View style={styles.footerContainer}>
                {props.footer}
              </View>
            </Animated.View>
          </Animated.View>
        </View>}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: '16px',
    paddingHorizontal: '20px'
  },
  modal: {
    borderRadius: '6px',
    backgroundColor: '#fff'
  },
  modalTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ccc'
  },
  modalText: {
    marginLeft: '16px'
  },
  closeButton: {
    paddingHorizontal: '16px',
    paddingVertical: '8px'
  },
  modalContainer: {
    paddingHorizontal: '16px',
    paddingVertical: '16px'
  },
  footerContainer: {
    paddingHorizontal: '16px',
    paddingBottom: '16px'
  }
})

export default forwardRef(Modal)
