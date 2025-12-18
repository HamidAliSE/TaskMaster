import { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Header, TextInput, Button, AppLoader } from 'components';
import { EyeOpen, EyeClosed } from 'images/svg';
import Styles from 'constants/Styles';
import Colors from 'constants/Colors';

const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (emailValue: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailValue);
    };

    const handleSignUp = async () => {
        setIsLoading(true);

        if (!email.trim()) {
            setIsLoading(false);
            Alert.alert('Validation Error', 'Please enter your email address.');
            return;
        }

        if (!validateEmail(email.trim())) {
            setIsLoading(false);
            Alert.alert('Validation Error', 'Please enter a valid email address.');
            return;
        }

        if (!password.trim()) {
            setIsLoading(false);
            Alert.alert('Validation Error', 'Please enter a password.');
            return;
        }

        if (password.length < 6) {
            setIsLoading(false);
            Alert.alert('Validation Error', 'Password must be at least 6 characters long.');
            return;
        }

        if (password !== confirmPassword) {
            setIsLoading(false);
            Alert.alert('Validation Error', 'Passwords do not match.');
            return;
        }

        try {
            // TODO: Implement Firebase Authentication sign up
            // import auth from '@react-native-firebase/auth';
            // await auth().createUserWithEmailAndPassword(email.trim(), password);

            Alert.alert('Success', 'Account created successfully!');
            // TODO: Navigate to appropriate screen after successful sign up
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to create account. Please try again.');
            console.error('Error signing up:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignInPress = () => {
        // TODO: Navigate to sign in screen when it's created
        Alert.alert('Coming Soon', 'Sign in screen is not available yet.');
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
