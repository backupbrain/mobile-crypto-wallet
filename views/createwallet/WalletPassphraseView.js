import React, { useState, useRef } from 'react'
import { View, StyleSheet } from 'react-native'
import Screen from '../../components/Screen'
import BodyText from '../../components/text/BodyText'
import CreateNewPasswordInput from '../../components/inputs/CreateNewPasswordInput'
import ActivityButton from '../../components/buttons/ActiveButton'
import translate from '../../translations'
import PassphraseManager from '../../utils/PassphraseManager'
import { useTheme } from '@react-navigation/native'
import PasswordInput from '../../components/inputs/PasswordInput'

const WalletPassphraseView = ({ navigation, route }) => {
    const { dimensions } = useTheme()
    const passphraseManager = useRef(new PassphraseManager())
    const [passphrase, setPassphrase] = useState('')

    const savePassphrase = (passphrase) => {
        passphraseManager.current.set(passphrase)
    }

    const styles = StyleSheet.create({
        screen: {
            paddingHorizontal: dimensions.screen.paddingHorizontal,
            paddingVertical: dimensions.screen.paddingVertical
        },
        inputContainer: {
            paddingVertical: dimensions.paddingVertical
        }
    })

    const _onPasswordChangeHandler = (text) => {
        setPassphrase(text)
    }

    const _onActivityPressHandler = () => {
        savePassphrase(passphrase)
        // TODO : load wallet with passphrase
        navigation.reset({
            index: 0,
            routes: [{ name: 'FirstViewSet' }],
        });
    }

    return (
        <Screen>
            <View style={styles.screen}>
                <BodyText>{translate('walletPassphraseIntro')}</BodyText>
                <View style={styles.inputContainer}>
                    <PasswordInput
                        placeholder={translate('enterPassphrase')}
                        onChangeText={_onPasswordChangeHandler}
                        help={translate('enterPassphraseHelp')}
                    />
                </View>
                <ActivityButton
                    title={translate('next')}
                    onPress={_onActivityPressHandler}
                    disabled={!passphrase}
                />
            </View>
        </Screen>
    )
}

export default WalletPassphraseView
