import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: [
            '**/node_modules/**',
            '**/cdk.out/**',
            '**/dist/**',
            '**/.expo/**',
            '**/.turbo/**',
            'apps/mobile/uniwind-types.d.ts',
            'apps/mobile/expo-env.d.ts',
        ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: { globals: { ...globals.node } },
        rules: {
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
            ],
            '@typescript-eslint/consistent-type-imports': 'error',
        },
    },
    {
        // Config files and the Expo app's Babel/Metro configs are CommonJS.
        files: ['**/*.cjs', 'apps/mobile/*.config.js', 'apps/mobile/babel.config.js'],
        languageOptions: { sourceType: 'commonjs', globals: { ...globals.node } },
        rules: { '@typescript-eslint/no-require-imports': 'off' },
    },
    prettier,
);
