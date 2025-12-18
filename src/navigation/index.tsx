import React from 'react';
import { NavigationState } from '@react-navigation/routers';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
    SIGN_IN_SCREEN,
    SIGN_UP_SCREEN,
    PRODUCTS_SCREEN,
    ADD_PRODUCT_SCREEN,
    CUSTOMER_DASHBOARD_SCREEN,
    CREATE_ORDER_SCREEN,
} from 'screens/ScreenNames';

import {
    SignInScreen,
    SignUpScreen,
    ProductsScreen,
    AddProductScreen,
    CustomerDashboardScreen,
    CreateOrderScreen,
} from 'screens';

export type RootStackParamList = {
    SIGN_IN_SCREEN: undefined;
    SIGN_UP_SCREEN: undefined;
    PRODUCTS_SCREEN: undefined;
    ADD_PRODUCT_SCREEN: { product: { id: string; name: string; price: number } } | undefined;
    CUSTOMER_DASHBOARD_SCREEN: undefined;
    CREATE_ORDER_SCREEN: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={CUSTOMER_DASHBOARD_SCREEN}>
            <Stack.Screen name={SIGN_IN_SCREEN} component={SignInScreen} />
            <Stack.Screen name={SIGN_UP_SCREEN} component={SignUpScreen} />
            <Stack.Screen name={PRODUCTS_SCREEN} component={ProductsScreen} />
            <Stack.Screen name={ADD_PRODUCT_SCREEN} component={AddProductScreen} />
            <Stack.Screen name={CUSTOMER_DASHBOARD_SCREEN} component={CustomerDashboardScreen} />
            <Stack.Screen name={CREATE_ORDER_SCREEN} component={CreateOrderScreen} />
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
