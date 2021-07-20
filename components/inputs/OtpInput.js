import * as React from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'

const OtpInput = (props) => {
  return (
    <View style={styles.container}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput style={styles.charInput} />
        <TextInput style={styles.charInput} />
        <TextInput style={styles.charInput} />
        <TextInput style={styles.charInput} />
        <TextInput style={styles.charInput} />
        <TextInput style={styles.charInput} />
      </View>
      {props.help && <Text style={styles.helpText}>{props.help}</Text>}
      {props.error && <Text style={styles.errorText}>{props.error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row'
  },
  charInput: {
    backgroundColor: '#F1F2F4',
    color: '#424A52',
    paddingHorizontal: '20px',
    paddingVertical: '16px',
    width: '100%',
    borderRadius: 6,
    marginRight: '10px'
  },
  label: {
    paddingBottom: '10px'
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

export default OtpInput
