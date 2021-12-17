import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import BodyText from '../text/BodyText'
import CheckboxChecked from '../images/CheckboxChecked'
import { useTheme } from '@react-navigation/native'

const getCheckboxStyle = (isChecked) => {
  if (isChecked) {
    return 'checked'
  } else {
    return 'unchecked'
  }
}

const Checkbox = (props) => {
  const { colors, dimensions } = useTheme()
  // const isDisabled = props.disabled
  const [isChecked, setIsChecked] = useState(props.checked)

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginBottom: dimensions.checkbox.marginBottom
    },
    label: {
      paddingLeft: dimensions.checkbox.labelPaddingLeft,
      width: '95%'
    }
  })

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        const newValue = !isChecked
        setIsChecked(newValue)
        props.onValueChange(newValue)
        console.log(`new value: ${newValue}`)
      }}
    >
      <CheckboxChecked
        fillColor={colors.checkbox[getCheckboxStyle(isChecked)].fillColor}
        lineColor={colors.checkbox[getCheckboxStyle(isChecked)].lineColor}
        checkColor={colors.checkbox[getCheckboxStyle(isChecked)].checkColor}
      />
      <BodyText
        style={styles.label}
      >
        {props.label}
      </BodyText>
    </TouchableOpacity>
  )
}

export default Checkbox
