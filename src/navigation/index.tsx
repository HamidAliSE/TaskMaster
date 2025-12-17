import React from 'react';
import { NavigationState } from '@react-navigation/routers';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
    PRODUCTS_SCREEN,
    ADD_PRODUCT_SCREEN,
} from 'screens/ScreenNames';

import {
    ProductsScreen,
    AddProductScreen,
} from 'screens';

export type RootStackParamList = {
    PRODUCTS_SCREEN: undefined;
    ADD_PRODUCT_SCREEN: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={PRODUCTS_SCREEN} component={ProductsScreen} />
            <Stack.Screen name={ADD_PRODUCT_SCREEN} component={AddProductScreen} />
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
