import { View, StyleSheet } from 'react-native';
import { Header, Button } from 'components';
import { useReactNavigation } from 'hooks';
import { useAuth } from 'contexts/AuthContext';
import Styles from 'constants/Styles';
import Colors from 'constants/Colors';

const CustomerDashboardScreen = () => {
    const { navigate } = useReactNavigation();
    const { signOut } = useAuth();

    const handleCreateOrder = () => {
        navigate.toCreateOrder(undefined);
    };

    const handleSignOut = async () => {
        await signOut();
        navigate.toSignIn(undefined);
    };

    return (
        <View style={styles.screen}>
            <Header title="Customer Dashboard" />
            <View style={styles.contentContainer}>
                <Button title="Create Order" onPress={handleCreateOrder} />
                <Button title="Sign Out" onPress={handleSignOut} style={styles.signOutButton} />
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
    signOutButton: {
        marginTop: 20,
    },
});

export default CustomerDashboardScreen;
