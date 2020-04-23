module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:sonarjs/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: '.',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'sonarjs', 'import'],
  rules: {
    semi: 'warn',
    curly: 'off',
    'lines-between-class-members': 'off',
    'no-plusplus': 'off',
    'class-methods-use-this': 'off',
    'prefer-spread': 'warn',
    'no-continue': 'off',
    'operator-linebreak': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    'arrow-parens': 'off',
    'no-param-reassign': 'off',
    'nonblock-statement-body-position': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true },
    ],
    'import/no-default-export': 'error',
    'import/prefer-default-export': 'off',
    'import/no-cycle': 'off',
    '@typescript-eslint/no-useless-constructor': 'off',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      { allowExpressions: true, allowTypedFunctionExpressions: true },
    ],
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true, typedefs: true },
    ],
    '@typescript-eslint/explicit-member-accessibility': [
      'warn',
      {
        accessibility: 'explicit',
        overrides: {
          constructors: 'no-public',
          properties: 'no-public',
        },
      },
    ],
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-this-alias': 'error',
    '@typescript-eslint/unbound-method': 'error',
  },
};
