export const validateEmail = (emailValue: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
};

export const validateEmailField = (email: string): string | null => {
    if (!email.trim()) {
        return 'Please enter your email address.';
    }
    if (!validateEmail(email.trim())) {
        return 'Please enter a valid email address.';
    }
    return null;
};

export const validatePasswordField = (password: string): string | null => {
    if (!password.trim()) {
        return 'Please enter your password.';
    }
    if (password.length < 6) {
        return 'Password must be at least 6 characters long.';
    }
    return null;
};

export const validatePasswordConfirmation = (password: string, confirmPassword: string): string | null => {
    if (password !== confirmPassword) {
        return 'Passwords do not match.';
    }
    return null;
};

