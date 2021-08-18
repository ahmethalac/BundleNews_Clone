import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import app from './appReducer';
import news from './newsReducer';
import bookmarks from './bookmarkReducer';
import fetch from './fetchReducer';

export default combineReducers({
    app: persistReducer({
        key: 'app',
        storage: AsyncStorage,
    }, app),
    news: persistReducer({
        key: 'news',
        storage: AsyncStorage,
    }, news),
    bookmarks: persistReducer({
        key: 'bookmarks',
        storage: AsyncStorage,
    }, bookmarks),
    fetch
});
