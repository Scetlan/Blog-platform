// module.exports = {
//   env: {
//     browser: true,
//     es2021: true,
//     jest: true,
//   },
//   ignorePatterns: ['node_modules', 'dist', 'build'],
//   extends: [
//     'eslint:recommended',
//     'airbnb',
//     'airbnb/hooks',
//     'plugin:react/jsx-runtime',
//     'plugin:jsx-a11y/recommended',
//   ],
//   parserOptions: {
//     ecmaFeatures: {
//       jsx: true,
//     },
//     ecmaVersion: 'latest',
//     sourceType: 'module',
//   },
//   plugins: ['react', 'jsx-a11y', 'import', 'react-hooks'],
//   rules: {
//     'react/state-in-constructor': 0,
//     'jsx-a11y/label-has-associated-control': 0,
//     'react/react-in-jsx-scope': 'off',
//     'react/prop-types': 0,
//     'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
//     indent: ['error', 2],
//     'linebreak-style': [0, 'unix'],
//     quotes: ['error', 'single'],
//     'import/no-unresolved': [2, { caseSensitive: false }],
//     'import/order': [
//       'error',
//       {
//         groups: ['index', 'sibling', 'parent', 'internal', 'external', 'builtin'],
//       },
//     ],
//   },
//   settings: {
//     version: 'detect',
//     'import/resolver': {
//       node: {
//         extensions: ['.js', '.jsx'],
//         moduleDirectory: ['node_modules', 'src/'],
//       },
//     },
//   },
// };
module.exports = {
  root: true,
  env: { browser: true, es2020: true, jest: true },
  extends: [
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    'airbnb-base',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'build'],
  rules: {
    'no-unused-vars': 'off',
    'react/state-in-constructor': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'prettier/prettier': 'error',
    'linebreak-style': [0, 'unix'],
    quotes: ['error', 'single'],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 0,
    'import/no-unresolved': [2, { caseSensitive: false }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/order': [
      2,
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
      },
    ],
    'import/extensions': [
      'error',
      {
        js: 'never',
        jsx: 'never',
      },
    ],
  },
};
