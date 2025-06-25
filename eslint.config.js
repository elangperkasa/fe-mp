import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config} */

export default tseslint.config(
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    // pluginReactHooks.configs.flat.recommended,
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        ignores: [
            'build/*',
            'dist/*',
            'public/*',
            '**/out/*',
            '**/node_modules/*',
            '**/.next/*',
            '**/next.config.js',
            '**/vite.config.ts',
            'src/reportWebVitals.js',
            'src/service-worker.js',
            'src/serviceWorkerRegistration.js',
            'src/setupTests.js',
            'src/reportWebVitals.ts',
            'src/service-worker.ts',
            'src/serviceWorkerRegistration.ts',
            'src/setupTests.ts',
        ],
        plugins: { 'react-hooks': pluginReactHooks.configs.recommended.rules },
        rules: {
            '@typescript-eslint/no-explicit-any': 'off', // This will strictly disallow 'any'
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-empty-object-type': 'off',
            'react/prop-types': 'off',
            'react/jsx-uses-react': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/display-name': 'off',
            'react/no-children-prop': 'off',
        },
        languageOptions: { globals: { ...globals.browser, ...globals.node } },
    }
)
