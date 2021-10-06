import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import { Animated, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Close from './images/Close'
import { useTheme } from '@react-navigation/native'

const AlertBanner = (props, ref) => {
  const { colors, dimensions } = useTheme()
  const fadeAnim = useRef(new Animated.Value(0)).current
  const [isAltered, setIsAltered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [paddingRight, setPaddingRight] = useState(dimensions.screen.paddingHorizontal)
  const variant = props.variant || 'success'
  useEffect(() => {
    if (!props.noclose) {
      setPaddingRight(0)
    }
    if (props.visible) {
      if (!isAltered) {
        setIsVisible(true)
        fadeIn()
      }
    }
  }, [props.visible, setIsVisible, setIsAltered, isAltered, setPaddingRight])

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

  const styles = StyleSheet.create({
    container: {
      width: '100%'
    },
    banner: {
      borderRadius: dimensions.alertBanner.borderRadius,
      width: dimensions.alertBanner.width,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: colors.alertBanner.boxShadow,
      marginHorizontal: dimensions.alertBanner.marginHorizontal
    },
    successContainer: {
      backgroundColor: colors.alertBanner.successBackgroundColor
    },
    warningContainer: {
      backgroundColor: colors.alertBanner.warningBackgroundColor
    },
    dangerContainer: {
      backgroundColor: colors.alertBanner.dangerBackgroundColor
    },
    infoContainer: {
      backgroundColor: colors.alertBanner.infoBackgroundContainer
    },
    textStyle: {
      flexGrow: 1,
      color: colors.alertBanner.color,
      textAlign: dimensions.alertBanner.textAlign,
      paddingVertical: dimensions.screen.paddingVertical,
      paddingHorizontal: dimensions.screen.paddingHorizontal,
      /* paddingRight: paddingRight */
    },
    closeButton: {
      paddingVertical: dimensions.verticalSpacingBetweenItems,
      paddingHorizontal: dimensions.horizontalSpacingBetweenItems,
      paddingRight: dimensions.screen.paddingHorizontal
    }
  })

  const getStyles = () => {
    const bannerStyle = [styles.banner]
    switch (variant) {
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

  const _onCloseHandler = () => {
    close()
    if (props.onClose) {
      props.onClose()
    }
  }

  return (
    <Animated.View style={[styles.container, props.styles, { opacity: fadeAnim }]}>
      {isVisible &&
        <View style={getStyles()}>
          <Text style={styles.textStyle}>{props.label}</Text>
          {props.onClose &&
            <TouchableOpacity
              onPress={_onCloseHandler}
            >
              <View style={styles.closeButton}>
                <Close size={16} color={colors.alertBanner.color} />
              </View>
            </TouchableOpacity>}
        </View>}
    </Animated.View>
  )
}

export default forwardRef(AlertBanner)
