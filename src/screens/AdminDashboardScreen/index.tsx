import { View, StyleSheet } from 'react-native';
import { Header, Button } from 'components';
import { useReactNavigation } from 'hooks';
import { useAuth } from 'contexts/AuthContext';
import Styles from 'constants/Styles';
import Colors from 'constants/Colors';

const AdminDashboardScreen = () => {
    const { navigate } = useReactNavigation();
    const { signOut } = useAuth();

    const handleSignOut = async () => {
        await signOut();
        navigate.toSignIn(undefined);
    };

    return (
        <View style={styles.screen}>
            <Header title="Admin Dashboard" />
            <View style={styles.contentContainer}>
                <Button title="Products" onPress={() => navigate.toProducts(undefined)} style={styles.productsButton} />
                <Button title="Sign Out" onPress={handleSignOut} />
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
    productsButton: {
        marginBottom: 20,
    },
});

export default AdminDashboardScreen;
