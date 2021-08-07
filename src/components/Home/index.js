import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';

export default function Home() {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.button}
            >
                <Text style={styles.text}>
                    Click Me
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
