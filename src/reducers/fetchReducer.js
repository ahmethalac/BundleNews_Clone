import { FETCH_ALL_NEWS_FAILURE, FETCH_ALL_NEWS_REQUEST, FETCH_ALL_NEWS_SUCCESS } from '../constants/actionTypes';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_ALL_NEWS_REQUEST: {
            const { language: country = 'tr', tag = 'general' } = action.payload;
            return {
                ...state,
                country,
                tag,
                fetching: true
            };
        }
        case FETCH_ALL_NEWS_SUCCESS:
        case FETCH_ALL_NEWS_FAILURE:
            return {
                ...state,
                fetching: false
            };
        default:
            return state;
    }
};
