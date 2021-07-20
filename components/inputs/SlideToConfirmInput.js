import React, { useRef, useState, useCallback } from 'react'
import { Animated, StyleSheet, View, Text } from 'react-native'
import { Entypo } from '@expo/vector-icons'

const useComponentSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 })
  const onLayout = useCallback(event => {
    const { width, height } = event.nativeEvent.layout
    setSize({ width, height })
  }, [])

  return [size, onLayout]
}

const SlideToConfirmInput = (props) => {
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
      style={troughStyle}
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

const styles = StyleSheet.create({
  trough: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 6
  },
  troughEnabled: {
    border: '1px solid #D4D9DE'
  },
  troughDisabled: {
    border: '1px solid #ccc'
  },
  troughText: {
    width: '100%',
    textAlign: 'center',
    paddingLeft: '20px',
    paddingVertical: '16px'
  },
  troughEnabledText: {
    color: '#000'
  },
  troughDisabledText: {
    color: '#ccc'
  },
  slider: {
    paddingVertical: '16px',
    paddingHorizontal: '20px',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sliderEnabled: {
    backgroundColor: '#4174DE'
  },
  sliderDisabled: {
    borderLeft: '1px solid #ccc'
  },
  sliderText: {
    fontWeight: 'bold'
  },
  sliderEnabledText: {
    color: '#fff'
  },
  sliderDisabledText: {
    color: '#ccc'
  }
})

export default SlideToConfirmInput
