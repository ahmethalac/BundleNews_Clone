import React, { useMemo, useRef } from 'react';
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
import TemporaryModal from '../../TemporaryModal';

export default function NewCard({
    image,
    title,
    source,
    url,
    layout
}) {
    const bookmarkRef = useRef(null);
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
                bookmarkRef?.current?.trigger();
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
                {title}
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
            <TemporaryModal ref={bookmarkRef}>
                <Image
                    source={require('../../../../assets/bookmarkIcon.png')}
                    style={{
                        height: 40,
                        width: 40
                    }}
                />
            </TemporaryModal>
        </Pressable>
    );
}
