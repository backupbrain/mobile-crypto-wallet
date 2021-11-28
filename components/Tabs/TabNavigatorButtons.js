import { useTheme } from '@react-navigation/native';
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import translate from '../../translations';
import TabContactIcon from '../images/TabContactIcon';
import TabSettingsIcon from '../images/TabSettingsIcon';
import TabWalletIcon from '../images/TabWalletIcon';
import BodyText from '../text/BodyText';



const Tab = ({ route, index, state, descriptors, navigation, children }) => {
    const { options } = descriptors[route.key];
    const label = options.tabBarLabel !== undefined ?
        options.tabBarLabel
        : (options.title !== undefined ? options.title : route.name);

    const isFocused = state.index === index;

    const onPress = () => {
        const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
        }
    };

    const onLongPress = () => {
        navigation.emit({
            type: 'tabLongPress',
            target: route.key,
        });
    };

    const tabStyles = StyleSheet.create({
        tabs: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
        },
        text: {
            paddingTop: 3
        }
    })

    return (
        <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={tabStyles.tabs}
        >
            {children}
        </TouchableOpacity>
    );
}

const TabNavigatorButtons = ({ state, descriptors, navigation }) => {

    const { dimensions, colors } = useTheme()

    const styles = StyleSheet.create({
        tabsContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            /* height: dimensions.tabs.height, */
            width: '100%',
            paddingBottom: dimensions.tabs.bottomPadding,
            paddingTop: dimensions.tabs.topPadding,
        },
        text: {
            paddingTop: 3
        }
    })

    const AvailableTabs = [
        {
            label: translate('wallet'),
            Icon: TabWalletIcon
        },
        {
            label: translate('contacts'),
            Icon: TabContactIcon
        },
        {
            label: translate('settings'),
            Icon: TabSettingsIcon
        }
    ]

    return (
        <View style={styles.tabsContainer}>
            {state.routes.map((route, index) => {
                const CurrentTab = AvailableTabs[index]
                const isFocused = state.index === index;
                const tabStyles = StyleSheet.create({

                    text: {
                        paddingTop: 3,
                        color: isFocused ? colors.primaryButton.backgroundColor : colors.text
                    }
                })
                return (
                    <Tab route={route} index={index} state={state} descriptors={descriptors} navigation={navigation}>
                        <CurrentTab.Icon color={isFocused ? colors.primaryButton.backgroundColor : colors.text} />
                        <BodyText style={tabStyles.text}>{CurrentTab.label}</BodyText>
                    </Tab>
                )
            })}
        </View>
    );
}

export default TabNavigatorButtons
