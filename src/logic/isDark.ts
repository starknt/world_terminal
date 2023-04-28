export const isDark = useDark({
  selector: 'body',
  attribute: 'color-scheme',
  valueDark: 'dark',
  valueLight: 'light',
})

const _toggleTheme = useToggle(isDark)

export const toggleTheme = () => {
  _toggleTheme()

  if (isDark.value)
    document.documentElement.classList.add('dark')
  else
    document.documentElement.classList.remove('dark')
}
