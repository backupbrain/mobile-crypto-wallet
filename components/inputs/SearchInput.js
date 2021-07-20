import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'

const hasText = (text) => {
  return (text !== '' && hasText != null)
}

const SearchInput = (props) => {
  const [text, setText] = useState('')
  return (
    <View style={styles.object}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder={props.placeholder}
          value={text}
          onChangeText={(text) => setText(text)}
        />
        {hasText(text) &&
          <Text
            style={styles.closeButton}
            onPress={() => {
              setText('')
            }}
          >
            X
          </Text>}
      </View>
      {props.help && <Text style={styles.helpText}>{props.help}</Text>}
      {props.error && <Text style={styles.errorText}>{props.error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  object: {
    paddingBottom: '16px',
    width: '100%'
  },
  container: {
    backgroundColor: '#F1F2F4',
    color: '#424A52',
    paddingHorizontal: '0px',
    paddingVertical: '0px',
    width: '100%',
    borderRadius: 6,
    flex: 1,
    flexDirection: 'row'
  },
  textInput: {
    flexGrow: 1,
    paddingVertical: '16px',
    paddingLeft: '20px'
  },
  closeButton: {
    color: '#4174DE',
    paddingVertical: '16px',
    paddingRight: '20px',
    paddingLeft: '10px'
  },
  helpText: {
    color: '#666',
    paddingTop: '10px',
    paddingHorizontal: '6px'
  },
  errorText: {
    color: '#600',
    paddingTop: '10px',
    paddingHorizontal: '6px'
  }
})

export default SearchInput
