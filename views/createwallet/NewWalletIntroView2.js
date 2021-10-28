import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ActivityButton from '../../components/buttons/ActiveButton'
import BodyText from '../../components/text/BodyText'
import { useTheme } from '@react-navigation/native'
import translate from '../../translations'
import InfoIcon from '../../components/images/InfoIcon'
import Screen from '../../components/Screen'
import DotPinFilled from '../../components/images/DotPinFilled'

const NewWalletIntroView2 = ({ navigation, route }) => {
    const { colors, dimensions } = useTheme()

    const styles = StyleSheet.create({
        screen: {
            flex: 1,
            paddingHorizontal: dimensions.screen.paddingHorizontal,
            paddingVertical: dimensions.screen.paddingVertical,
            justifyContent: 'space-between'
        },
        paragraph: {
            fontSize: 16
        },
        textBlock: {
            paddingBottom: 25
        },
        headerText: {
            fontWeight: dimensions.headerText.fontWeight,
            fontSize: 20,
            color: colors.text
        },
        topTextContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 50,
            marginBottom: 20
        },
        textContainer: {

        },
        bullets: {
            flexDirection: 'row',
            paddingLeft: dimensions.verticalSpacingBetweenItems
        },
        button: {
            paddingBottom: dimensions.verticalSpacingBetweenItems
        }
    })


    return (
        <Screen>
            <View style={styles.screen}>
                <View style={styles.textContainer}>
                    <View style={styles.topTextContainer}>
                        <BodyText style={styles.headerText}>{translate('manual')}</BodyText>
                        <InfoIcon color={colors.text} />
                    </View>
                    <View style={styles.textBlock}>
                        <BodyText style={styles.paragraph}>{translate('seedPhraseIntro')}</BodyText>
                    </View>
                    <View style={styles.textBlock}>
                        <BodyText style={styles.paragraph}>{translate('risksAre')}</BodyText>
                        <View style={styles.bullets}>
                            <DotPinFilled color={colors.text} />
                            <BodyText style={styles.paragraph}>{translate('risk1')}</BodyText>
                        </View>
                        <View style={styles.bullets}>
                            <DotPinFilled color={colors.text} />
                            <BodyText style={styles.paragraph}>{translate('risk2')}</BodyText>
                        </View>
                        <View style={styles.bullets}>
                            <DotPinFilled color={colors.text} />
                            <BodyText style={styles.paragraph}>{translate('risk3')}</BodyText>
                        </View>
                    </View>
                    <View style={styles.textBlock}>
                        <BodyText style={styles.paragraph}>{translate('tipsAre')}</BodyText>
                        <View style={styles.bullets}>
                            <DotPinFilled color={colors.text} />
                            <BodyText style={styles.paragraph}>{translate('tip1')}</BodyText>
                        </View>
                        <View style={styles.bullets}>
                            <DotPinFilled color={colors.text} />
                            <BodyText style={styles.paragraph}>{translate('tip2')}</BodyText>
                        </View>
                        <View style={styles.bullets}>
                            <DotPinFilled color={colors.text} />
                            <BodyText style={styles.paragraph}>{translate('tip3')}</BodyText>
                        </View>
                    </View>
                </View>
                <ActivityButton
                    title={translate('next')}
                    onPress={() => navigation.push('CreateNewWalletView')}
                    style={styles.button}
                />
            </View>
        </Screen>
    )
}

export default NewWalletIntroView2
