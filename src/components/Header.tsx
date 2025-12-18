import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import Styles from 'constants/Styles';
import { SvgViewer } from 'components';
import { ArrowLeftWhite } from 'images/svg';
import Colors from 'constants/Colors';
import { useReactNavigation } from 'hooks';

interface HeaderProps {
    title: string;
    onPressRightIcon?: () => void;
    onPressNextToRightIcon?: () => void;
    rightIcon?: boolean;
    nextToRightIcon?: boolean;
    rightIconSource?: React.FC<React.ComponentProps<any>>;
    nextToRightIconSource?: React.FC<React.ComponentProps<any>>;
    showBackButton?: boolean;
}

const Header = ({
    title,
    onPressRightIcon,
    onPressNextToRightIcon,
    rightIcon,
    nextToRightIcon,
    rightIconSource,
    nextToRightIconSource,
    showBackButton,
}: HeaderProps) => {
    const { goBack } = useReactNavigation();
    return (
        <View style={styles.header}>
            <View style={styles.leftContainer}>
                {showBackButton ?
                    <TouchableOpacity style={styles.leftIconContainer} onPress={goBack}>
                        <SvgViewer svg={ArrowLeftWhite} width={24} height={24} />
                    </TouchableOpacity>
                    : null}
                {title && <Text style={styles.title}>{title}</Text>}
            </View>
            <View style={styles.rightContainer}>
                {nextToRightIcon && nextToRightIconSource && (
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={onPressNextToRightIcon}
                    >
                        <SvgViewer svg={nextToRightIconSource} width={25} height={25} />
                    </TouchableOpacity>
                )}
                {rightIcon && rightIconSource && (
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={onPressRightIcon}
                    >
                        <SvgViewer svg={rightIconSource} width={50} height={50} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.primary,
        ...Styles.screenPadding,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        color: Colors.white,
        ...Styles.subheading,
    },
    iconButton: {
        marginLeft: 15,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryLight,
    },
    leftIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Header;
