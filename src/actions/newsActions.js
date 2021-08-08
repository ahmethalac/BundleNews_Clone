import { FETCH_ALL_NEWS_REQUEST } from '../constants/actionTypes';

export const fetchAllNews = payload => ({
    type: FETCH_ALL_NEWS_REQUEST,
    payload
});
