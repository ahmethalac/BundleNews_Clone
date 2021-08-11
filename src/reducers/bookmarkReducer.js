import { BOOKMARK_NEW, REMOVE_BOOKMARK } from '../constants/actionTypes';

const INITIAL_STATE = {
    bookmarkedNews: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BOOKMARK_NEW:
            if (state.bookmarkedNews.indexOf(action.payload) > -1) {
                return state;
            }
            return {
                ...state,
                bookmarkedNews: [...state.bookmarkedNews, action.payload]
            };
        case REMOVE_BOOKMARK:
            return {
                ...state,
                bookmarkedNews: state.bookmarkedNews.filter(bookmark => bookmark !== action.payload)
            };
        default:
            return state;
    }
};
