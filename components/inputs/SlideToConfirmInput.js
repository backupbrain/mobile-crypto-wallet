import React, { useRef, useState, useCallback } from 'react'
import { Animated, StyleSheet, View, Text } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'

const useComponentSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 })
  const onLayout = useCallback(event => {
    const { width, height } = event.nativeEvent.layout
    setSize({ width, height })
  }, [])

  return [size, onLayout]
}

const SlideToConfirmInput = (props) => {
  const { colors, dimensions } = useTheme()
  const isDisabled = props.disabled || false
  const [initialPosition, setInitialPosition] = useState(0)
  const [xValue, setXValue] = useState(0)
  const [, setIsTouchDown] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const [containerDimensions, onContainerLayout] = useComponentSize()
  const [sliderDimensions, onSliderLayout] = useComponentSize()

  const containerRef = useRef()
  const sliderRef = useRef()

  const resetSlider = (props) => {
    setXValue(0)
  }

  const styles = StyleSheet.create({
    trough: {
      width: dimensions.button.width,
      justifyContent: 'flex-end',
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: dimensions.button.borderRadius
    },
    troughEnabled: {
      borderColor: colors.slider.borderColor,
      borderWidth: dimensions.button.borderWidth
    },
    troughDisabled: {
      borderColor: colors.disabledButton.borderColor,
      borderWidth: dimensions.button.borderWidth
    },
    troughText: {
      width: '100%',
      textAlign: 'center',
      paddingLeft: sliderDimensions.width,
      paddingVertical: dimensions.button.paddingVertical
    },
    troughEnabledText: {
      color: colors.primaryButton.color
    },
    troughDisabledText: {
      color: colors.disabledButton.color
    },
    slider: {
      textAlign: dimensions.button.textAlign,
      paddingHorizontal: dimensions.button.paddingHorizontal,
      paddingVertical: dimensions.button.paddingVertical,
      width: dimensions.button.width,
      borderRadius: dimensions.button.borderRadius,
      borderWidth: dimensions.button.borderWidth,
      borderColor: colors.primaryButton.borderColor
    },
    sliderEnabled: {
      backgroundColor: colors.primaryButton.backgroundColor
    },
    sliderDisabled: {
      borderWidth: dimensions.button.borderWidth,
      borderColor: colors.disabledButton.borderColor
    },
    sliderText: {
      textTransform: dimensions.button.textTransform,
      fontWeight: dimensions.button.fontWeight
    },
    sliderEnabledText: {
      color: colors.primaryButton.color
    },
    sliderDisabledText: {
      color: colors.disabledButton.color
    }
  })

  const troughStyle = [styles.trough]
  const troughTextSyle = [styles.troughText]
  const sliderStyle = [styles.slider]
  const sliderTextStyle = [styles.sliderText]
  if (isDisabled) {
    troughStyle.push(styles.troughDisabled)
    troughTextSyle.push(styles.troughDisabledText)
    sliderStyle.push(styles.sliderDisabled)
    sliderTextStyle.push(styles.sliderDisabledText)
  } else {
    troughStyle.push(styles.troughEnabled)
    troughTextSyle.push(styles.troughEnabledText)
    sliderStyle.push(styles.sliderEnabled)
    sliderTextStyle.push(styles.sliderEnabledText)
  }

  return (
    <View
      style={[troughStyle, props.style]}
      ref={containerRef}
      onLayout={onContainerLayout}
    >
      <Text style={troughTextSyle}>{props.label}</Text>
      <View
        ref={sliderRef}
        onLayout={onSliderLayout}
        onStartShouldSetResponder={(evt) => !isComplete && !isDisabled}
        onMoveShouldSetResponder={(evt) => !isComplete && !isDisabled}
        onResponderMove={(evt) => {
          if (!isComplete) {
            let travel = -(evt.nativeEvent.locationX - initialPosition)
            const maxTravel = containerDimensions.width - (sliderDimensions.width)
            travel = Math.max(0, travel)
            travel = Math.min(maxTravel, travel)
            setXValue(travel)
            if (travel >= maxTravel) {
              setIsComplete(true)
            }
          }
        }}
        onResponderGrant={(evt) => {
          setIsComplete(false)
          setIsTouchDown(true)
          setInitialPosition(evt.nativeEvent.locationX)
        }}
        onResponderRelease={(evt) => {
          setIsTouchDown(false)
          if (!isComplete) {
            resetSlider()
          } else {
            if (props.onComplete) {
              props.onComplete()
            }
          }
        }}
        onResponderTerminationRequest={(evt) => false}
        onResponderTerminate={(evt) => {
          setIsTouchDown(false)
          if (!isComplete) {
            resetSlider()
          } else {
            if (props.onComplete) {
              props.onComplete()
            }
          }
        }}
      >
        <Animated.View
          style={[
            { transform: [{ translateX: -xValue }] },
            sliderStyle
          ]}
        >
          <Entypo
            name='chevron-small-left'
            size={24}
            color='white'
            style={[
              sliderTextStyle
            ]}
          />
        </Animated.View>
      </View>
    </View>
  )
}

export default SlideToConfirmInput
