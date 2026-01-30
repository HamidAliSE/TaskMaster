import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Header } from 'components';
import Colors from 'constants/Colors';
import Styles from 'constants/Styles';

interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
}

interface Order {
    id: string;
    items: OrderItem[];
    totalAmount: number;
    /** Firestore returns timestamps as objects with toDate(), not as plain Date */
    createdAt: { toDate: () => Date } | null;
}

const OrdersScreen = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('orders')
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                (snapshot) => {
                    const list = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                        createdAt: doc.data().createdAt ?? null,
                    })) as Order[];
                    setOrders(list);
                    setLoading(false);
                },
                (error) => {
                    console.error('Error fetching orders:', error);
                    setLoading(false);
                },
            );
        return unsubscribe;
    }, []);

    const formatDate = (timestamp: Order['createdAt']) => {
        if (!timestamp) return '—';
        const date = timestamp.toDate();
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const renderOrder = ({ item }: { item: Order }) => (
        <View style={styles.orderCard}>
            <Text style={styles.orderDate}>{formatDate(item.createdAt)}</Text>
            <Text style={styles.orderItems}>
                {item.items.map((i) => `${i.name} × ${i.quantity}`).join(', ')}
            </Text>
            <Text style={styles.orderTotal}>Total: {item.totalAmount} Rs.</Text>
        </View>
    );

    return (
        <View style={styles.screen}>
            <Header title="Orders" showBackButton />
            <View style={styles.contentContainer}>
                {loading ? (
                    <Text style={styles.placeholder}>Loading orders...</Text>
                ) : orders.length === 0 ? (
                    <Text style={styles.placeholder}>No orders yet.</Text>
                ) : (
                    <FlatList
                        data={orders}
                        keyExtractor={(item) => item.id}
                        renderItem={renderOrder}
                        contentContainerStyle={styles.listContent}
                    />
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
        ...Styles.screenPadding,
    },
    listContent: {
        paddingVertical: 20,
    },
    orderCard: {
        padding: 16,
        marginBottom: 12,
        backgroundColor: Colors.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee',
    },
    orderDate: {
        ...Styles.boldTitle,
        fontSize: 14,
        color: Colors.lightGrey,
        marginBottom: 4,
    },
    orderItems: {
        ...Styles.title,
        fontSize: 14,
        color: Colors.black,
        marginBottom: 4,
    },
    orderTotal: {
        ...Styles.boldTitle,
        fontSize: 14,
        color: Colors.primary,
    },
    placeholder: {
        ...Styles.title,
        color: Colors.lightGrey,
        textAlign: 'center',
        marginTop: 24,
    },
});

export default OrdersScreen;
