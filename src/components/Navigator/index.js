import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Foundation, Ionicons, Feather } from '@expo/vector-icons';
import Home from '../screens/Home';
import { useCustomColorScheme } from '../../hooks';
import Discover from '../screens/Discover';
import { getHeaderOptions } from '../../utils';
import Search from '../screens/Search';
import Notifications from '../screens/Notifications';

const { Screen, Navigator } = createBottomTabNavigator();

export default function CustomNavigator() {
    const colorScheme = useCustomColorScheme();
    return (
        <Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarStyle: { backgroundColor: '#000' },
                tabBarActiveTintColor: '#FFF',
                tabBarInactiveTintColor: '#777',
                tabBarShowLabel: false,
            }}
            // eslint-disable-next-line indent
        >
            <Screen
                name="Home"
                component={Home}
                options={{
                    ...getHeaderOptions('ALL', colorScheme),
                    tabBarIcon: ({ color, size }) => <Foundation name="home" size={(size * 6) / 5} color={color} />
                }}
            />
            <Screen
                name="Discover"
                component={Discover}
                options={{
                    ...getHeaderOptions('DISCOVER', colorScheme),
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
                    tabBarIcon: ({ color, size }) => (
                        <Feather
                            name="search"
                            size={(size * 6) / 5}
                            color={color}
                        />
                    )
                }}
            />
            <Screen
                name="Notifications"
                component={Notifications}
                options={{
                    ...getHeaderOptions('DISCOVER', colorScheme),
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
