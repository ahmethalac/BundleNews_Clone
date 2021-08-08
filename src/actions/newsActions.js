import { FETCH_ALL_NEWS_REQUEST } from '../constants/actionTypes';

export const fetchAllNews = ({ language, tag }) => ({
    type: FETCH_ALL_NEWS_REQUEST,
    payload: {
        language,
        tag
    }
});
