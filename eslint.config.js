// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import vueParser from 'vue-eslint-parser';

export default tseslint.config(
  {
    ignores: [
      '.nuxt',
      '.output',
      'dist',
      'node_modules',
      'coverage',
      'playwright-report',
      'test-results',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      // CRITICAL: No explicit any types allowed
      '@typescript-eslint/no-explicit-any': 'error',
      // Prevent unused variables
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // CRITICAL: No explicit any types allowed
      '@typescript-eslint/no-explicit-any': 'error',
      // Require explicit return types for functions
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
        },
      ],
      // Prevent unused variables
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      // Enforce naming conventions
      '@typescript-eslint/naming-convention': [
        'error',
        // Variables and functions: camelCase
        {
          selector: 'variableLike',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        // Type names: PascalCase (NO I prefix)
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        // Constants: UPPER_SNAKE_CASE or camelCase
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        },
      ],
    },
  }
);
