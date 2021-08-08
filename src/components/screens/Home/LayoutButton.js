import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialCommunityIcons, Entypo, SimpleLineIcons } from '@expo/vector-icons';
import { layoutSelector } from '../../../selectors';
import { layoutButtonStyles as styles } from './styles';
import { useCustomColorScheme } from '../../../helpers/hooks';
import { changeLayout } from '../../../actions';

export default function LayoutButton() {
    const layout = useSelector(layoutSelector);
    const colorScheme = useCustomColorScheme();
    const dispatch = useDispatch();

    let Icon; let
        nextLayout;
    switch (layout) {
        case 'list':
            Icon = props => <Entypo name="document-landscape" {...props} />;
            nextLayout = 'bigList';
            break;
        case 'bigList':
            Icon = props => <MaterialCommunityIcons name="trello" {...props} />;
            nextLayout = 'grid';
            break;
        case 'grid':
        default:
            Icon = props => <MaterialCommunityIcons name="menu" {...props} size={30} />;
            nextLayout = 'list';
            break;
    }

    const handleLayoutChange = () => {
        dispatch(changeLayout(nextLayout));
    };

    return (
        <View style={styles.container}>
            <Icon
                size={25}
                color={colorScheme === 'light' ? '#000' : '#FFF'}
                onPress={handleLayoutChange}
            />
        </View>
    );
}
