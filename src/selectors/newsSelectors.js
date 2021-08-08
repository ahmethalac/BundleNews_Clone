export const newsSelector = state => (country, tag = 'general') => (state.news
                                                        && state.news[tag]
                                                        && state.news[tag][country]) ?? [];
