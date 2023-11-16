import antfu from '@antfu/eslint-config'
import * as pluginReactHooks from 'eslint-plugin-react-hooks'
import react from 'eslint-plugin-react'

export default antfu({
  stylistic: {
    indent: 2,
    quotes: 'single',
  },
  plugins: {
    'react-hooks': pluginReactHooks,
    react,
  },
  rules: {
    ...pluginReactHooks.configs.recommended.rules,
    ...react.configs.recommended.rules,

    'eslint-comments/no-unlimited-disable': 'off',
    'no-console': 'off',
    'import/no-unused-modules': 'error',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
  },
  jsonc: false,
  yaml: true,
  vue: false,
  typescript: true,
  markdown: false,
  settings: {
    react: {
      version: '18.2.0',
    },
  },
})
