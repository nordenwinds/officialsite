module.exports = {
    'extends': [
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
        'prettier',
    ],
    'env': {
        'node': true,
        'es2020': true,
    },
    'parserOptions': {
        'parser': '@typescript-eslint/parser',
        'sourceType': 'module',
    }
};