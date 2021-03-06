import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef, useCallback } from 'react'
import { Animated, View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import Close from './images/Close'
import HeaderText from './text/HeaderText'
import { useTheme } from '@react-navigation/native'
import { BlurView } from '@react-native-community/blur'

const useComponentSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 })
  const onLayout = useCallback(event => {
    const { width, height } = event.nativeEvent.layout
    setSize({ width, height })
  }, [])

  return [size, onLayout]
}

const Modal = (props, ref) => {
  const { colors, dimensions } = useTheme()
  const fadeAnim = useRef(new Animated.Value(0)).current
  const [isVisible, setIsVisible] = useState(false)
  const [closeButtonDimensions, onCloseButtonLayout] = useComponentSize()
  const [useNativeDriver] = useState(Platform.OS !== 'web')

  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

  useEffect(() => {
    if (props.open === true) {
      setIsVisible(true)
      fadeIn()
    }
  }, [setIsVisible, props.open])
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
      duration: 100,
      useNativeDriver: useNativeDriver
    }).start()
  }

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: useNativeDriver
    }).start(({ finished }) => {
      setIsVisible(false)
    })
  }

  const styles = StyleSheet.create({
    container: {
      // zIndex: 1000,
      flex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    },
    background: {
      // backgroundColor: colors.modal.overlayBackgroundColor,
      // width: '100%',
      flex: 1,
      justifyContent: 'center',
      paddingVertical: 16,
      paddingHorizontal: 20
    },
    modal: {
      backgroundColor: colors.modal.backgroundColor,
      borderRadius: dimensions.modal.borderRadius
    },
    modalTitle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    },
    modalText: {
      textAlign: dimensions.modal.titleTextAlign,
      marginLeft: closeButtonDimensions.width,
      marginRight: 0,
      color: colors.bodyText.color,
      fontWeight: dimensions.modal.titleFontWeight,
      fontSize: dimensions.modal.titleFontSize
    },
    headerText: {
      textAlign: dimensions.headers.textAlign,
      marginBottom: dimensions.navHeader.paddingBottom,
      paddingTop: dimensions.modal.headerPaddingTop,
      flexGrow: 1
    },
    headerLeft: {
      width: closeButtonDimensions.width
    },
    closeButton: {
      paddingHorizontal: dimensions.inputs.paddingHorizontal,
      paddingVertical: dimensions.inputs.paddingVertical
    },
    modalContainer: {
      paddingHorizontal: dimensions.screen.paddingHorizontal,
      paddingVertical: dimensions.screen.paddingVertical
    },
    footerContainer: {
      paddingHorizontal: dimensions.screen.paddingHorizontal,
      paddingVertical: dimensions.screen.paddingVertical
    }
  })

  return (
    <>
      {isVisible &&
        <View style={[styles.container, props.style]}>
          <AnimatedBlurView blurAmount={10} style={[styles.background, props.backgroundStyle, { opacity: fadeAnim }]}>
            <Animated.View style={[styles.modal, props.modalStyle, { opacity: fadeAnim }]}>
              {
                props.title &&
                  <View style={styles.modalTitle}>
                    <View style={styles.headerLeft} />
                    <HeaderText style={styles.headerText}>{props.title}</HeaderText>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onLayout={onCloseButtonLayout}
                      onPress={close}
                    >
                      <Close color={colors.text} size='16' />
                    </TouchableOpacity>
                  </View>
              }
              <View style={styles.modalContainer}>
                {
                  props.children
                }
              </View>
            </Animated.View>
          </AnimatedBlurView>
        </View>}
    </>
  )
}

export default forwardRef(Modal)
