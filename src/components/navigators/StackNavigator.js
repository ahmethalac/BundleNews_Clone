import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import TabNavigator from './TabNavigator';
import NewDetails from '../screens/NewDetails';
import { useColorPalette } from '../../helpers/hooks';

const { Screen, Navigator } = createStackNavigator();

export default function StackNavigator() {
    const colorPalette = useColorPalette();
    return (
        <Navigator
            initialRouteName="App"
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
                },
                headerBackTitleVisible: false,
                headerBackImage: () => (
                    <Ionicons
                        name="close"
                        size={25}
                        color={colorPalette.primary}
                        style={{ marginLeft: 20 }}
                    />
                ),
            }}
            sceneContainerStyle={{
                backgroundColor: colorPalette.headerBackground
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
                options={({ route }) => ({
                    title: route?.params?.source?.toUpperCase() ?? '',
                    headerRightContainerStyle: { paddingRight: 20 }
                })}
            />
        </Navigator>
    );
}
