import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationState } from '@react-navigation/routers';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
    SIGN_IN_SCREEN,
    SIGN_UP_SCREEN,
    PRODUCTS_SCREEN,
    ADD_PRODUCT_SCREEN,
    CUSTOMER_DASHBOARD_SCREEN,
    ADMIN_DASHBOARD_SCREEN,
    CREATE_ORDER_SCREEN,
    CONFIRM_ORDER_SCREEN,
} from 'screens/ScreenNames';

import {
    SignInScreen,
    SignUpScreen,
    ProductsScreen,
    AddProductScreen,
    CustomerDashboardScreen,
    AdminDashboardScreen,
    CreateOrderScreen,
    ConfirmOrderScreen,
} from 'screens';

import { useAuth } from 'contexts/AuthContext';
import { AppLoader } from 'components';

export type RootStackParamList = {
    SIGN_IN_SCREEN: undefined;
    SIGN_UP_SCREEN: undefined;
    PRODUCTS_SCREEN: undefined;
    ADD_PRODUCT_SCREEN: { product: { id: string; name: string; price: number } } | undefined;
    CUSTOMER_DASHBOARD_SCREEN: undefined;
    ADMIN_DASHBOARD_SCREEN: undefined;
    CREATE_ORDER_SCREEN: undefined;
    CONFIRM_ORDER_SCREEN: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type InitialRouteName = keyof RootStackParamList;

interface RootStackProps {
    initialRouteName: InitialRouteName;
}

const RootStack = ({ initialRouteName }: RootStackProps) => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
            <Stack.Screen name={SIGN_IN_SCREEN} component={SignInScreen} />
            <Stack.Screen name={SIGN_UP_SCREEN} component={SignUpScreen} />
            <Stack.Screen name={PRODUCTS_SCREEN} component={ProductsScreen} />
            <Stack.Screen name={ADD_PRODUCT_SCREEN} component={AddProductScreen} />
            <Stack.Screen name={CUSTOMER_DASHBOARD_SCREEN} component={CustomerDashboardScreen} />
            <Stack.Screen name={ADMIN_DASHBOARD_SCREEN} component={AdminDashboardScreen} />
            <Stack.Screen name={CREATE_ORDER_SCREEN} component={CreateOrderScreen} />
            <Stack.Screen name={CONFIRM_ORDER_SCREEN} component={ConfirmOrderScreen} />
        </Stack.Navigator>
    );
}

const StackNavigator = ({ initialRouteName }: { initialRouteName: InitialRouteName }) => (
    <NavigationContainer
        onStateChange={(state: Readonly<NavigationState> | undefined) => {
            if (state) {
                console.log('===> Current Screen:', state.routes[state.index].name);
            }
        }}
    >
        <RootStack initialRouteName={initialRouteName} />
    </NavigationContainer>
);

const getInitialRoute = (
    user: ReturnType<typeof useAuth>['user'],
    userRole: ReturnType<typeof useAuth>['userRole'],
): InitialRouteName => {
    if (user && userRole === 'admin') return ADMIN_DASHBOARD_SCREEN;
    if (user && userRole === 'customer') return CUSTOMER_DASHBOARD_SCREEN;
    return SIGN_IN_SCREEN;
};

const AppNavigation = () => {
    const { authLoading, user, userRole } = useAuth();

    if (authLoading) {
        return (
            <View style={styles.loaderContainer}>
                <AppLoader overlay={false} />
            </View>
        );
    }

    return <StackNavigator initialRouteName={getInitialRoute(user, userRole)} />;
};

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AppNavigation;
