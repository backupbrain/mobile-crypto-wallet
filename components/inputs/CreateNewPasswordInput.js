import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react'
import { Text } from 'react-native'
import PasswordInput from './PasswordInput'
import translate from '../../translations'

const CreateNewPasswordInput = (props, ref) => {
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
  return (
    <>
      <Text>{_doPasswordsMatch}</Text>
      <PasswordInput
        ref={password1Ref}
        maxLength={props.maxLength}
        placeholder={props.passwordPlaceholder}
        onChangeText={(text) => {
          setNewPassword(text)
          verifyPasswordMatch(text, verificationPassword)
          if (props.onPasswordChangeText) {
            props.onPasswordChangeText(text)
          }
        }}
        help={props.passwordHelp}
      />
      <PasswordInput
        ref={password2Ref}
        maxLength={props.maxLength}
        placeholder={props.passwordVerifyPlaceholder}
        onChangeText={(text) => {
          setVerificationPassword(text)
          verifyPasswordMatch(newPassword, text)
          if (props.onPasswordVerifyChangeText) {
            props.onPasswordVerifyChangeText(text)
          }
        }}
        help={passwordVerifyHelpText}
        error={_doPasswordsMatch === false ? translate('passwordVerifyError') : null}
      />
    </>
  )
}

export default forwardRef(CreateNewPasswordInput)