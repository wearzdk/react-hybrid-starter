import { useDarkMode } from '@reactuses/core'
import { Button, View } from '@tarojs/components'

export function ToggleDark() {
  const [darkTheme, toggleDark] = useDarkMode({
    classNameDark: 'dark',
    classNameLight: 'light',
    defaultValue: true,
  })
  return (
    <View className="absolute right-0 top-0 mt-5 mr-5">
      <Button
        className="inline-flex items-center btn-base p-1 hover:bg-fill2"
        onClick={toggleDark}
      >
        { darkTheme
          ? (
            <span className="i-mdi-weather-night" />
            )
          : (
            <span className=" i-mdi-weather-sunny" />
            )}
      </Button>
    </View>
  )
}
