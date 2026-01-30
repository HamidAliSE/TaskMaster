import { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, Text, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useReactNavigation } from 'hooks';
import { Header, TextInput, Button, AppLoader } from 'components';
import { EyeOpen, EyeClosed } from 'images/svg';
import Styles from 'constants/Styles';
import Colors from 'constants/Colors';
import { validateEmailField, validatePasswordField, validatePasswordConfirmation } from 'helpers/Utils';

const SignUpScreen = () => {
    const { navigate } = useReactNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = async () => {
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

        const confirmPasswordError = validatePasswordConfirmation(password, confirmPassword);
        if (confirmPasswordError) {
            setIsLoading(false);
            Alert.alert('Validation Error', confirmPasswordError);
            return;
        }

        try {
            const userCredential = await auth().createUserWithEmailAndPassword(email.trim(), password);
            const user = userCredential.user;
            await firestore().collection('users').doc(user.uid).set({
                role: 'customer',
            });

            navigate.toCustomerDashboard(undefined);

        } catch (error: any) {
            let errorMessage = 'Failed to create account. Please try again.';

            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'This email address is already in use.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'The email address is invalid.';
            } else if (error.code === 'auth/operation-not-allowed') {
                errorMessage = 'Email/password accounts are not enabled.';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'The password is too weak.';
            } else if (error.message) {
                errorMessage = error.message;
            }

            Alert.alert('Error', errorMessage);
            console.error('Error signing up:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignInPress = () => {
        navigate.toSignIn(undefined);
    };

    return (
        <View style={styles.screen}>
            <Header title="Sign Up" />
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
                    <TextInput
                        label="Confirm Password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showConfirmPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                        editable={!isLoading}
                        rightIcon={showConfirmPassword ? EyeClosed : EyeOpen}
                        onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                    <Button
                        title="Sign Up"
                        style={styles.signUpButton}
                        onPress={handleSignUp}
                        disabled={isLoading}
                    />
                    <View style={styles.signInContainer}>
                        <Text style={styles.signInText}>Already have an account? </Text>
                        <TouchableOpacity onPress={handleSignInPress} disabled={isLoading}>
                            <Text style={styles.signInLink}>Sign In</Text>
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
    signUpButton: {
        marginTop: 20,
    },
    signInContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    signInText: {
        ...Styles.title,
        color: Colors.black,
    },
    signInLink: {
        ...Styles.boldTitle,
        color: Colors.primary,
    },
});

export default SignUpScreen;
