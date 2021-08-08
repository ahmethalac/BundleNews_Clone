import {
    CHANGE_COLOR_SCHEME, CHANGE_LANGUAGE, CHANGE_LAYOUT, NAVIGATE_SUCCESS
} from '../constants/actionTypes';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NAVIGATE_SUCCESS: {
            const currentPage = action.payload;
            return {
                ...state,
                currentPage
            };
        }
        case CHANGE_COLOR_SCHEME: {
            const colorScheme = action.payload;
            return {
                ...state,
                colorScheme
            };
        }
        case CHANGE_LANGUAGE: {
            const language = action.payload;
            return {
                ...state,
                language
            };
        }
        case CHANGE_LAYOUT: {
            const layout = action.payload;
            return {
                ...state,
                layout
            };
        }
        default:
            return state;
    }
};
