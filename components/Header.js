import React, { useState } from 'react'
import ProgressStepBar from './ProgressStepBar'
import HeaderText from './text/HeaderText'
import { View, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import HeaderBackButton from './buttons/HeaderBackButton'

const Header = ({ navigation, route, options, back }) => {
  const { colors, dimensions } = useTheme()
  const [backButtonDimensions, setBackButtonDimensions] = useState({ width: 0, height: 0 })
  console.log('back!!')
  console.log(back)

  const styles = StyleSheet.create({
    container: {
      paddingTop: dimensions.screen.paddingTop,
      // borderWidth: 1,
      // borderColor: '#fff',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    progressBar: {
      paddingTop: dimensions.navHeader.textPaddingTop
    },
    backButtonContainer: {
      justifyContent: 'flex-end'
    },
    backButton: {
      paddingTop: dimensions.navHeader.paddingBottom,
      paddingBottom: dimensions.navHeader.paddingBottom
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
      flexGrow: 1
    },
    headerText: {
      paddingTop: dimensions.navHeader.textPaddingTop,
      textAlign: dimensions.headers.textAlign,
      marginBottom: dimensions.navHeader.paddingBottom
    },
    rightButtonContainer: {
      justifyContent: 'flex-end',
      // borderWidth: 1,
      // borderColor: '#ff0',
      width: backButtonDimensions.width
    }
  })

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout
        console.log(`View(${width}, ${height})`)
      }}
    >
      <View
        style={styles.backButtonContainer}
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout
          setBackButtonDimensions({ width, height })
          console.log(`setBackButtonDimensions(${width}, ${height})`)
        }}
      >
        {back &&
          <HeaderBackButton
            color={colors.headerBackButton.color}
            size={dimensions.headerBackButton.height}
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          />}
      </View>
      <View style={styles.center}>
        {options.progressShown &&
          <ProgressStepBar
            steps={options.progressSteps}
            activeStep={options.progressActiveStep}
            style={styles.progressBar}
          />}
        <HeaderText style={styles.headerText}>{options.title}</HeaderText>
      </View>
      <View style={styles.rightButtonContainer}>
        {options.headerRight}
      </View>
    </View>
  )
}

export default Header
