import React from 'react';
import { Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { layoutSelector } from '../../../selectors';
import { layoutButtonStyles as styles } from './styles';
import { useColorPalette } from '../../../helpers/hooks';
import { changeLayout } from '../../../actions';
import { LayoutIcon } from '../../../helpers/customIconFonts';

export default function LayoutButton() {
    const layout = useSelector(layoutSelector);
    const colorPalette = useColorPalette();
    const dispatch = useDispatch();

    let Icon; let
        nextLayout;
    switch (layout) {
        case 'list':
            Icon = props => <LayoutIcon name="bigListIcon" {...props} />;
            nextLayout = 'bigList';
            break;
        case 'bigList':
            Icon = props => <LayoutIcon name="gridIcon" {...props} />;
            nextLayout = 'grid';
            break;
        case 'grid':
        default:
            Icon = props => <LayoutIcon name="listIcon" {...props} />;
            nextLayout = 'list';
            break;
    }

    const handleLayoutChange = () => {
        dispatch(changeLayout(nextLayout));
    };

    return (
        <Pressable style={styles.container} onPress={handleLayoutChange}>
            <Icon
                size={20}
                color={colorPalette.primary}
            />
        </Pressable>
    );
}
