/* eslint-disable no-unused-vars */
import {
    put, takeEvery, call, delay
} from 'redux-saga/effects';
import { FETCH_ALL_NEWS_REQUEST, FETCH_ALL_NEWS_SUCCESS, FETCH_ALL_NEWS_FAILURE } from '../constants/actionTypes';
import { fetchNews } from '../lib/api/newsApiService';

export function* fetchAllNewsMiddleware(action) {
    const { language: country = 'tr', tag = 'general', callback = () => {} } = action.payload;
    try {
        // Disable news fetching on development since it has limits
        // TODO: Enable here when project is finished

        // const response = yield call(fetchNews, country, tag);
        const response = { data: { result: [] } };
        yield put({
            type: FETCH_ALL_NEWS_SUCCESS,
            payload: {
                news: response?.data?.result,
                country,
                tag
            }

        });
        yield delay(500); // Mock waiting time
        yield call(callback, 'success');
    } catch (error) {
        yield put({
            type: FETCH_ALL_NEWS_FAILURE,
            error: error.message
        });

        yield call(callback, 'failure', error.message);
    }
}

const newsMiddlewares = [
    takeEvery(FETCH_ALL_NEWS_REQUEST, fetchAllNewsMiddleware),
];

export default newsMiddlewares;
