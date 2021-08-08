import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import app from './appReducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

export default combineReducers({ app: persistReducer(persistConfig, app) });
