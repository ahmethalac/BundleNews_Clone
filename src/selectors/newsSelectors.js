import { createSelector } from 'reselect';

export const getNews = state => state.news;

export const newsSelector = createSelector(
    getNews,
    news => (country, tag = 'general') => (news[tag] && news[tag][country]) ?? []
);

export const newsSelectorBySource = createSelector(
    getNews,
    news => (country, source) => Object.keys(news).reduce((acc, key) => {
        if (key.startsWith('_')) {
            return acc;
        }
        return [...acc, ...news[key][country]?.filter(e => e.source === source)];
    }, [])
);
