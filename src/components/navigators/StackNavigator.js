import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Ionicons, Entypo } from '@expo/vector-icons';
import TabNavigator from './TabNavigator';
import NewDetails from '../screens/NewDetails';
import { useColorPalette } from '../../helpers/hooks';
import Home from '../screens/Home';

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
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
            // eslint-disable-next-line indent
        >
            <Screen
                name="App"
                component={TabNavigator}
                options={{
                    headerShown: false,
                }}
            />
            <Screen
                name="Details"
                component={NewDetails}
                options={({ navigation, route }) => {
                    const fromChannelPreview = navigation?.dangerouslyGetState()?.routes?.some(route => route?.name === 'ChannelPreview');
                    return {
                        title: route?.params?.source?.toUpperCase() ?? '',
                        headerRightContainerStyle: { paddingRight: 20 },
                        headerBackImage: () => (
                            <Ionicons
                                name="close"
                                size={25}
                                color={colorPalette.primary}
                                style={{ marginLeft: 20 }}
                            />
                        ),
                        cardStyleInterpolator: fromChannelPreview
                                                    ? CardStyleInterpolators.forVerticalIOS
                                                    : CardStyleInterpolators.forHorizontalIOS
                    };
                }}
            />
            <Screen
                name="ChannelPreview"
                component={Home}
                options={({ route }) => ({
                    title: route?.params?.source?.toUpperCase() ?? '',
                    headerBackImage: () => (
                        <Entypo
                            name="chevron-left"
                            size={25}
                            color={colorPalette.primary}
                            style={{ marginLeft: 20 }}
                        />
                    )
                })}
            />
        </Navigator>
    );
}
