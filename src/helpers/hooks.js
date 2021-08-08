import { useSelector } from 'react-redux';
import { useColorScheme } from 'react-native';
import { colorSchemeSelector, languageSelector } from '../selectors';
import translations from '../constants/translations';

export const useCustomColorScheme = () => {
    const systemColorScheme = useColorScheme();
    const colorScheme = useSelector(colorSchemeSelector);
    if (colorScheme === 'system') {
        return systemColorScheme;
    }
    return colorScheme || 'light';
};

export const useTranslate = () => {
    const language = useSelector(languageSelector);
    if (language === 'tr') {
        return text => translations[text];
    }
    return text => text;
};
