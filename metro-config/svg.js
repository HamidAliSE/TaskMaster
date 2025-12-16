module.exports = base => ({
    transformer: {
        ...base.transformer,
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
        ...base.resolver,
        assetExts: base.resolver.assetExts.filter(ext => ext !== 'svg'),
        sourceExts: [...base.resolver.sourceExts, 'svg'],
    },
});
