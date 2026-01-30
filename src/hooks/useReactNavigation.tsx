import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from 'navigation';

const useReactNavigation = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const navigate = {
        toSignIn: (params: RootStackParamList['SIGN_IN_SCREEN']) => navigation.navigate('SIGN_IN_SCREEN', params),
        toSignUp: (params: RootStackParamList['SIGN_UP_SCREEN']) => navigation.navigate('SIGN_UP_SCREEN', params),
        toProducts: (params: RootStackParamList['PRODUCTS_SCREEN']) => navigation.navigate('PRODUCTS_SCREEN', params),
        toAddProduct: (params: RootStackParamList['ADD_PRODUCT_SCREEN']) => navigation.navigate('ADD_PRODUCT_SCREEN', params),
        toCustomerDashboard: (params: RootStackParamList['CUSTOMER_DASHBOARD_SCREEN']) => navigation.navigate('CUSTOMER_DASHBOARD_SCREEN', params),
        toAdminDashboard: (params: RootStackParamList['ADMIN_DASHBOARD_SCREEN']) => navigation.navigate('ADMIN_DASHBOARD_SCREEN', params),
        toCreateOrder: (params: RootStackParamList['CREATE_ORDER_SCREEN']) => navigation.navigate('CREATE_ORDER_SCREEN', params),
        toConfirmOrder: (params: RootStackParamList['CONFIRM_ORDER_SCREEN']) => navigation.navigate('CONFIRM_ORDER_SCREEN', params),
        toOrders: (params: RootStackParamList['ORDERS_SCREEN']) => navigation.navigate('ORDERS_SCREEN', params),
    };

    const goBack = () => {
        navigation.goBack();
    };

    const reset = <T extends keyof RootStackParamList>(
        screenName: T,
        params?: RootStackParamList[T]
    ) => {
        navigation.reset({
            index: 0,
            routes: [{ name: screenName, params } as any],
        });
    };

    return {
        navigate,
        goBack,
        reset,
        navigation,
    };
};

export default useReactNavigation;
