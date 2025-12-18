import { View, StyleSheet } from 'react-native';
import { Header, Button } from 'components';
import Styles from 'constants/Styles';
import Colors from 'constants/Colors';

const CustomerDashboardScreen = () => {

    const handleCreateOrder = () => {
        // TODO: Navigate to create order screen when implemented
        console.log('Create order pressed');
    };

    return (
        <View style={styles.screen}>
            <Header title="Customer Dashboard" />
            <View style={styles.contentContainer}>
                <Button title="Create Order" onPress={handleCreateOrder} />
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
});

export default CustomerDashboardScreen;
