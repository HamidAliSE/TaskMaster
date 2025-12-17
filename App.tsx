import AppNavigation from 'navigation';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppNavigation />
        </SafeAreaView>
    );
}

export default App;
