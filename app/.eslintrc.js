module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension
      parserOptions: {
        project: ['./tsconfig.json'] // Specify it only for TypeScript files
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      tsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    'react/jsx-filename-extension': [
      2,
      { extensions: ['ts', 'tsx'] }
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/triple-slash-reference': 0,
    '@typescript-eslint/consistent-type-definitions': 'off',
    'no-empty-pattern': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    'no-tabs': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-new': 'off',
    'react/no-unescaped-entities': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-floating-promises': 'off'
  }
}
