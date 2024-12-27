module.exports = {
    extends: ['next', 'next/core-web-vitals'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off', // Disable unused variables rule
      'react/no-unescaped-entities': 'off', // Disable unescaped entities rule
      '@typescript-eslint/no-explicit-any': 'off', // Disable any type rule
    },
  };
  