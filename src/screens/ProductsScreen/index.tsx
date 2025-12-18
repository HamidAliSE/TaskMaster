import { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useReactNavigation } from 'hooks';
import { Header, Separator, Button, IconButton } from 'components';
import { Edit, Delete } from 'images/svg';
import Styles from 'constants/Styles';
import Colors from 'constants/Colors';

interface Product {
    id: string;
    name: string;
    price: number;
}

const ProductsScreen = () => {
    const { navigate } = useReactNavigation();
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = useCallback(() => {
        firestore()
            .collection('products')
            .get()
            .then((snapshot) => {
                setProducts(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    })) as Product[]
                );
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                Alert.alert('Error', 'Failed to load products. Please try again.');
            });
    }, []);

    useFocusEffect(useCallback(() => {
        fetchProducts();
    }, [fetchProducts]));

    const deleteProduct = async (productId: string) => {
        setProducts((prevProducts) =>
            prevProducts.filter((p) => p.id !== productId)
        );

        try {
            await firestore().collection('products').doc(productId).delete();
        } catch (error) {
            console.error('Error deleting product:', error);
            Alert.alert('Error', 'Failed to delete product. Please try again.');
            fetchProducts();
        }
    };

    const handleDeleteProduct = (product: Product) => {
        Alert.alert(
            'Delete Product',
            `Are you sure you want to delete "${product.name}"?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => deleteProduct(product.id),
                },
            ]
        );
    };

    return (
        <View style={styles.screen}>
            <Header title="Products" />
            <View style={styles.contentContainer}>

                <FlatList
                    data={products}
                    style={styles.productList}
                    ItemSeparatorComponent={<Separator />}
                    renderItem={({ item }) => (
                        <View key={item.id} style={styles.productEntry}>
                            <View style={styles.productInfoContainer}>
                                <View style={styles.nameContainer}>
                                    <Text style={styles.productName} numberOfLines={1} ellipsizeMode="tail">
                                        {item.name}
                                    </Text>
                                </View>
                                <View style={styles.priceContainer}>
                                    <Text style={styles.productPrice} numberOfLines={1} ellipsizeMode="tail">
                                        {item.price} Rs.
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.actionButtons}>
                                <IconButton
                                    icon={Edit}
                                    onPress={() => {
                                        navigate.toAddProduct({ product: item });
                                    }}
                                    buttonStyle={styles.iconButtonSpacing}
                                />
                                <IconButton
                                    icon={Delete}
                                    onPress={() => handleDeleteProduct(item)}
                                    buttonStyle={styles.iconButtonSpacing}
                                />
                            </View>
                        </View>
                    )}
                />
                <Button
                    title="Add Product"
                    onPress={() => navigate.toAddProduct(undefined)}
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
    productList: {
        flex: 1,
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: Colors.lighterGrey,
    },
    productEntry: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    productInfoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameContainer: {
        flex: 2,
        marginRight: 10,
    },
    productName: {
        ...Styles.title,
    },
    priceContainer: {
        flex: 1,
    },
    productPrice: {
        ...Styles.title,
    },
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButtonSpacing: {
        marginLeft: 8,
    },
});

export default ProductsScreen;
