import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import styles from './styles';
import { changeColorScheme, changeLanguage } from '../../../actions';

export default function Notifications() {
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
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
