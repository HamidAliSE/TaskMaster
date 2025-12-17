import React from 'react';
import { View, Image } from 'react-native';

interface Props {
    svg: React.FC<React.ComponentProps<any>> | string | number;
    width: number;
    height: number;
}

const SvgViewer = ({ svg, width, height }: Props) => {
    if (typeof svg === 'number') {
        // PNG imported as a module (require or import)
        return (
            <View>
                <Image source={svg} style={{ width, height, resizeMode: 'contain' }} />
            </View>
        );
    }
    if (typeof svg === 'string') {
        // URI string
        return (
            <View>
                <Image source={{ uri: svg }} style={{ width, height, resizeMode: 'contain' }} />
            </View>
        );
    }
    if (typeof svg === 'function') {
        // SVG React component
        const Svg = svg;
        return (
            <View>
                <Svg width={width} height={height} />
            </View>
        );
    }
    return null;
};

export default SvgViewer;
