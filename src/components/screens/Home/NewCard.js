import React, { useMemo } from 'react';
import {
    View, Text, Image, Pressable
} from 'react-native';
import { useCustomColorScheme } from '../../../helpers/hooks';
import { newCardGrid, newCardList, newCardBigList } from './styles';

export default function NewCard({
    description,
    image,
    name,
    source,
    url,
    layout
}) {
    const colorScheme = useCustomColorScheme();
    const onPressHandler = () => { console.log(name); };

    let layoutStyles;
    switch (layout) {
        case 'list':
            layoutStyles = newCardList;
            break;
        case 'bigList':
            layoutStyles = newCardBigList;
            break;
        case 'grid':
        default:
            layoutStyles = newCardGrid;
            break;
    }

    const components = useMemo(() => {
        const imageComponent = (
            <Image
                source={image ? { uri: image } : require('../../../../assets/icon.png')}
                style={{
                height: 120,
                width: '100%',
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
            }}
                resizeMode="cover"
                key="image"
            />
        );
        const sourceComponent = (
            <Text key="source" style={layoutStyles.source}>
                {source.toUpperCase()}
            </Text>
        );
        const titleComponent = <Text style={[layoutStyles.name, { color: colorScheme === 'light' ? '#000' : '#FFF' }]} key="title">{name}</Text>;

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
            titleAndSourceComponent
        };
    }, [image, source, name, layoutStyles, colorScheme]);

    const layoutOrder = useMemo(() => {
        const {
            imageComponent,
            sourceComponent,
            titleComponent,
            titleAndSourceComponent
        } = components;

        switch (layout) {
            case 'list':
                return [titleAndSourceComponent, imageComponent];
            case 'bigList':
                return [imageComponent, titleComponent, sourceComponent];
            case 'grid':
            default:
                return [imageComponent, sourceComponent, titleComponent];

        }
    }, [layout, components]);

    return (
        <Pressable onPress={onPressHandler} useForeground>
            <View style={[layoutStyles.container, { backgroundColor: colorScheme === 'light' ? '#FFF' : '#181E25' }]}>
                {layoutOrder}
            </View>
        </Pressable>
    );
}
