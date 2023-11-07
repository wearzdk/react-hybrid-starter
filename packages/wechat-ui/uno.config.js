import presetIcons from '@unocss/preset-icons'
import transformerDirectives from '@unocss/transformer-directives'
import { defineConfig, presetUno } from 'unocss'
import presetWeapp from 'unocss-preset-weapp'
import { extractorAttributify, transformerClass } from 'unocss-preset-weapp/transformer'

// eslint-disable-next-line unused-imports/no-unused-vars
const themes = {
  theme: {
    dark: {
      colors: {
        canvas: '#252525',
        text1: '#FFFFFF',
        text2: '#BDBDBD',
        border: '#3A3A3A',
        fill1: '#1F1F1F',
        fill2: '#2B2B2B',
        fill3: '#3A3A3A',
      },
    },
    oneDark: {
      colors: {
        canvas: '#282C34',
        text1: '#ABB2BF',
        text2: '#5C6370',
        border: '#3E4451',
        fill1: '#21252B',
        fill2: '#2C323D',
        fill3: '#3E4451',
      },
    },
  },
}

const prefix = 'li-'

const { presetWeappAttributify, transformerAttributify } = extractorAttributify({
  classPrefix: prefix,
})

export default defineConfig({
  presets: [
    presetUno(),
    presetWeapp({
      prefix,
      // eslint-disable-next-line node/prefer-global/process
      isH5: process.env.TARO_ENV === 'h5',
      platform: 'taro',
    }),
    presetIcons({
      prefix: 'i-',
    }),

    // presetTheme(themes),
    presetWeappAttributify(),
  ],
  transformers: [
    transformerAttributify(),
    transformerClass(),
    transformerDirectives({
      enforce: 'pre',
    }),
  ],
  theme: {
    colors: {
      primary: '#181F2A',
      secondary: '#5C5CEA',
      canvas: '#EFF1F4',
      text1: '#181F2A',
      text2: '#818181',
      border: '#DFE1E7',
      error: '#FF6666',
      success: '#79C879',
      danger: '#E92B35',
      fill1: '#F7F7F7',
      fill2: '#F2F2F2',
      fill3: '#EDEDED',
    },
  },
  shortcuts: {
    input: 'w-full h-8 px-2 border bg-fill2 border-border rounded focus:outline-none focus:ring-1 focus:ring-primary',
  },
})
