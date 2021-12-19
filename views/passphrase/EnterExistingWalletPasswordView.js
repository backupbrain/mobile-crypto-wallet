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
import ProgressStepBar from '../../components/ProgressStepBar'

const WalletPassphraseView = ({ navigation, route }) => {
    const { dimensions } = useTheme()
    const passphraseManager = useRef(new PassphraseManager())
    const [passphrase, setPassphrase] = useState('')

    const savePassphrase = (passphrase) => {
        passphraseManager.current.set(passphrase)
    }

    const styles = StyleSheet.create({
        screen: {
            paddingHorizontal: dimensions.screens.horizontal,
            paddingBottom: dimensions.screens.bottomPadding,
            paddingTop: dimensions.screens.topPadding,
            flex: 1,
            justifyContent: 'space-between'
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
        /* navigation.reset({
            index: 0,
            routes: [{ name: 'FirstViewSet' }],
        }); */
        navigation.push('CreatePinView', { from: 'load' })
    }

    return (
        <Screen>
            <View style={styles.screen}>
                <View>
                    <ProgressStepBar steps={3} activeStep={1} />
                    <BodyText>{translate('walletPassphraseIntro')}</BodyText>
                    <View style={styles.inputContainer}>
                        <PasswordInput
                            placeholder={translate('enterPassphrase')}
                            onChangeText={_onPasswordChangeHandler}
                            help={translate('enterPassphraseHelp')}
                        />
                    </View>
                </View>
                <View>
                    <ActivityButton
                        title={translate('next')}
                        onPress={_onActivityPressHandler}
                        disabled={!passphrase}
                    />
                </View>
            </View>
        </Screen>
    )
}

export default WalletPassphraseView
