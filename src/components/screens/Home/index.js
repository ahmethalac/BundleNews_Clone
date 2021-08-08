import React from 'react';
import { View, StatusBar } from 'react-native';
import { useCustomColorScheme } from '../../../helpers/hooks';
import styles from './styles';

export default function Home() {
    const colorScheme = useCustomColorScheme();
    return (
        <View style={styles.container}>
            <StatusBar barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} />
        </View>
    );
}
