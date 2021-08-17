import React, { useState, useEffect } from 'react';
import { Platform, Pressable, Text } from 'react-native';
import {
    Octicons, FontAwesome, MaterialCommunityIcons, Entypo
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { openURL } from 'expo-linking';
import * as Clipboard from 'expo-clipboard';
import BottomDrawer from '../../BottomDrawer';
import { useColorPalette } from '../../../helpers/hooks';
import styles from './styles';

export default function Menu({ viewRef, url, source }) {
    const [isModalVisible, setModalVisible] = useState(false);
    const colorPalette = useColorPalette();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Octicons
                    name="kebab-horizontal"
                    size={24}
                    color={colorPalette.primary}
                    style={{ padding: 5 }}
                    onPress={() => setModalVisible(true)}
                />
            ),
        });
    }, []);

    const options = [
        {
            text: 'Refresh',
            IconPackage: FontAwesome,
            iconName: 'refresh',
            callback: () => viewRef?.current?.reload()
        },
        {
            text: 'Channel Preview',
            IconPackage: FontAwesome,
            iconName: 'arrow-right',
            callback: () => navigation.navigate('ChannelPreview', {
                source,
                type: 'source'
            })
        },
        {
            text: Platform.OS === 'ios' ? 'Open in Safari' : 'Open in Browser',
            IconPackage: MaterialCommunityIcons,
            iconName: Platform.OS === 'ios' ? 'compass-outline' : 'web',
            callback: () => openURL(url)
        },
        {
            text: 'Copy Link',
            IconPackage: Entypo,
            iconName: 'link',
            callback: () => Clipboard.default.setString(url)
        }
    ];

    return (
        <BottomDrawer
            isOpen={isModalVisible}
            toggleOpen={setModalVisible}
            containerStyles={[
                styles.menu,
                {
                    backgroundColor: colorPalette.headerBackground
                }
            ]}
            // eslint-disable-next-line indent
        >
            {options.map(({
                text,
                IconPackage,
                iconName,
                callback
            }, index) => (
                <Pressable
                    key={index.toString()}
                    style={styles.option}
                    onPress={() => {
                        callback();
                        setModalVisible(false);
                    }}
                >
                    <Text style={[styles.optionText, { color: colorPalette.primary }]}>{text}</Text>
                    <IconPackage
                        name={iconName}
                        size={20}
                        color={colorPalette.primary}
                    />
                </Pressable>
            ))}
        </BottomDrawer>
    );
}
