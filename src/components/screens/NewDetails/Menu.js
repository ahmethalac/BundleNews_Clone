import React, { useState, useEffect, useRef } from 'react';
import {
    Platform, Pressable, Text, View
} from 'react-native';
import {
    Octicons, FontAwesome, MaterialCommunityIcons, Entypo
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { openURL } from 'expo-linking';
import * as Clipboard from 'expo-clipboard';
import BottomDrawer from '../../BottomDrawer';
import { useColorPalette, useTranslate } from '../../../helpers/hooks';
import styles from './styles';
import TemporaryModal from '../../TemporaryModal';

export default function Menu({ viewRef, url, source }) {
    const linkCopiedRef = useRef(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const colorPalette = useColorPalette();
    const navigation = useNavigation();
    const translate = useTranslate();

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
            text: translate('Refresh'),
            IconPackage: FontAwesome,
            iconName: 'refresh',
            callback: () => viewRef?.current?.reload()
        },
        {
            text: translate('Channel Preview'),
            IconPackage: FontAwesome,
            iconName: 'arrow-right',
            callback: () => navigation.navigate('ChannelPreview', {
                source,
                type: 'source'
            })
        },
        {
            text: Platform.OS === 'ios' ? translate('Open in Safari') : translate('Open in Browser'),
            IconPackage: MaterialCommunityIcons,
            iconName: Platform.OS === 'ios' ? 'compass-outline' : 'web',
            callback: () => openURL(url)
        },
        {
            text: translate('Copy Link'),
            IconPackage: Entypo,
            iconName: 'link',
            callback: () => {
                Clipboard.default.setString(url);
                linkCopiedRef?.current?.trigger();
            }
        }
    ];

    return (
        <View>
            <BottomDrawer
                isOpen={isModalVisible}
                toggleOpen={setModalVisible}
                containerStyles={[
                styles.menu,
                {
                    backgroundColor: colorPalette.headerBackground
                }
            ]}
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
            <TemporaryModal ref={linkCopiedRef}>
                <Text
                    style={{
                        color: '#DDD',
                        backgroundColor: '#222',
                        borderRadius: 20,
                        padding: 10,
                        zIndex: 100
                    }}
                >
                    {translate('Copied Link to Clipboard')}
                </Text>
            </TemporaryModal>
        </View>
    );
}
