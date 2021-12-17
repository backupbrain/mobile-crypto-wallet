import { useTheme } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import translate from '../translations'
import BodyText from './text/BodyText'
// import LinearGradient from 'react-native-linear-gradient';

const DEFAULT_STEP_NUMBER = 4
const DEFAULT_INITIAL_STEP = 0

const ProgressStepBar = ({ steps, activeStep, style }) => {
  const { colors, dimensions } = useTheme()
  const [currentStep] = useState(activeStep || DEFAULT_INITIAL_STEP)

  console.log(steps)
  console.log(activeStep)

  const StepsNumber = steps || DEFAULT_STEP_NUMBER

  const styles = StyleSheet.create({
    container: {
      width: dimensions.progressStepBar.width,
      alignItems: dimensions.progressStepBar.alignItems,
      marginBottom: dimensions.screen.paddingVertical
    },
    bar: {
      flexDirection: dimensions.progressStepBar.flexDirection,
      justifyContent: dimensions.progressStepBar.justifyContent,
      alignItems: dimensions.progressStepBar.alignItems
    },
    stepCircle: {
      width: dimensions.progressStepBar.step.width,
      height: dimensions.progressStepBar.step.height,
      borderRadius: dimensions.progressStepBar.step.borderRadius
    },
    stepLine: {
      width: dimensions.progressStepBar.path.width,
      height: dimensions.progressStepBar.path.height,
      backgroundColor: colors.progressStepBar.path.color
    },
    activeColor: {
      backgroundColor: colors.progressStepBar.step.activeBackgroundColor
    },
    inactiveColor: {
      backgroundColor: colors.progressStepBar.step.inactiveBackgroundColor
    },
    text: {
      fontSize: dimensions.progressStepBar.text.fontSize,
      marginTop: dimensions.progressStepBar.text.marginTop,
      paddingBottom: 5
    }
  })

  const getCircleStyle = (index) => {
    const circleStyle = [styles.stepCircle]
    if (index <= currentStep) {
      circleStyle.push(styles.activeColor)
    } else {
      circleStyle.push(styles.inactiveColor)
    }
    return circleStyle
  }

  const getLineStyle = (index) => {
    const lineStyle = [styles.stepLine]
    if (index < currentStep) {
      lineStyle.push(styles.activeColor)
    } else {
      lineStyle.push(styles.inactiveColor)
    }
    return lineStyle
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.bar}>
        {
          Array(StepsNumber).fill(0).map((_, index) => (
            <View style={styles.bar} key={index}>
              <View style={getCircleStyle(index)} />
              {
                index !== StepsNumber - 1 && <View style={getLineStyle(index)} />
              }
            </View>
          ))
        }
      </View>
      <BodyText style={styles.text}>
        {translate('progressHeaderText',
          {
            current: currentStep + 1,
            total: StepsNumber
          }
        )}
      </BodyText>
    </View>
  )
}

export default ProgressStepBar
