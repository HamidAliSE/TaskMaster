import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from 'navigation';

const useReactNavigation = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const navigate = {
        toProducts: (params: RootStackParamList['PRODUCTS_SCREEN']) => navigation.navigate('PRODUCTS_SCREEN', params),
        toAddProduct: (params: RootStackParamList['ADD_PRODUCT_SCREEN']) => navigation.navigate('ADD_PRODUCT_SCREEN', params),
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
