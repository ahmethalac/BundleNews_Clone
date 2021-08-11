import React from 'react';
import { WebView } from 'react-native-webview';
import { View, Text } from 'react-native';

export default function NewDetails({ route }) {
    const { params: { url, source } } = route;
    return (
        <WebView
            source={{ uri: url }}
            originWhitelist={['*']}
        />
    );
}
