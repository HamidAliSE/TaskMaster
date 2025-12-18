import { View, Text, TextInput as RNTextInput, StyleSheet, TextInputProps } from 'react-native';
import Styles from 'constants/Styles';
import Colors from 'constants/Colors';

interface CustomTextInputProps extends TextInputProps {
    label: string;
}

const TextInput = ({ label, style, ...props }: CustomTextInputProps) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <RNTextInput
                style={[styles.input, style]}
                {...props}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        ...Styles.title,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: Colors.lighterGrey,
        ...Styles.title,
    },
});

export default TextInput;

