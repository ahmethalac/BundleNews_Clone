import { useSelector } from 'react-redux';
import { useColorScheme } from 'react-native';
import { colorSchemeSelector } from '../selectors';

export const useCustomColorScheme = () => {
    const systemColorScheme = useColorScheme();
    const colorScheme = useSelector(colorSchemeSelector);
    if (colorScheme === 'system') {
        return systemColorScheme;
    }
    return colorScheme || 'light';
};
