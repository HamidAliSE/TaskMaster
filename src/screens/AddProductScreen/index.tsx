import { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useReactNavigation } from 'hooks';
import { RootStackParamList } from 'navigation';
import { Header, TextInput, Button, AppLoader } from 'components';
import Styles from 'constants/Styles';
import Colors from 'constants/Colors';

type AddProductScreenRouteProp = RouteProp<RootStackParamList, 'ADD_PRODUCT_SCREEN'>;

const AddProductScreen = () => {
    const { goBack } = useReactNavigation();
    const { params } = useRoute<AddProductScreenRouteProp>();
    const product = params?.product;
    const isEditMode = !!params;

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (product) {
            setProductName(product.name);
            setProductPrice(product.price.toString());
        }
    }, [product]);

    const handleSaveProduct = async () => {
        setIsLoading(true);

        if (!productName.trim()) {
            setIsLoading(false);
            Alert.alert('Validation Error', 'Please enter a product name.');
            return;
        }

        const price = parseFloat(productPrice);
        if (isNaN(price) || price <= 0) {
            setIsLoading(false);
            Alert.alert('Validation Error', 'Please enter a valid price greater than 0.');
            return;
        }

        try {
            if (isEditMode && product) {
                await firestore().collection('products').doc(product.id).update({
                    name: productName.trim(),
                    price: price,
                });
            } else {
                await firestore().collection('products').add({
                    name: productName.trim(),
                    price: price,
                });
            }
            goBack();
        } catch (error) {
            Alert.alert('Error', `Failed to ${isEditMode ? 'update' : 'add'} product. Please try again.`);
            console.error(`Error ${isEditMode ? 'updating' : 'adding'} product:`, error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.screen}>
            <Header title={isEditMode ? "Edit Product" : "Add Product"} showBackButton />
            <View style={styles.contentContainer}>
                <TextInput
                    label="Product Name"
                    placeholder="Enter product name"
                    value={productName}
                    onChangeText={setProductName}
                    editable={!isLoading}
                />
                <TextInput
                    label="Price"
                    placeholder="Enter price"
                    value={productPrice}
                    onChangeText={setProductPrice}
                    keyboardType="numeric"
                    editable={!isLoading}
                />
                <Button
                    title={isEditMode ? "Update Product" : "Add Product"}
                    style={styles.addButton}
                    onPress={handleSaveProduct}
                    disabled={isLoading}
                />
            </View>
            {isLoading && <AppLoader />}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    contentContainer: {
        flex: 1,
        paddingVertical: 20,
        ...Styles.screenPadding,
    },
    addButton: {
        marginTop: 20,
    },
});

export default AddProductScreen;
