import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import TabNavigator from './TabNavigator';
import NewDetails from '../screens/NewDetails';
import { useCustomColorScheme } from '../../helpers/hooks';

const { Screen, Navigator } = createStackNavigator();

export default function StackNavigator() {
    const colorScheme = useCustomColorScheme();
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    return (
        <Navigator
            initialRouteName="App"
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#000',
                    borderTopColor: 'transparent',
                },
                tabBarActiveTintColor: '#FFF',
                tabBarInactiveTintColor: '#777',
                tabBarShowLabel: false,
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: colorScheme === 'light' ? '#EEE' : '#12161B',
                    shadowColor: 'transparent'
                },
                headerTitleStyle: {
                    fontFamily: 'Barlow-ExtraBold',
                    fontSize: 14,
                    color: colorScheme === 'light' ? '#000' : '#FFF',
                },
                headerBackTitleVisible: false,
                headerBackImage: () => (
                    <Ionicons
                        name="close"
                        size={25}
                        color={colorScheme === 'light' ? '#000' : '#FFF'}
                        style={{ marginLeft: windowWidth / 20 }}
                    />
                )
            }}
            sceneContainerStyle={{
                backgroundColor: colorScheme === 'light' ? '#EEE' : '#12161B'
            }}
            // eslint-disable-next-line indent
        >
            <Screen
                name="App"
                component={TabNavigator}
                options={{
                    headerShown: false
                }}
            />
            <Screen
                name="Details"
                component={NewDetails}
                options={({ route }) => ({ title: route?.params?.source?.toUpperCase() ?? '' })}
            />
        </Navigator>
    );
}
