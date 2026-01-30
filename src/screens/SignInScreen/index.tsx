import { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useReactNavigation } from 'hooks';
import { useAuth } from 'contexts/AuthContext';
import { Header, TextInput, Button, AppLoader } from 'components';
import { EyeOpen, EyeClosed } from 'images/svg';
import Styles from 'constants/Styles';
import Colors from 'constants/Colors';
import { validateEmailField, validatePasswordField } from 'helpers/Utils';

const SignInScreen = () => {
    const { navigate } = useReactNavigation();
    const { signIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = async () => {
        setIsLoading(true);

        const emailError = validateEmailField(email);
        if (emailError) {
            setIsLoading(false);
            Alert.alert('Validation Error', emailError);
            return;
        }

        const passwordError = validatePasswordField(password);
        if (passwordError) {
            setIsLoading(false);
            Alert.alert('Validation Error', passwordError);
            return;
        }

        try {
            const { role } = await signIn(email, password);

            if (role === 'admin') {
                navigate.toAdminDashboard(undefined);
            } else {
                navigate.toCustomerDashboard(undefined);
            }
        } catch (error: any) {
            let errorMessage = 'Failed to sign in. Please try again.';

            if (error.code === 'auth/invalid-credential') {
                errorMessage = 'Invalid email or password. Please check your credentials and try again.';
            } else if (error.code === 'auth/user-not-found') {
                errorMessage = 'No account found with this email address.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'The email address is invalid.';
            } else if (error.code === 'auth/user-disabled') {
                errorMessage = 'This account has been disabled.';
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = 'Too many failed attempts. Please try again later.';
            } else if (error.message) {
                errorMessage = error.message;
            }

            Alert.alert('Error', errorMessage);
            console.error('Error signing in:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignUpPress = () => {
        navigate.toSignUp(undefined);
    };

    return (
        <View style={styles.screen}>
            <Header title="Sign In" />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.formContainer}>
                    <TextInput
                        label="Email"
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        editable={!isLoading}
                    />
                    <TextInput
                        label="Password"
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                        editable={!isLoading}
                        rightIcon={showPassword ? EyeClosed : EyeOpen}
                        onRightIconPress={() => setShowPassword(!showPassword)}
                    />
                    <Button
                        title="Sign In"
                        style={styles.signInButton}
                        onPress={handleSignIn}
                        disabled={isLoading}
                    />
                    <View style={styles.signUpContainer}>
                        <Text style={styles.signUpText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={handleSignUpPress} disabled={isLoading}>
                            <Text style={styles.signUpLink}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            {isLoading && <AppLoader />}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
        paddingVertical: 20,
        ...Styles.screenPadding,
    },
    formContainer: {
        flex: 1,
    },
    signInButton: {
        marginTop: 20,
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    signUpText: {
        ...Styles.title,
        color: Colors.black,
    },
    signUpLink: {
        ...Styles.boldTitle,
        color: Colors.primary,
    },
});

export default SignInScreen;

