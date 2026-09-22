import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      /* Les espaces insécables sont délibérés dans les textes français :
         ils empêchent « 50 € » de se couper en fin de ligne. Sans cette
         option, trois avertissements permanents finiraient par masquer un
         vrai caractère invisible collé par erreur. `skipJSXText` n'autorise
         l'irrégularité que dans le texte affiché, pas dans le code. */
      'no-irregular-whitespace': ['error', { skipJSXText: true }],
    },
  },
])
