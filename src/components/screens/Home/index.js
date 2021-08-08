import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { changeColorScheme, changeLanguage } from '../../../actions';
import { useCustomColorScheme } from '../../../hooks';

export default function Home() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const colorScheme = useCustomColorScheme();

    return (
        <View style={styles.container}>
            {navigation.isFocused() && <StatusBar barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} /> }
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    dispatch(changeColorScheme('dark'));
                }}
            >
                <Text style={styles.text}>
                    Dark
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    dispatch(changeColorScheme('light'));
                }}
            >
                <Text style={styles.text}>
                    Light
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    dispatch(changeLanguage('tr'));
                }}
            >
                <Text style={styles.text}>
                    Language=TR
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    dispatch(changeLanguage('en'));
                }}
            >
                <Text style={styles.text}>
                    Language=EN
                </Text>
            </TouchableOpacity>
        </View>
    );
}
