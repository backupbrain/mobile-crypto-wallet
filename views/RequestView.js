import { useTheme } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Screen from '../components/Screen'
import BodyText from '../components/text/BodyText'
import translate from '../translations'
import AccountBalance from '../components/wallet/AccountBalance'
import ConversionIcon from '../components/images/ConversionIcon'
import AddressQrCode from '../components/wallet/AddressQrCode'
import SvgQRCode from 'react-native-qrcode-svg'
import ActiveButton from '../components/buttons/ActiveButton'
import CopyTabIcon from '../components/images/CopyTabIcon'
import ShareIcon from '../components/images/ShareIcon'
import ClipboardManager from '../utils/ClipboardManager'


const RequestView = ({ navigation, route }) => {

    const { dimensions, colors } = useTheme()
    const { address } = route.params
    const [inverted, setInverted] = useState(false)

    const styles = StyleSheet.create({
        screen: {
            paddingHorizontal: dimensions.screens.horizontal,
            paddingBottom: dimensions.screens.bottomPadding,
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1
        },
        balanceBox: {
            height: 180,
            width: '100%',
            borderRadius: 7,
            borderColor: colors.inputs.borderColor,
            borderWidth: 3,
            paddingHorizontal: dimensions.paddingVertical,
            paddingVertical: dimensions.shortPadding,
            alignItems: 'center',
            marginBottom: dimensions.paddingVertical
        },
        mypkt: {
            color: colors.disabledText,
            fontSize: 16,
            paddingBottom: dimensions.shortPadding,
            alignSelf: 'flex-start'
        },
        altAmount: {
            color: colors.disabledText,
            fontSize: 14,
            justifyContent: 'center'
        },
        addressText: {
            color: colors.disabledText,
            fontSize: 14,
            alignSelf: 'flex-start',
            marginTop: dimensions.shortPadding,
            marginBottom: dimensions.verticalSpacingBetweenItems
        },
        balance: {
            paddingBottom: dimensions.verticalSpacingBetweenItems
        },
        card: {
            alignItems: 'center',
            width: dimensions.addressCard.width + dimensions.verticalSpacingBetweenItems * 2,
            height: dimensions.addressCard.width + dimensions.verticalSpacingBetweenItems * 2,
            backgroundColor: colors.addressCard.backgroundColor,
            borderRadius: dimensions.addressCard.borderRadius,
            justifyContent: 'center',
            marginVertical: dimensions.shortPadding
        },
        pkt: {
            alignSelf: 'flex-start',
            marginBottom: dimensions.horizontalSpacingBetweenItems
        },
        button: {
            marginTop: dimensions.paddingVertical
        },
        tabText: {
            fontSize: 14,
            fontWeight: 700,
            textAlign: 'center'
        },
        tabs: {
            flexDirection: 'row',
            width: 250,
            justifyContent: 'space-around',
            marginTop: dimensions.paddingVertical
        },
        center: {
            justifyContent: 'center',
            alignItems: 'center'
        }
    })

    const openInBlockExplorer = (transaction) => {
        /* const url = `https://explorer.pkt.cash/tx/${transaction.txid}` */
        // TODO : Change this demo address
        const url = `https://explorer.pkt.cash/address/pkt1q6hqsqhqdgqfd8t3xwgceulu7k9d9w5t2amath0qxyfjlvl3s3u4sjza2g2`
        Linking.openURL(url).catch((err) => {
            console.log('error occurred trying to open in browser')
            console.log(err)
        })
    }

    return (
        <Screen>
            <View style={styles.screen}>
                <View style={styles.center}>
                    <View style={styles.balanceBox}>
                        <BodyText style={styles.mypkt}>{translate('mypkt') + ':'}</BodyText>
                        <AccountBalance
                            amount={address.total}
                            isVisible
                            style={styles.balance}
                            inverted={inverted}
                        />
                        <TouchableOpacity onPress={() => setInverted(!inverted)}>
                            <ConversionIcon />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.card}>
                        <SvgQRCode
                            value={address.address}
                            size={dimensions.addressCard.width}
                        />
                    </View>
                    <BodyText style={styles.addressText}>{translate('receiveAddress')}</BodyText>
                    <BodyText style={styles.pkt}>{address.address}</BodyText>
                    <ActiveButton
                        title={translate('openInBlockExplorer')}
                        onPress={openInBlockExplorer.bind(this)}
                        style={styles.button}
                    />
                </View>
                <View style={styles.tabs}>
                    <TouchableOpacity style={styles.center} onPress={() => ClipboardManager.set(address.address)}>
                        <CopyTabIcon />
                        <BodyText style={styles.tabText}>{translate('copy')}</BodyText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.center}>
                        <ShareIcon />
                        <BodyText style={styles.tabText}>{translate('share')}</BodyText>
                    </TouchableOpacity>
                </View>
            </View>
        </Screen>
    )
}

export default RequestView