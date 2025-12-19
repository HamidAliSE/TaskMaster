import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';
import Styles from 'constants/Styles';
import Colors from 'constants/Colors';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
}

const Button = ({ title, style, disabled, ...props }: ButtonProps) => {
    return (
        <TouchableOpacity 
            style={[styles.button, disabled && styles.buttonDisabled, style]} 
            disabled={disabled}
            {...props}
        >
            <Text style={[styles.buttonTitle, disabled && styles.buttonTitleDisabled]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.secondary,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: Colors.lightGrey,
        opacity: 0.6,
    },
    buttonTitle: {
        ...Styles.title,
        color: Colors.white,
    },
    buttonTitleDisabled: {
        color: Colors.white,
        opacity: 0.7,
    },
});

export default Button;

