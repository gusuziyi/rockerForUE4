module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
    es6: true,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.vue', '.json'],
      },
    },
  },
  extends: [
    //"eslint:recommended"
    //"standard"
    'airbnb-base',
    'plugin:vue/recommended',
    'plugin:vue/strongly-recommended',
    'plugin:vue/essential',
    'plugin:prettier/recommended',
  ],
  plugins: ['vue'],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': 'off',
    radix: 'error',
    'no-nested-ternary': 'off',
    'no-plusplus': 'off',
    'vue/html-self-closing': 0,
    'import/extensions': [
      'off',
      'always',
      {
        js: 'never',
        vue: 'never',
      },
    ],
    'vue/no-parsing-error': [
      'error',
      {
        'invalid-first-character-of-tag-name': false,
      },
    ],
    'vue/require-prop-types': 'off',
    'vue/require-default-prop': 'off',
    'vue/name-property-casing': ['error', 'PascalCase'],
    'vue/max-attributes-per-line': [
      'off',
      {
        singleline: 1,
        multiline: {
          max: 10,
          allowFirstLine: true,
        },
      },
    ],
    'vue/html-closing-bracket-newline': [
      0,
      {
        singleline: 'never',
        multiline: 'always',
      },
    ],
    'vue/html-closing-bracket-spacing': [
      'off',
      {
        startTag: 'always',
        endTag: 'off',
        selfClosingTag: 'off',
      },
    ],
    'linebreak-style': [0, 'windows'],
    'ue/html-closing-bracket-spacing': 0,
    'no-trailing-spaces': ['error', { skipBlankLines: true }],
    'no-underscore-dangle': 'off',
    'no-restricted-globals': 0,
    'global-require': 'off',
    'no-restricted-syntax': 0,
    'no-param-reassign': [0, {}],
    'new-cap': 0,
    'prefer-destructuring': 0,
    radix: 0,
    'no-shadow': 0,
    'max-len': ['error', { code: 300 }],
    'guard-for-in': 0,
    'func-names': 0,
    'import/no-dynamic-require': 0,
    'prettier/prettier': [
      'off',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
