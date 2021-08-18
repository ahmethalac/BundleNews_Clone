import { all } from 'redux-saga/effects';
import appMiddlewares from './appMiddleware';

export default function* rootMiddleware() {
    yield all([
        ...appMiddlewares,
    ]);
}
