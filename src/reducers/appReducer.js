import { NAVIGATE_SUCCESS } from '../constants/actionTypes';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NAVIGATE_SUCCESS: {
            const { page } = action.payload;
            console.log(state);
            return state.set('currentPage', page);
        }
        default:
            return state;
    }
};
