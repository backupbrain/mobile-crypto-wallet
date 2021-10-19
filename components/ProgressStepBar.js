import { useTheme } from '@react-navigation/native';
import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import BodyText from './text/BodyText';

const DEFAULT_STEP_NUMBER = 4
const DEFAULT_INITIAL_STEP = 0

const ProgressStepBar = ({ steps, activeStep, style }) => {
    const { colors, dimensions } = useTheme()
    const [currentStep, setCurrentStep] = useState(activeStep || DEFAULT_INITIAL_STEP)

    const StepsNumber = steps || DEFAULT_STEP_NUMBER

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            alignItems: 'center',
            marginBottom: dimensions.screen.paddingVertical
        },
        bar: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
        stepCircle: {
            width: 10,
            height: 10,
            borderRadius: 5,
        },
        stepLine: {
            width: 60,
            height: 2,
            backgroundColor: 'white'
        },
        activeColor: {
            backgroundColor: colors.bodyText.color
        },
        inactiveColor: {
            backgroundColor: '#202832'
        },
        text: {
            fontSize: 14,
            marginTop: 10
        }
    })

    const getCircleStyle = (index) => {
        let circleStyle = [styles.stepCircle]

        if (index <= currentStep)
            circleStyle.push(styles.activeColor)
        else
            circleStyle.push(styles.inactiveColor)


        return circleStyle
    }

    const getLineStyle = (index) => {
        let lineStyle = [styles.stepLine]

        if (index < currentStep)
            lineStyle.push(styles.activeColor)
        else
            lineStyle.push(styles.inactiveColor)

        return lineStyle
    }

    return (
        <View style={[styles.container, style]}>
            <View style={styles.bar}>
                {
                    Array(StepsNumber).fill(0).map((_, index) =>
                    (
                        <>
                            <View style={getCircleStyle(index)} />
                            {
                                index !== StepsNumber - 1 && <View style={getLineStyle(index)} />
                            }
                        </>
                    )
                    )
                }
            </View>
            <BodyText style={styles.text}>Step {currentStep + 1} of {StepsNumber}</BodyText>
        </View>
    )
};

export default ProgressStepBar