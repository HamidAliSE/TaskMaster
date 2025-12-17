import AppNavigation from 'navigation';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <AppNavigation />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

export default App;
