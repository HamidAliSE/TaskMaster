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
    };

    const goBack = () => {
        navigation.goBack();
    };

    return {
        navigate,
        goBack,
        navigation,
    };
};

export default useReactNavigation;
