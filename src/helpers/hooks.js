import { useSelector } from 'react-redux';
import { useColorScheme } from 'react-native';
import { colorSchemeSelector, languageSelector } from '../selectors';
import translations from '../constants/translations';

export const useColorPalette = () => {
    const systemColorScheme = useColorScheme();
    const userColorScheme = useSelector(colorSchemeSelector);
    const colorScheme = userColorScheme === 'system' ? systemColorScheme : userColorScheme ?? 'light';

    const commonPalette = {
        gray: '#777',
        red: '#DB1F26',
        white: '#FFF',
        black: '#000'
    };

    if (colorScheme === 'light') {
        return {
            ...commonPalette,
            primary: '#000',
            secondary: '#FFF',
            headerBackground: '#EEE',
            barStyle: 'dark-content'
        };
    }
    return {
        ...commonPalette,
        primary: '#FFF',
        secondary: '#181E25',
        headerBackground: '#12161B',
        barStyle: 'light-content'
    };
};

export const useTranslate = () => {
    const language = useSelector(languageSelector);
    if (language === 'tr') {
        return text => translations[text] ?? text;
    }
    return text => text;
};
