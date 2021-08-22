import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import reducers from './reducers';
import middlewares from './middlewares';
import StackNavigator from './components/navigators/StackNavigator';
import BackgroundFetcher from './components/BackgroundFetcher';
import { registerFetchTask } from './helpers/utils';
import { BACKGROUND_FETCH_TASK } from './constants/others';

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    const now = Date.now();
    console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);

    const appStorage = await AsyncStorage.getItem('persist:app');
    const result = await axios.post('https://google-news-scraper-nodejs.herokuapp.com/getNews', {
        country: JSON.parse(appStorage ?? '{}')?.language ?? 'tr',
        tag: 'general'
    });
    AsyncStorage.setItem('test', JSON.stringify(result));
    return BackgroundFetch.Result.NewData;
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    )
);

const persistor = persistStore(store);

sagaMiddleware.run(middlewares);

function App() {
    useEffect(() => {
        registerFetchTask(BACKGROUND_FETCH_TASK);
    }, []);

    const [fontsLoaded] = useFonts({
        'Barlow-ExtraBold': require('../assets/fonts/Barlow-ExtraBold.ttf'),
        'Barlow-Bold': require('../assets/fonts/Barlow-Bold.ttf'),
        LayoutButton: require('../assets/fonts/layoutButton.ttf')
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <Provider store={store}>
            <PersistGate loading={<AppLoading />} persistor={persistor}>
                <NavigationContainer>
                    <StackNavigator />
                </NavigationContainer>
            </PersistGate>
            <BackgroundFetcher />
        </Provider>
    );

}

export default registerRootComponent(App);
