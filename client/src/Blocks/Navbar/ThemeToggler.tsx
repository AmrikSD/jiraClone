import { useState } from 'react'
import { useEffect } from 'react'
import { ReactElement } from 'react'
import NavItem from './NavItem'

type ThemeTogglerProps = {
  Label: String
  Icon: ReactElement
  href: string
}
/**
 *
 * @param props Same as @see NavItem
 * @returns Compopnent designed to be used within a navigation bar that changes the theme of the website.
 */
export default function ThemeToggler(props: ThemeTogglerProps) {
  const availThemes = ['light', 'dark', 'lightest'] //
  const [theme, setTheme] = useState(0)

  useEffect(() => {
    document.body.classList.forEach((className) =>
      document.body.classList.remove(className)
    )
    document.body.classList.add(availThemes[theme])
  })

  const rotateThemes = () => {
    setTheme((theme + 1) % availThemes.length)
  }

  return <NavItem {...props} onClick={rotateThemes} />
}
