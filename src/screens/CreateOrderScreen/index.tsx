import { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { Header, Separator, Button } from 'components';
import Styles from 'constants/Styles';
import Colors from 'constants/Colors';

interface Product {
    id: string;
    name: string;
    price: number;
}

const CreateOrderScreen = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    const fetchProducts = useCallback(() => {
        firestore()
            .collection('products')
            .get()
            .then((snapshot) => {
                const fetchedProducts = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Product[];
                setProducts(fetchedProducts);

                // Initialize quantities to 0 for new products, preserve existing quantities
                setQuantities((prevQuantities) => {
                    const initialQuantities: Record<string, number> = {};
                    fetchedProducts.forEach((product) => {
                        initialQuantities[product.id] = prevQuantities[product.id] || 0;
                    });
                    return initialQuantities;
                });
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                Alert.alert('Error', 'Failed to load products. Please try again.');
            });
    }, []);

    useFocusEffect(useCallback(() => {
        fetchProducts();
    }, [fetchProducts]));

    const incrementQuantity = (productId: string) => {
        setQuantities((prev) => ({
            ...prev,
            [productId]: (prev[productId] || 0) + 1,
        }));
    };

    const decrementQuantity = (productId: string) => {
        setQuantities((prev) => {
            const currentQuantity = prev[productId] || 0;
            if (currentQuantity > 0) {
                return {
                    ...prev,
                    [productId]: currentQuantity - 1,
                };
            }
            return prev;
        });
    };

    const getTotalItems = () => {
        return Object.values(quantities).filter((qty) => qty > 0).length;
    };

    const getTotalAmount = () => {
        return products.reduce((total, product) => {
            const quantity = quantities[product.id] || 0;
            return total + product.price * quantity;
        }, 0);
    };

    const handleViewCart = () => {
        // TODO: Navigate to cart screen or show cart details
        Alert.alert('Coming Soon', 'Cart Screen is coming soon.');
    };

    return (
        <View style={styles.screen}>
            <Header title="Create Order" showBackButton />
            <View style={styles.contentContainer}>
                <FlatList
                    data={products}
                    style={styles.productList}
                    ItemSeparatorComponent={<Separator />}
                    renderItem={({ item }) => {
                        const quantity = quantities[item.id] || 0;
                        return (
                            <View style={styles.productEntry}>
                                <View style={styles.productInfoContainer}>
                                    <Text style={styles.productName} numberOfLines={1} ellipsizeMode="tail">
                                        {item.name}
                                    </Text>
                                    <Text style={styles.productPrice} numberOfLines={1} ellipsizeMode="tail">
                                        {item.price} Rs.
                                    </Text>
                                </View>
                                <View style={styles.quantityControls}>
                                    <TouchableOpacity
                                        style={[styles.quantityButton, quantity === 0 && styles.quantityButtonDisabled]}
                                        onPress={() => decrementQuantity(item.id)}
                                        activeOpacity={0.7}
                                        disabled={quantity === 0}
                                    >
                                        <Text style={[styles.quantityButtonText, quantity === 0 && styles.quantityButtonTextDisabled]}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.quantityText}>{quantity}</Text>
                                    <TouchableOpacity
                                        style={[styles.quantityButton, styles.quantityButtonRight]}
                                        onPress={() => incrementQuantity(item.id)}
                                        activeOpacity={0.7}
                                    >
                                        <Text style={styles.quantityButtonText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    }}
                />
                <View style={styles.totalAmountContainer}>
                    <Text style={styles.totalAmountLabel}>Total Amount:</Text>
                    <Text style={styles.totalAmountValue}>{getTotalAmount()} Rs.</Text>
                </View>
                <Button
                    title={getTotalItems() > 0 ? `View Cart (${getTotalItems()} items)` : 'View Cart'}
                    onPress={handleViewCart}
                    style={styles.viewCartButton}
                    disabled={getTotalItems() === 0}
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
    },
    productInfoContainer: {
        flex: 1,
        flexDirection: 'column',
        marginRight: 15,
    },
    productName: {
        ...Styles.title,
        marginBottom: 4,
    },
    productPrice: {
        ...Styles.title,
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: Colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    quantityButtonDisabled: {
        backgroundColor: Colors.lightGrey,
        opacity: 0.6,
    },
    quantityButtonRight: {
        marginRight: 0,
        marginLeft: 10,
    },
    quantityButtonText: {
        ...Styles.boldTitle,
        color: Colors.white,
        fontSize: 18,
    },
    quantityButtonTextDisabled: {
        opacity: 0.7,
    },
    quantityText: {
        ...Styles.boldTitle,
        minWidth: 30,
        textAlign: 'center',
    },
    totalAmountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: Colors.lighterGrey,
        borderRadius: 10,
        marginBottom: 10,
    },
    totalAmountLabel: {
        ...Styles.boldTitle,
        color: Colors.black,
    },
    totalAmountValue: {
        ...Styles.boldTitle,
        color: Colors.primary,
        fontSize: 18,
    },
    viewCartButton: {
        marginTop: 10,
    },
});

export default CreateOrderScreen;

