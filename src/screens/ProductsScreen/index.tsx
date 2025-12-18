import { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useReactNavigation } from 'hooks';
import { Header, Separator, Button } from 'components';
import Styles from 'constants/Styles';
import Colors from 'constants/Colors';

interface Product {
    name: string;
    price: number;
}

const ProductsScreen = () => {
    const { navigate } = useReactNavigation();
    const [products, setProducts] = useState<Product[]>([]);

    useFocusEffect(
        useCallback(() => {
            firestore().collection('products').get().then((snapshot) => {
                setProducts(snapshot.docs.map((doc) => doc.data()) as Product[]);
            });
        }, [])
    );

    return (
        <View style={styles.screen}>
            <Header title="Products" />
            <View style={styles.contentContainer}>

                <FlatList
                    data={products}
                    style={styles.productList}
                    ItemSeparatorComponent={<Separator />}
                    renderItem={({ item }) => (
                        <View key={item.name} style={styles.productEntry}>
                            <Text style={styles.productName}>{item.name}</Text>
                            <Text>{item.price} Rs.</Text>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    productName: {
        ...Styles.title,
    },
    productPrice: {
        ...Styles.title,
    },
});

export default ProductsScreen;
