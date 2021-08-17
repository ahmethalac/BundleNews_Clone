import React from 'react';
import { View } from 'react-native';
import {
    FontAwesome5, Ionicons, Feather
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useColorPalette } from '../../../helpers/hooks';
import styles from './styles';
import { bookmarkNew, removeBookmark } from '../../../actions/newsActions';
import { onShare } from '../../../helpers/utils';

export default function BottomBar({
    canGoBack,
    canGoForward,
    viewRef,
    url
}) {
    const colorPalette = useColorPalette();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const isBookmarked = useSelector(state => state?.bookmarks?.bookmarkedNews?.indexOf(url) > -1);

    const handleBackButton = () => {
        if (canGoBack) {
            viewRef?.current?.goBack();
        } else {
            navigation.goBack();
        }
    };

    const handleForwardButton = () => {
        if (canGoForward) {
            viewRef?.current?.goForward();
        }
    };

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

    return (
        <View style={[{ backgroundColor: colorPalette.headerBackground }, styles.bottomBar]}>
            <FontAwesome5
                name="chevron-left"
                size={20}
                color={colorPalette.primary}
                onPress={handleBackButton}
                style={{ paddingLeft: 30 }}
            />
            {canGoForward && (
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
    );
}
