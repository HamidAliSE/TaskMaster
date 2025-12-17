import { StyleSheet, View } from 'react-native';
import Colors from 'constants/Colors';

const Separator = () => {
    return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: Colors.black,
    },
});

export default Separator;
