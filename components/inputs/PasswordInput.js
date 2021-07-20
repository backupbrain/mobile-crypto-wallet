import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react'
import { Text, TextInput, View, StyleSheet } from 'react-native'
import translate from '../../translations'

const PasswordInput = (props, ref) => {
  const textRef = useRef()
  const [text, setText] = useState('')
  const [doHide, setDoHide] = useState(true)
  let doHidePassword = true
  useImperativeHandle(ref, () => ({
    clear: () => textRef.current.clear()
  }))
  return (
    <View style={styles.object}>
      <View style={styles.container}>
        <TextInput
          ref={textRef}
          secureTextEntry={doHide}
          style={styles.textInput}
          placeholder={props.placeholder}
          value={text}
          onChangeText={(text) => {
            if (props.maxLength && props.maxLength > 0) {
              text = text.substr(0, props.maxLength)
            }
            setText(text)
            if (props.onChangeText) {
              props.onChangeText(text)
            }
          }}
        />
        <Text
          style={styles.showHideButton}
          onPress={() => {
            setDoHide(!doHide)
            doHidePassword = !doHidePassword
          }}
        >
          {doHide ? translate('show') : translate('hide')}
        </Text>
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
  showHideButton: {
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

export default forwardRef(PasswordInput)
