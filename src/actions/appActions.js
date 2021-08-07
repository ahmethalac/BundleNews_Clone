import { NAVIGATE_REQUEST } from '../constants/actionTypes';

export const navigateToPage = (payload) => ({
    type: NAVIGATE_REQUEST,
    payload
});
