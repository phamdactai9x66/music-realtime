module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import'],
  rules: {
    // ─── Formatting ───────────────────────────────────────────────
    'indent': ['error', 2, { SwitchCase: 1 }],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'max-len': ['warn', { code: 150, ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true }],
    'eol-last': ['error', 'always'],
    'no-trailing-spaces': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
    'arrow-parens': ['error', 'always'],

    // ─── TypeScript ───────────────────────────────────────────────
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],

    // ─── React ────────────────────────────────────────────────────
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // ─── Console ──────────────────────────────────────────────────
    'no-console': 'off',

    // ─── Import Order ─────────────────────────────────────────────
    'import/order': [
      'error',
      {
        groups: [
          'builtin',       // node built-ins (path, fs,...)
          'external',      // third-party (react, @mui, redux,...)
          'internal',      // src/...
          ['parent', 'sibling', 'index'], // relative imports
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'src/**',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'import/no-duplicates': 'error',
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
      node: {
        paths: ['src'],
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },
  },
};
