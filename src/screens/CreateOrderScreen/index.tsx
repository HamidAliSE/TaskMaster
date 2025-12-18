import { View, StyleSheet } from 'react-native';
import { Header } from 'components';
import Styles from 'constants/Styles';
import Colors from 'constants/Colors';

const CreateOrderScreen = () => {
    return (
        <View style={styles.screen}>
            <Header title="Create Order" showBackButton />
            <View style={styles.contentContainer}>
                {/* Order creation form will be added here */}
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

export default CreateOrderScreen;

