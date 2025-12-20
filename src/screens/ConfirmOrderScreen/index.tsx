import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from 'components';
import Colors from 'constants/Colors';

const ConfirmOrderScreen = () => {
    return (
        <View style={styles.screen}>
            <Header title="Confirm Order" showBackButton />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.white,
    },
});

export default ConfirmOrderScreen;

