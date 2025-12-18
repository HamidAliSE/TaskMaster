import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Header } from 'components';
import Styles from 'constants/Styles';
import Colors from 'constants/Colors';

const AddProductScreen = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');

    return (
        <View style={styles.screen}>
            <Header title="Add Product" showBackButton />
            <View style={styles.contentContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Product Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter product name"
                        value={productName}
                        onChangeText={setProductName}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter price"
                        value={productPrice}
                        onChangeText={setProductPrice}
                        keyboardType="numeric"
                    />
                </View>
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonTitle}>Add Product</Text>
                </TouchableOpacity>
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
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        ...Styles.title,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: Colors.lighterGrey,
        ...Styles.title,
    },
    addButton: {
        backgroundColor: Colors.secondary,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    addButtonTitle: {
        ...Styles.title,
        color: Colors.white,
    },
});

export default AddProductScreen;
