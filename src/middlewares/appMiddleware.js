import { put, takeEvery } from 'redux-saga/effects';
import { NAVIGATE_FAILURE, NAVIGATE_REQUEST, NAVIGATE_SUCCESS } from '../constants/actionTypes';

export function* navigateToPage(action) {
    try {
        const { navigation, page } = action.payload;
        navigation.navigate(page);
        yield put({
            type: NAVIGATE_SUCCESS,
            payload: {
                page
            }
        });
    } catch (error) {
        yield put({
            type: NAVIGATE_FAILURE
        });
    }
}

const appMiddlewares = [
    takeEvery(NAVIGATE_REQUEST, navigateToPage),
];

export default appMiddlewares;
