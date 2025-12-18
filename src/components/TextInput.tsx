import React from 'react';
import { View, Text, TextInput as RNTextInput, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import Styles from 'constants/Styles';
import Colors from 'constants/Colors';
import { SvgViewer } from 'components';

interface CustomTextInputProps extends TextInputProps {
    label: string;
    rightIcon?: React.FC<React.ComponentProps<any>>;
    onRightIconPress?: () => void;
}

const TextInput = ({ label, style, rightIcon, onRightIconPress, ...props }: CustomTextInputProps) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputWrapper}>
                <RNTextInput
                    style={[styles.input, rightIcon && styles.inputWithIcon, style]}
                    placeholderTextColor={Colors.lightGrey}
                    {...props}
                />
                {rightIcon && onRightIconPress && (
                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={onRightIconPress}
                        activeOpacity={0.7}
                    >
                        <SvgViewer svg={rightIcon} width={20} height={20} />
                    </TouchableOpacity>
                )}
            </View>
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
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        height: 40,
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: Colors.lighterGrey,
        ...Styles.title,
        flex: 1,
    },
    inputWithIcon: {
        paddingRight: 45,
    },
    iconContainer: {
        position: 'absolute',
        right: 15,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TextInput;

