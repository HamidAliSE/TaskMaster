const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const metroConfigSVG = require('./metro-config/svg');

module.exports = (async () => {
    const base = await getDefaultConfig(__dirname);
    const svgConfig = metroConfigSVG(base);

    return mergeConfig(base, svgConfig);
})();
