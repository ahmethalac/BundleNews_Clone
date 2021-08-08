import { FETCH_ALL_NEWS_SUCCESS } from '../constants/actionTypes';

const INITIAL_STATE = {
    general: {
        tr: [],
        en: []
    },
    sport: {
        tr: [],
        en: []
    },
    economy: {
        tr: [],
        en: []
    },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_ALL_NEWS_SUCCESS: {
            const { news, country, tag } = action.payload;
            const updatedNews = [...state[tag][country]];
            for (let i = news.length - 1; i > -1; i--) {
                if (updatedNews.every(e => e.url !== news[i].url)) {
                    updatedNews.unshift(news[i]);
                }
            }
            return {
                ...state,
                [tag]: {
                    ...state[tag],
                    [country]: updatedNews
                }
            };
        }
        default: {
            return state;
        }
    }
};
