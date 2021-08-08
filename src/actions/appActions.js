import {
    NAVIGATE_REQUEST,
    CHANGE_COLOR_SCHEME
} from '../constants/actionTypes';

export const navigateToPage = (payload) => ({
    type: NAVIGATE_REQUEST,
    payload
});

export const changeColorScheme = (payload) => ({
    type: CHANGE_COLOR_SCHEME,
    payload
});
