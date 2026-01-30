import { View, StyleSheet } from 'react-native';
import { Header } from 'components';
import { useReactNavigation } from 'hooks';
import Styles from 'constants/Styles';
import Colors from 'constants/Colors';

const AdminDashboardScreen = () => {
    const { navigate } = useReactNavigation();

    return (
        <View style={styles.screen}>
            <Header title="Admin Dashboard" />
            <View style={styles.contentContainer}>
                {/* Add admin-specific actions here */}
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

export default AdminDashboardScreen;
