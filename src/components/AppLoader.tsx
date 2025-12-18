import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Colors from 'constants/Colors';

interface AppLoaderProps {
    overlay?: boolean;
    size?: 'small' | 'large';
    color?: string;
}

const AppLoader = ({ overlay = true, size = 'large', color = Colors.primary }: AppLoaderProps) => {
    if (overlay) {
        return (
            <View style={styles.overlay}>
                <ActivityIndicator size={size} color={color} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ActivityIndicator size={size} color={color} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
});

export default AppLoader;

