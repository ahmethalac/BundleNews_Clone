import { all } from 'redux-saga/effects';
import appMiddlewares from './appMiddleware';
import newsMiddlewares from './newsMiddleware';

export default function* rootMiddleware() {
    yield all([
        ...appMiddlewares,
        ...newsMiddlewares
    ]);
}
