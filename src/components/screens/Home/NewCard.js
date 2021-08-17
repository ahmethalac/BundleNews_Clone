import React, { useMemo } from 'react';
import {
    View, Text, Image, Pressable
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useColorPalette } from '../../../helpers/hooks';
import { newCardGrid, newCardList, newCardBigList } from './styles';
import { bookmarkNew, removeBookmark } from '../../../actions/newsActions';
import { onShare } from '../../../helpers/utils';

export default function NewCard({
    image,
    name,
    source,
    url,
    layout
}) {
    const navigation = useNavigation();
    const colorPalette = useColorPalette();
    const dispatch = useDispatch();
    const isBookmarked = useSelector(state => state?.bookmarks?.bookmarkedNews?.indexOf(url) > -1);

    const onPressHandler = () => {
        navigation.push('Details', {
            url,
            source
        });
    };

    const layoutStyles = useMemo(() => {
        switch (layout) {
            case 'list':
                return newCardList;
            case 'bigList':
                return newCardBigList;
            case 'grid':
            default:
                return newCardGrid;
        }
    }, [layout]);

    const components = useMemo(() => {
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
        const imageComponent = (
            <Image
                source={image ? { uri: image } : require('../../../../assets/iconBackground.png')}
                style={layoutStyles.image}
                resizeMode="cover"
                key="image"
            />
        );
        const sourceComponent = (
            <Text
                key="source"
                style={[
                    {
                        fontFamily: 'Barlow-Bold',
                        color: colorPalette.gray,
                        fontSize: 10
                    },
                    layoutStyles.source,

                ]}
                // eslint-disable-next-line indent
            >
                {source.toUpperCase()}
            </Text>
        );

        const sourceWithActionsComponent = (
            <View key="sourceWithAction" style={layoutStyles.sourceWithAction}>
                {sourceComponent}
                <View style={{ flex: 1 }} />
                <Ionicons
                    name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                    size={20}
                    color={colorPalette.primary}
                    style={layoutStyles.actionButton}
                    onPress={handleBookmark}
                />
                <Feather
                    name="share"
                    size={20}
                    color={colorPalette.primary}
                    style={layoutStyles.actionButton}
                    onPress={handleShare}
                />
            </View>
        );

        const titleComponent = (
            <Text
                style={[layoutStyles.name, {
                    color: colorPalette.primary,
                    fontFamily: 'Barlow-Bold'
                 }]}
                key="title"
                // eslint-disable-next-line indent
            >
                {name}
            </Text>
        );

        const titleAndSourceComponent = (
            <View key="title&source" style={layoutStyles.leftPart}>
                {titleComponent}
                {sourceComponent}
            </View>
        );

        return {
            imageComponent,
            sourceComponent,
            titleComponent,
            titleAndSourceComponent,
            sourceWithActionsComponent
        };
    }, [layoutStyles, colorPalette, isBookmarked]);

    const layoutOrder = useMemo(() => {
        const {
            imageComponent,
            sourceComponent,
            titleComponent,
            titleAndSourceComponent,
            sourceWithActionsComponent
        } = components;

        switch (layout) {
            case 'list':
                return [titleAndSourceComponent, imageComponent];
            case 'bigList':
                return [imageComponent, titleComponent, sourceWithActionsComponent];
            case 'grid':
            default:
                return [imageComponent, sourceComponent, titleComponent];

        }
    }, [layout, components]);

    return (
        <Pressable onPress={onPressHandler} useForeground>
            <View style={[layoutStyles.container, { backgroundColor: colorPalette.secondary }]}>
                {layoutOrder}
            </View>
        </Pressable>
    );
}
