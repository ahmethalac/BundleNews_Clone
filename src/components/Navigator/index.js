import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Test from '../screens/Test';
import { useCustomColorScheme } from '../../hooks';

const {
    Screen, Navigator
} = createBottomTabNavigator();

export default function CustomNavigator() {
    const colorScheme = useCustomColorScheme();
    return (
        <Navigator initialRouteName="Home">
            <Screen
                name="Home"
                component={Home}
                options={{
                    headerTitle: 'ALL',
                    headerStyle: { backgroundColor: colorScheme === 'light' ? '#EEE' : '#000' },
                    headerTitleStyle: {
                        fontFamily: 'Barlow-Black',
                        fontSize: 14,
                        color: colorScheme === 'light' ? '#000' : '#FFF'
                    }
                }}
            />
            <Screen name="Test" component={Test} />
        </Navigator>
    );
}
