import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

const MEDIAPIPE_ONLY_IN_POSE = {
  group: ['@mediapipe/*'],
  message: 'Solo pose/ puede importar MediaPipe (CLAUDE.md §8).',
};

// Lógica pura (CLAUDE.md §8). pipeline/ también entra: el benchmark lo ejecuta desde Node.
const PURE_MODULES = [
  'src/goniometry/**',
  'src/filters/**',
  'src/correction/**',
  'src/compensation/**',
  'src/uncertainty/**',
  'src/quality/**',
  'src/pipeline/**',
];

export default defineConfig([
  globalIgnores(['dist', 'public/models']),
  js.configs.recommended,
  tseslint.configs.strict,
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [reactHooks.configs.flat.recommended],
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/pose/**'],
    rules: {
      'no-restricted-imports': ['error', { patterns: [MEDIAPIPE_ONLY_IN_POSE] }],
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/api/**'],
    rules: {
      'no-restricted-globals': [
        'error',
        { name: 'fetch', message: 'Solo api/ habla con el backend (CLAUDE.md §8).' },
      ],
    },
  },
  {
    files: PURE_MODULES,
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            { name: 'react', message: 'La lógica pura no importa React (CLAUDE.md §8).' },
            { name: 'react-dom', message: 'La lógica pura no importa React (CLAUDE.md §8).' },
          ],
          patterns: [
            MEDIAPIPE_ONLY_IN_POSE,
            {
              group: ['**/api', '**/api/*'],
              message: 'La lógica pura no usa api/ (CLAUDE.md §8).',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['scripts/**/*.mjs'],
    languageOptions: {
      globals: {
        process: 'readonly',
        console: 'readonly',
        URL: 'readonly',
        fetch: 'readonly',
        Buffer: 'readonly',
      },
    },
  },
  prettier,
]);
