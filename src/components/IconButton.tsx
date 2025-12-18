import React from 'react';
import { TouchableOpacity, StyleSheet, TouchableOpacityProps, ViewStyle } from 'react-native';
import SvgViewer from './SvgViewer';
import Colors from 'constants/Colors';

interface IconButtonProps extends TouchableOpacityProps {
    icon: React.FC<React.ComponentProps<any>> | string | number;
    iconWidth?: number;
    iconHeight?: number;
    buttonStyle?: ViewStyle;
}

const IconButton = ({
    icon,
    iconWidth = 20,
    iconHeight = 20,
    buttonStyle,
    style,
    ...props
}: IconButtonProps) => {
    return (
        <TouchableOpacity
            style={[styles.iconButton, buttonStyle, style]}
            {...props}
        >
            <SvgViewer svg={icon} width={iconWidth} height={iconHeight} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    iconButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: Colors.white,
    },
});

export default IconButton;

