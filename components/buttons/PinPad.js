import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'

const PinPad = (props) => {
  const { colors } = useTheme()
  const rows = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ]
  const onKeyPress = (key) => {
    if (props.onKeyPress) {
      props.onKeyPress(key)
    }
  }
  const onDelete = () => {
    if (props.onDelete) {
      props.onDelete()
    }
  }

  const styles = StyleSheet.create({
    container: {

    },
    row: {
      flexDirection: 'row'
    },
    buttonContainer: {
      width: '33%',
      alignItems: 'center'
    },
    button: {
      borderRadius: '50%'
    },
    buttonText: {
      fontSize: '120%',
      padding: '20px',
      marginTop: '16px',
      color: colors.bodyText.color
    }
  })

  return (
    <View style={styles.container}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key, keyIndex) => (
            <View key={keyIndex} style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={onKeyPress.bind(this,key)}
              >
                <Text style={styles.buttonText}>{key}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ))}
      <View style={styles.row}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} disabled>
            <Text style={styles.buttonText}>&nbsp;</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={onKeyPress.bind(this,0)}
          >
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={onDelete}
          >
            <Text style={styles.buttonText}>&lt;</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default PinPad
