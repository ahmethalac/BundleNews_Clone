import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { Foundation } from '@expo/vector-icons';
import styles from './styles';
import { changeColorScheme } from '../../../actions';

export default function Home() {
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={styles.container}>
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
            <Foundation name="home" size={24} color="black" />
        </SafeAreaView>
    );
}
