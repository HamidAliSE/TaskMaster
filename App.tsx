import AppNavigation from 'navigation';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { CartProvider } from 'contexts/CartContext';

const App = () => {
    return (
        <CartProvider>
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1 }}>
                    <AppNavigation />
                </SafeAreaView>
            </SafeAreaProvider>
        </CartProvider>
    );
}

export default App;
