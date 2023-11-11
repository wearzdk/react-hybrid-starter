import presetIcons from '@unocss/preset-icons'
import { defineConfig, transformerDirectives } from 'unocss'
import presetWeapp from 'unocss-preset-weapp'
import { transformerClass } from 'unocss-preset-weapp/transformer'

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

export default defineConfig({

  content: {
    pipeline: {
      include: [/\.([jt]sx|css)($|\?)/],
      exclude: [],
    },
  },
  presets: [

    presetWeapp({
      // h5兼容
      // eslint-disable-next-line node/prefer-global/process
      isH5: process.env.TARO_ENV === 'h5',
      platform: 'taro',
      taroWebpack: 'webpack5',
    }),
    presetIcons({
      prefix: 'i-',
    }),

  ],
  transformers: [
    transformerClass(),
    transformerDirectives({
      enforce: 'pre',
    }),
  ],
  shortcuts: [
    {
      'border-base': 'border border-gray-500/10',
      'center': 'flex justify-center items-center',
    },
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
  blocklist: [
  ],
})
