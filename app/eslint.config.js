import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    // Providers ship their consumer hook, and the UI primitives ship the cva
    // variants they are built from. Both are deliberate co-locations, and
    // neither breaks fast refresh in practice.
    files: [
      'src/app/portfolio-store.tsx',
      'src/app/theme-provider.tsx',
      'src/components/admin/admin-ui.tsx',
      'src/components/ui/*.tsx',
    ],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
])
