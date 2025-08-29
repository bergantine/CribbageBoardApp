// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      prettier: require('eslint-plugin-prettier'),
    },
    rules: {
      // Prettier integration
      'prettier/prettier': 'error',

      // Unused imports - TypeScript projects
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true
      }],

      // For JavaScript files
      'no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true
      }],
    },
  },
  // This should come last to disable conflicting rules
  require('eslint-config-prettier'),
]);
