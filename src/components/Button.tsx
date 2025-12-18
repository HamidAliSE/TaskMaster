import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';
import Styles from 'constants/Styles';
import Colors from 'constants/Colors';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
}

const Button = ({ title, style, ...props }: ButtonProps) => {
    return (
        <TouchableOpacity style={[styles.button, style]} {...props}>
            <Text style={styles.buttonTitle}>{title}</Text>
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
    buttonTitle: {
        ...Styles.title,
        color: Colors.white,
    },
});

export default Button;

