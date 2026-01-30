import AppNavigation from 'navigation';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { CartProvider } from 'contexts/CartContext';
import { AuthProvider } from 'contexts/AuthContext';

const App = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <SafeAreaProvider>
                    <SafeAreaView style={{ flex: 1 }}>
                        <AppNavigation />
                    </SafeAreaView>
                </SafeAreaProvider>
            </CartProvider>
        </AuthProvider>
    );
};

export default App;
