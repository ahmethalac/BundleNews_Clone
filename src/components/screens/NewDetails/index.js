import React, { useMemo, useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import { View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Bar } from 'react-native-progress';
import styles from './styles';
import { useColorPalette } from '../../../helpers/hooks';

export default function NewDetails({ route: { params: { url } } }) {
    const [state, setState] = useState({
        loading: false,
        canGoForward: false,
        canGoBack: false,
        progress: 0
    });
    const viewRef = useRef(null);
    const colorPalette = useColorPalette();
    const navigation = useNavigation();

    const handleBackButton = () => {
        if (state.canGoBack) {
            viewRef?.current?.goBack();
        } else {
            navigation.goBack();
        }
    };

    const handleForwardButton = () => {
        if (state.canGoForward) {
            viewRef?.current?.goForward();
        }
    };

    const barColor = useMemo(() => {
        if (state.loading) {
            return colorPalette.red;
        }
        return colorPalette.headerBackground;
    }, [state.loading, colorPalette]);

    return (
        <View style={styles.container}>
            <Bar
                progress={state.progress === 1 ? 0 : state.progress}
                borderRadius={0}
                animationType="timing"
                width={null}
                height={4}
                unfilledColor={colorPalette.headerBackground}
                borderWidth={0}
                color={barColor}
            />
            <WebView
                ref={viewRef}
                source={{ uri: url }}
                originWhitelist={['*']}
                onLoadProgress={({ nativeEvent }) => setState(nativeEvent)}
                onNavigationStateChange={navState => setState(navState)}
            />
            <View style={[{ backgroundColor: colorPalette.headerBackground }, styles.bottomBar]}>
                <FontAwesome5
                    name="chevron-left"
                    size={20}
                    color={colorPalette.primary}
                    onPress={handleBackButton}
                    style={styles.button}
                />
                {state.canGoForward && (
                <FontAwesome5
                    name="chevron-right"
                    size={20}
                    color={colorPalette.primary}
                    onPress={handleForwardButton}
                    style={styles.button}
                />
                )}
            </View>
        </View>
    );
}
