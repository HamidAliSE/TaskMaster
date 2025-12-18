import { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useReactNavigation } from 'hooks';
import { Header, Separator, Button, IconButton } from 'components';
import { Edit, Delete } from 'images/svg';
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
                                        // TODO: Implement edit functionality
                                        console.log('Edit product:', item.name);
                                    }}
                                    buttonStyle={styles.iconButtonSpacing}
                                />
                                <IconButton
                                    icon={Delete}
                                    onPress={() => {
                                        // TODO: Implement delete functionality
                                        console.log('Delete product:', item.name);
                                    }}
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
