import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Header, Separator, Button } from 'components';
import Colors from 'constants/Colors';
import Styles from 'constants/Styles';
import { useCart, useReactNavigation } from 'hooks';
import { CartItem } from 'contexts/CartContext';
import { CUSTOMER_DASHBOARD_SCREEN } from 'screens/ScreenNames';

const ConfirmOrderScreen = () => {
    const { cartItems, getTotalAmount, clearCart } = useCart();
    const { reset } = useReactNavigation();
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateOrder = async () => {
        if (cartItems.length === 0) {
            Alert.alert('Error', 'Your cart is empty.');
            return;
        }

        setIsLoading(true);

        try {
            const orderData = {
                items: cartItems.map((item: CartItem) => ({
                    productId: item.productId,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                })),
                totalAmount: getTotalAmount(),
                createdAt: firestore.FieldValue.serverTimestamp(),
            };

            await firestore().collection('orders').add(orderData);

            clearCart();

            Alert.alert('Success', 'Order created successfully!', [
                {
                    text: 'OK',
                    onPress: () => {
                        reset(CUSTOMER_DASHBOARD_SCREEN, undefined);
                    },
                },
            ]);
        } catch (error) {
            console.error('Error creating order:', error);
            Alert.alert('Error', 'Failed to create order. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const renderCartItem = ({ item }: { item: CartItem }) => {
        const subtotal = item.price * item.quantity;
        return (
            <View style={styles.cartItem}>
                <View style={styles.itemInfoContainer}>
                    <Text style={styles.itemName} numberOfLines={1} ellipsizeMode="tail">
                        {item.name}
                    </Text>
                    <Text style={styles.itemPrice} numberOfLines={1} ellipsizeMode="tail">
                        {item.price} Rs. × {item.quantity}
                    </Text>
                </View>
                <Text style={styles.itemSubtotal}>
                    {subtotal} Rs.
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.screen}>
            <Header title="Confirm Order" showBackButton />
            <View style={styles.contentContainer}>
                {cartItems.length > 0 ? (
                    <>
                        <FlatList
                            data={cartItems}
                            style={styles.cartList}
                            ItemSeparatorComponent={<Separator />}
                            renderItem={renderCartItem}
                            keyExtractor={(item) => item.productId}
                        />
                        <View style={styles.totalAmountContainer}>
                            <Text style={styles.totalAmountLabel}>Total Amount:</Text>
                            <Text style={styles.totalAmountValue}>{getTotalAmount()} Rs.</Text>
                        </View>
                        <Button
                            title="Create Order"
                            onPress={handleCreateOrder}
                            style={styles.createOrderButton}
                            disabled={isLoading}
                        />
                    </>
                ) : (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Your cart is empty</Text>
                    </View>
                )}
            </View>
        </View>
    );
};

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
    cartList: {
        flex: 1,
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: Colors.lighterGrey,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
    },
    itemInfoContainer: {
        flex: 1,
        flexDirection: 'column',
        marginRight: 15,
    },
    itemName: {
        ...Styles.title,
        marginBottom: 4,
    },
    itemPrice: {
        ...Styles.title,
        fontSize: 14,
        color: Colors.black,
        opacity: 0.7,
    },
    itemSubtotal: {
        ...Styles.boldTitle,
        color: Colors.primary,
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
    createOrderButton: {
        marginTop: 10,
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
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        ...Styles.title,
        color: Colors.black,
        opacity: 0.5,
    },
});

export default ConfirmOrderScreen;

