import {
    CHANGE_COLOR_SCHEME, NAVIGATE_SUCCESS
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
        default:
            return state;
    }
};
