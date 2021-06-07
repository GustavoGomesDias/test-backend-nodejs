module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'import/first': 'off',
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
  },
};
