import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import PasswordInput from './PasswordInput'
import translate from '../../translations'
import { useTheme } from '@react-navigation/native'

const CreateNewPasswordInput = (props, ref) => {
  const { dimensions } = useTheme()
  const password1Ref = useRef()
  const password2Ref = useRef()
  const [newPassword, setNewPassword] = useState('')
  const [verificationPassword, setVerificationPassword] = useState('')
  const [_doPasswordsMatch, setDoPasswordsMatch] = useState(null)
  let passwordVerifyHelpTextPrimer = translate('verifyPasswordHelpText')
  if (props.passwordVerifyHelp !== undefined && props.passwordVerifyHelp !== null) {
    passwordVerifyHelpTextPrimer = props.passwordVerifyHelp
  }
  const passwordVerifyHelpText = _doPasswordsMatch !== false ? passwordVerifyHelpTextPrimer : null
  const verifyPasswordMatch = (password1, password2) => {
    let doPasswordsMatch = null
    if (password1.length > 0 && password2.length > 0) {
      doPasswordsMatch = password1 === password2
    }
    setDoPasswordsMatch(doPasswordsMatch)
    if (props.onPasswordsMatch) {
      return props.onPasswordsMatch(doPasswordsMatch, password1)
    }
  }
  useImperativeHandle(ref, () => ({
    clear: () => {
      password1Ref.current.clear()
      password2Ref.current.clear()
    }
  }))

  const styles = StyleSheet.create({
    passwordVerifyStyle: {
      marginTop: dimensions.paddingVertical
    }
  })

  const _onChangePassword1 = (text) => {
    setNewPassword(text)
    verifyPasswordMatch(text, verificationPassword)
    if (props.onPasswordChangeText) {
      props.onPasswordChangeText(text)
    }
  }

  const _onChangePassword2 = (text) => {
    setVerificationPassword(text)
    verifyPasswordMatch(newPassword, text)
    if (props.onPasswordVerifyChangeText) {
      props.onPasswordVerifyChangeText(text)
    }
  }

  return (
    <View style={props.style}>
      <Text>{_doPasswordsMatch}</Text>
      <PasswordInput
        ref={password1Ref}
        maxLength={props.maxLength}
        label={props.passwordLabel}
        placeholder={props.passwordPlaceholder}
        onChangeText={_onChangePassword1}
        help={props.passwordHelp}
      />
      <PasswordInput
        style={styles.passwordVerifyStyle}
        ref={password2Ref}
        maxLength={props.maxLength}
        label={props.passwordVerifyLabel}
        placeholder={props.passwordVerifyPlaceholder}
        onChangeText={_onChangePassword2}
        help={passwordVerifyHelpText}
        error={_doPasswordsMatch === false ? translate('passwordVerifyError') : null}
      />
    </View>
  )
}

export default forwardRef(CreateNewPasswordInput)
