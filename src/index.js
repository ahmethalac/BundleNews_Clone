import 'react-native-gesture-handler';
import React from 'react';
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
import reducers from './reducers';
import middlewares from './middlewares';
import CustomNavigator from './components/Navigator';

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
    const [fontsLoaded] = useFonts({
        'Barlow-ExtraBold': require('../assets/fonts/Barlow-ExtraBold.ttf'),
        'Barlow-Bold': require('../assets/fonts/Barlow-Bold.ttf')
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <Provider store={store}>
            <PersistGate loading={<AppLoading />} persistor={persistor}>
                <NavigationContainer>
                    <CustomNavigator />
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );

}

export default registerRootComponent(App);
