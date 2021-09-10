import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Screen from '../../components/Screen'
import BodyText from '../../components/text/BodyText'
import OtpInput from '../../components/inputs/OtpInput'
import ActiveButton from '../../components/buttons/ActiveButton'
import translate from '../../translations'
import { useTheme } from '@react-navigation/native'
import TwoFactorAuth from '../../utils/TwoFactorAuth'

const Unpair2FaDeviceView = ({ navigation, route }) => {
    const { dimensions } = useTheme()
    const [isPinValid, setIsPinValid] = useState(false)
    const [secret, setSecret] = useState('')
    const styles = StyleSheet.create({
        screen: {
            paddingHorizontal: dimensions.screen.paddingHorizontal,
            paddingVertical: dimensions.screen.paddingVertical
        },
        otpInput: {
            paddingVertical: dimensions.screen.paddingVertical
        }
    })

    useEffect(() => {
        TwoFactorAuth.getPairingCode().then(value => {
            if(value){
                setSecret(value)
            }else {
                navigation.replace('Pair2FaDeviceView')
            }
        })
    },[])

    return (
        <Screen>
            <View style={styles.screen}>
                <BodyText style={styles.text}>{translate('unpair2FaIntro')}</BodyText>
                <View style={styles.otpInput}>
                    <OtpInput
                        error={translate('invalidPin')}
                        onValidPin={() => {
                            setIsPinValid(true)
                        }}
                        onInvalidPin={() => {
                            setIsPinValid(false)
                        }}
                        secret={secret}
                        help={translate('Enter2FACode')}
                    />
                </View>
                <View style={styles.container}>
                    <ActiveButton
                        title={translate('next')}
                        onPress={() => {
                            navigation.push('Pair2FaDeviceView')
                        }}
                        disabled={!isPinValid}
                    />
                </View>
            </View>
        </Screen>
    )
}

export default Unpair2FaDeviceView
