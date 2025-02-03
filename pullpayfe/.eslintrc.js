module.exports = {
  extends: ['next', 'next/core-web-vitals', 'plugin:@typescript-eslint/recommended'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off', // Allow `any` type
    '@typescript-eslint/no-unused-vars': 'warn', // Warn about unused variables
    'no-unused-vars': 'off', // Disable default unused-vars rule
    'react/no-unescaped-entities': 'off', // Disable the unescaped entities rule
  },
};
