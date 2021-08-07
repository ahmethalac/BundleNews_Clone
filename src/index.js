import 'react-native-gesture-handler';
import React from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { useColorScheme } from 'react-native';
import reducers from './reducers';
import middlewares from './middlewares';
import Home from './components/Home';
import Test from './components/Test';

const { Screen, Navigator } = createBottomTabNavigator();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    )
);

sagaMiddleware.run(middlewares);

function App() {
    const colorScheme = useColorScheme();
    const [fontsLoaded] = useFonts({
        'Barlow-Black': require('../assets/fonts/Barlow-Black.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Navigator initialRouteName="Home">
                    <Screen
                        name="Home"
                        component={Home}
                        options={{
                                headerTitle: 'ALL',
                                headerStyle: {
                                    backgroundColor: colorScheme === 'light' ? '#EEE' : '#000'
                                },
                                headerTitleStyle: {
                                    fontFamily: 'Barlow-Black',
                                    fontSize: 14,
                                    color: colorScheme === 'light' ? '#000' : '#FFF'
                                }
                            }}
                    />
                    <Screen name="Test" component={Test} />
                </Navigator>
            </NavigationContainer>
        </Provider>
    );

}

export default registerRootComponent(App);
