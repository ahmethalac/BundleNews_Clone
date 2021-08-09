import React from 'react';
import { Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialCommunityIcons, Entypo, createIconSet } from '@expo/vector-icons';
import { layoutSelector } from '../../../selectors';
import { layoutButtonStyles as styles } from './styles';
import { useCustomColorScheme } from '../../../helpers/hooks';
import { changeLayout } from '../../../actions';

const glyphMap = { list: '' };
const CustomIcon = createIconSet(glyphMap, 'FontName', require('../../../../assets/listLayout.ttf'));

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
            Icon = props => <CustomIcon name="list" {...props} size={20} />;
            nextLayout = 'list';
            break;
    }

    const handleLayoutChange = () => {
        dispatch(changeLayout(nextLayout));
    };

    return (
        <Pressable style={styles.container} onPress={handleLayoutChange}>
            <Icon
                size={25}
                color={colorScheme === 'light' ? '#000' : '#FFF'}
            />
        </Pressable>
    );
}
