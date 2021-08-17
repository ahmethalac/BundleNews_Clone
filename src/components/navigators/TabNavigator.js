import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Feather } from '@expo/vector-icons';
import Home from '../screens/Home';
import { useColorPalette, useTranslate } from '../../helpers/hooks';
import Discover from '../screens/Discover';
import Search from '../screens/Search';
import Notifications from '../screens/Notifications';
import LayoutButton from '../screens/Home/LayoutButton';

const { Screen, Navigator } = createBottomTabNavigator();

export default function TabNavigator() {
    const colorPalette = useColorPalette();
    const translate = useTranslate();
    return (
        <Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: colorPalette.black,
                    borderTopColor: 'transparent',
                },
                tabBarActiveTintColor: colorPalette.white,
                tabBarInactiveTintColor: colorPalette.gray,
                tabBarShowLabel: false,
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: colorPalette.headerBackground,
                    shadowColor: 'transparent'
                },
                headerTitleStyle: {
                    fontFamily: 'Barlow-ExtraBold',
                    fontSize: 14,
                    color: colorPalette.primary,
                }
            }}
            // eslint-disable-next-line indent
        >
            <Screen
                name="Home"
                component={Home}
                options={{
                    headerTitle: translate('ALL'),
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'md-home-sharp' : 'md-home-outline'}
                            size={(size * 6) / 5}
                            color={color}
                        />
                    ),
                    headerRight: props => <LayoutButton {...props} />,
                }}
                initialParams={{ type: 'home' }}
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
