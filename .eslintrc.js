module.exports = {
  extends: ['next', 'prettier'],
  plugins: ['unicorn'],
  rules: {
    'no-unused-vars': 'off',
    'prefer-const': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'unicorn/filename-case': [
      'error',
      {
          "cases": {
              "camelCase": true,
              "pascalCase": true
          }
      }
    ]
  }
};
