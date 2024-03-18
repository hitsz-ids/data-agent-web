module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'no-var': 'error',
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-use-before-define': 'off',
    'no-irregular-whitespace': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react-hooks/rules-of-hooks': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'prefer-const': 'off',
    'no-prototype-builtins': 'off',
    'no-inner-declarations': 'off',
    'react/react-in-jsx-scope': 'off',
    // 设置 typescript-eslint 规则 https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { vars: 'local', args: 'none' }],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          accessors: 'off',
          constructors: 'no-public',
          methods: 'off',
          properties: 'off',
          parameterProperties: 'off'
        }
      }
    ],
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          'static-field',
          'instance-field',
          'private-field',
          'constructor',
          'static-method',
          'instance-method',
          'abstract-method'
        ]
      }
    ]
  }
};
