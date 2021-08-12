import React, {
    useEffect, useMemo, useRef, useState
} from 'react';
import { WebView } from 'react-native-webview';
import { View } from 'react-native';
import {
    FontAwesome5, Ionicons, Feather, Octicons
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Bar } from 'react-native-progress';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import { useColorPalette } from '../../../helpers/hooks';
import { bookmarkNew, removeBookmark } from '../../../actions/newsActions';
import { onShare } from '../../../helpers/utils';

export default function NewDetails({ route: { params: { url } } }) {
    const [state, setState] = useState({
        loading: false,
        canGoForward: false,
        canGoBack: false,
        progress: 0
    });
    const [isModalVisible, setModalVisible] = useState(false);
    const viewRef = useRef(null);
    const colorPalette = useColorPalette();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const isBookmarked = useSelector(state => state?.bookmarks?.bookmarkedNews?.indexOf(url) > -1);

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

    const handleBookmark = () => {
        if (isBookmarked) {
            dispatch(removeBookmark(url));
        } else {
            dispatch(bookmarkNew(url));
        }
    };

    const handleShare = () => {
        onShare({
            message: url,
            type: 'url'
        });
    };

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
            <View style={[{ backgroundColor: colorPalette.headerBackground }, styles.bottomBar]}>
                <FontAwesome5
                    name="chevron-left"
                    size={20}
                    color={colorPalette.primary}
                    onPress={handleBackButton}
                    style={{ paddingLeft: 30 }}
                />
                {state.canGoForward && (
                <FontAwesome5
                    name="chevron-right"
                    size={20}
                    color={colorPalette.primary}
                    onPress={handleForwardButton}
                    style={{ paddingLeft: 30 }}
                />
                )}
                <View style={{ flex: 1 }} />
                <Ionicons
                    name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                    size={20}
                    color={colorPalette.primary}
                    onPress={handleBookmark}
                    style={{ paddingRight: 30 }}
                />
                <Feather
                    name="share"
                    size={20}
                    color={colorPalette.primary}
                    style={{ paddingRight: 30 }}
                    onPress={handleShare}
                />
            </View>
        </View>
    );
}
