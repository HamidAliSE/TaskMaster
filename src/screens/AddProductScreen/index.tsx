import { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useReactNavigation } from 'hooks';
import { Header, TextInput, Button, AppLoader } from 'components';
import Styles from 'constants/Styles';
import Colors from 'constants/Colors';

const AddProductScreen = () => {
    const { goBack } = useReactNavigation();
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAddProduct = async () => {
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
            await firestore().collection('products').add({
                name: productName.trim(),
                price: price,
            });
            goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to add product. Please try again.');
            console.error('Error adding product:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.screen}>
            <Header title="Add Product" showBackButton />
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
                    title="Add Product"
                    style={styles.addButton}
                    onPress={handleAddProduct}
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
