import React from 'react';
import { NavigationState } from '@react-navigation/routers';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
    HOME_SCREEN,
} from 'screens/ScreenNames';

import {
    HomeScreen,
} from 'screens';

export type RootStackParamList = {
    HOME_SCREEN: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={HOME_SCREEN} component={HomeScreen} />
        </Stack.Navigator>
    );
}

const AppNavigation = () => {
    return (
        <NavigationContainer
            onStateChange={(state: Readonly<NavigationState> | undefined) => {
                if (state) {
                    console.log('===> Current Screen:', state.routes[state.index].name);
                }
            }}
        >
            <RootStack />
        </NavigationContainer>
    );
};

export default AppNavigation;
