module.exports = {
    extends: 'airbnb',
    plugins: [
        'react',
        'react-native',
        'react-hooks',
        'react-redux',
        'redux-saga'
    ],
    parser: 'babel-eslint',
    env: {
        jest: true,
        'react-native/react-native': true,
    },
    rules: {
        'no-use-before-define': 'off',
        'react/jsx-filename-extension': 'off',
        'react/prop-types': 'off',
        'comma-dangle': 'off',
        'padded-blocks': 'off',
        'arrow-body-style': 'off',
        'react-hooks/exhaustive-deps': 'warn',
        'react-native/no-unused-styles': 2,
        'react-native/split-platform-components': 2,
        'react-native/no-inline-styles': 2,
        'react-native/no-raw-text': 2,
        'react-native/no-single-element-style-arrays': 2,
        'no-multiple-empty-lines': [2, {
            max: 1,
            maxEOF: 0,
            maxBOF: 0
        }],
        indent: ['error', 4, {
            ignoredNodes: ['JSXElement *'],
            SwitchCase: 1
        }],
        'react/jsx-indent': ['error', 4],
        'import/prefer-default-export': 0,
        'import/no-extraneous-dependencies': 0,
        'no-case-declarations': 0,
        'react/jsx-props-no-spreading': 0,
        'react/jsx-indent-props': [2, 4],
        'global-require': 0,
        'no-shadow': 0,
        'object-property-newline': ['error', { allowAllPropertiesOnSameLine: false, }],
        'object-curly-newline': ['error', {
            multiline: true,
            minProperties: 2
        }]
    },
    globals: { fetch: false },
    parserOptions: { ecmaFeatures: { jsx: true } }
};
