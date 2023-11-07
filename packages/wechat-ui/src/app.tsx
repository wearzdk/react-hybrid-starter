import { useLaunch } from '@tarojs/taro'
import type { PropsWithChildren } from 'react'

import 'uno.css'

import '@unocss/reset/tailwind.css'

import './app.css'

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log('App launched.')
  })

  return (
    <div className="">
      {children}
    </div>
  )
}

export default App
