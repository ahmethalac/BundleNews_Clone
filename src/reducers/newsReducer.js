import { FETCH_ALL_NEWS_SUCCESS } from '../constants/actionTypes';
import INITIAL_STATE from '../constants/news';

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        // case FETCH_ALL_NEWS_SUCCESS: {
        //     const { news, country, tag } = action.payload;
        //     const updatedNews = [...state[tag][country]];
        //     for (let i = news.length - 1; i > -1; i--) {
        //         if (updatedNews.every(e => e.url !== news[i].url)) {
        //             const { key, ...withoutKey } = news[i];
        //             updatedNews.unshift(withoutKey);
        //         }
        //     }
        //     return {
        //         ...state,
        //         [tag]: {
        //             ...state[tag],
        //             [country]: updatedNews
        //         }
        //     };
        // }
        default: {
            return state;
        }
    }
};
