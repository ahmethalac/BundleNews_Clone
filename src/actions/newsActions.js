import { BOOKMARK_NEW, FETCH_ALL_NEWS_REQUEST, REMOVE_BOOKMARK } from '../constants/actionTypes';

export const fetchAllNews = payload => ({
    type: FETCH_ALL_NEWS_REQUEST,
    payload
});

export const bookmarkNew = payload => ({
    type: BOOKMARK_NEW,
    payload
});

export const removeBookmark = payload => ({
    type: REMOVE_BOOKMARK,
    payload
});
