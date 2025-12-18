import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Header, TextInput, Button } from 'components';
import Styles from 'constants/Styles';
import Colors from 'constants/Colors';

const AddProductScreen = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');

    return (
        <View style={styles.screen}>
            <Header title="Add Product" showBackButton />
            <View style={styles.contentContainer}>
                <TextInput
                    label="Product Name"
                    placeholder="Enter product name"
                    value={productName}
                    onChangeText={setProductName}
                />
                <TextInput
                    label="Price"
                    placeholder="Enter price"
                    value={productPrice}
                    onChangeText={setProductPrice}
                    keyboardType="numeric"
                />
                <Button
                    title="Add Product"
                    style={styles.addButton}
                />
            </View>
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
