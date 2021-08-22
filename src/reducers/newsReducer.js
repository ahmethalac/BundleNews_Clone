import { FETCH_ALL_NEWS_SUCCESS } from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_ALL_NEWS_SUCCESS: {
            const { news, country, tag } = action.payload;
            const newState = { ...state };
            if (!newState[tag]) {
                newState[tag] = {};
            }
            if (!newState[tag][country]) {
                newState[tag][country] = [];
            }
            const updatedNews = [...newState[tag][country]];
            for (let i = news.length - 1; i > -1; i--) {
                if (updatedNews.every(e => e.url !== news[i].url)) {
                    updatedNews.unshift(news[i]);
                }
            }
            return {
                ...newState,
                [tag]: {
                    ...newState[tag],
                    [country]: updatedNews
                }
            };
        }
        default: {
            return state;
        }
    }
};
