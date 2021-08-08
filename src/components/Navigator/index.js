import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Foundation, Ionicons, Feather } from '@expo/vector-icons';
import Home from '../screens/Home';
import { useCustomColorScheme, useTranslate } from '../../helpers/hooks';
import Discover from '../screens/Discover';
import Search from '../screens/Search';
import Notifications from '../screens/Notifications';

const { Screen, Navigator } = createBottomTabNavigator();

export default function CustomNavigator() {
    const colorScheme = useCustomColorScheme();
    const translate = useTranslate();
    return (
        <Navigator
            initialRouteName="Home"
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
                    backgroundColor: colorScheme === 'light' ? '#EEE' : '#000',
                    shadowColor: 'transparent'
                },
                headerTitleStyle: {
                    fontFamily: 'Barlow-ExtraBold',
                    fontSize: 14,
                    color: colorScheme === 'light' ? '#000' : '#FFF',
                }
            }}
            sceneContainerStyle={{
                backgroundColor: colorScheme === 'light' ? '#FFF' : '#111'
            }}
            // eslint-disable-next-line indent
        >
            <Screen
                name="Home"
                component={Home}
                options={{
                    headerTitle: translate('ALL'),
                    tabBarIcon: ({ color, size }) => <Foundation name="home" size={(size * 6) / 5} color={color} />
                }}
            />
            <Screen
                name="Discover"
                component={Discover}
                options={{
                    headerTitle: translate('DISCOVER'),
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'ios-compass' : 'ios-compass-outline'}
                            size={(size * 6) / 5}
                            color={color}
                        />
                    )
                }}
            />
            <Screen
                name="Search"
                component={Search}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <Feather name="search" size={(size * 6) / 5} color={color} />
                }}
            />
            <Screen
                name="Notifications"
                component={Notifications}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'notifications-sharp' : 'notifications-outline'}
                            size={(size * 6) / 5}
                            color={color}
                        />
                    )
                }}
            />
        </Navigator>
    );
}
