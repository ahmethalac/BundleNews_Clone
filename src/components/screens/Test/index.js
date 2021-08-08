import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function Test() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                navigation.goBack();
              }}
            >
                <Text style={styles.text}>
                    Go Back
                </Text>
            </TouchableOpacity>
        </View>
    );
}
