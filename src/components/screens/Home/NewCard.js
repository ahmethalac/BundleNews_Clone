import React from 'react';
import { View, Text, Image } from 'react-native';
import { newCardStyles as styles } from './styles';

export default function NewCard({
    description,
    image,
    name,
    source,
    url,
    layout
}) {
    return (
        <View style={styles[layout]}>
            <Text>{name}</Text>
            <Image
                source={image ? { uri: image } : require('../../../../assets/icon.png')}
                style={{
 height: 200,
width: '100%'
}}
                resizeMode="contain"
            />
        </View>
    );
}
