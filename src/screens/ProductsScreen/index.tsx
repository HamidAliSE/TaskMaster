import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useReactNavigation } from 'hooks';
import { Header, Separator } from 'components';
import Styles from 'constants/Styles';
import Colors from 'constants/Colors';

interface Product {
    name: string;
    price: number;
}

const ProductsScreen = () => {
    const { navigate } = useReactNavigation();
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        firestore().collection('products').get().then((snapshot) => {
            setProducts(snapshot.docs.map((doc) => doc.data()) as Product[]);
        });
    }, []);

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
                <TouchableOpacity onPress={() => navigate.toAddProduct(undefined)} style={styles.addProductButton}>
                    <Text style={styles.addProductButtonTitle}>Add Product</Text>
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
    addProductButton: {
        backgroundColor: Colors.secondary,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addProductButtonTitle: {
        ...Styles.title,
        color: Colors.white,
    },
});

export default ProductsScreen;
