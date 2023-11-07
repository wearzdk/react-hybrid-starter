import antfu from '@antfu/eslint-config'
import * as pluginReactHooks from 'eslint-plugin-react-hooks'

export default antfu({
  stylistic: {
    indent: 2,
    quotes: 'single',
  },
  plugins: {
    'react-hooks': pluginReactHooks,
  },
  rules: {
    'eslint-comments/no-unlimited-disable': 'off',
    'no-console': 'off',
    ...pluginReactHooks.configs.recommended.rules,
  },
  jsonc: false,
  yaml: true,
  vue: false,
  typescript: true,
  markdown: false,
  settings: {
    react: {
      version: 'detect',
    },
  },
})
