import React, { useMemo, useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import { View } from 'react-native';
import { Bar } from 'react-native-progress';
import styles from './styles';
import { useColorPalette } from '../../../helpers/hooks';
import BottomBar from './BottomBar';
import Menu from './Menu';

export default function NewDetails({ route: { params: { url, source } } }) {
    const [state, setState] = useState({
        loading: false,
        canGoForward: false,
        canGoBack: false,
        progress: 0
    });
    const viewRef = useRef(null);
    const colorPalette = useColorPalette();

    const barColor = useMemo(() => {
        if (state.loading) {
            return colorPalette.red;
        }
        return colorPalette.headerBackground;
    }, [state.loading, colorPalette]);

    const handleLoadProgress = ({ nativeEvent }) => {
        const { progress } = nativeEvent;
        setState({
            ...state,
            progress,
            loading: progress !== 1
        });
    };

    const handleNavigationChange = navState => {
        const { canGoForward, canGoBack } = navState;
        setState({
            ...state,
            canGoForward,
            canGoBack,
            loading: false
        });
    };

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
                onLoadProgress={handleLoadProgress}
                onNavigationStateChange={handleNavigationChange}
            />
            <BottomBar
                canGoForward={state.canGoForward}
                canGoBack={state.canGoBack}
                url={url}
                viewRef={viewRef}
            />
            <Menu
                viewRef={viewRef}
                url={url}
                source={source}
            />
        </View>
    );
}
