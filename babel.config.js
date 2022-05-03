module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
    [
      'module-resolver',
      {
        extensions: ['.js', '.json', '.ts', '.ios.tsx', '.android.tsx', '.tsx'],
        root: ['.'],
        alias: {
          '@': './src',
        },
      },
    ],
  ],
}
