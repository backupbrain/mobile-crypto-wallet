import React, { forwardRef } from 'react'
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import { useTheme } from '@react-navigation/native'

const SmallButton = (props, ref) => {
    const { colors, dimensions } = useTheme()

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.smallButton.backgroundColor,
            borderRadius: props.height / 2,
            height: props.height
        },
        button: {
            paddingHorizontal: dimensions.shortPadding,
            paddingVertical: dimensions.verticalSpacingBetweenItems
        }
    })

    return (
        <View style={[styles.container, props.style]} ref={ref}>
            <TouchableOpacity
                style={styles.button}
                onPress={props.onPress}
                onPressIn={props.onPressIn}
                onPressOut={props.onPressOut}
                onLongPress={props.onLongPress}
            >
                {props.children}
            </TouchableOpacity>
        </View>
    )
}

export default forwardRef(SmallButton)
