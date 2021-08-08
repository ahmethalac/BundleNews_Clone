import {
    NAVIGATE_REQUEST,
    CHANGE_COLOR_SCHEME,
    CHANGE_LANGUAGE
} from '../constants/actionTypes';

export const navigateToPage = payload => ({
    type: NAVIGATE_REQUEST,
    payload
});

export const changeColorScheme = payload => ({
    type: CHANGE_COLOR_SCHEME,
    payload
});

export const changeLanguage = payload => ({
    type: CHANGE_LANGUAGE,
    payload
});
