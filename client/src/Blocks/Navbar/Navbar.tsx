import { ReactComponent as LogoIcon } from '../../Icons/Logo.svg'
import { ReactComponent as CatIcon } from '../../Icons/Cat.svg'
import { ReactComponent as AlienIcon } from '../../Icons/Alien.svg'
import { ReactComponent as DeathstarIcon } from '../../Icons/Deathstar.svg'
import { ReactComponent as RocketIcon } from '../../Icons/Rocket.svg'
import { ReactComponent as SunIcon } from '../../Icons/Sun.svg'

import NavItem from './NavItem'
import LogoItem from './LogoItem'
import ThemeToggler from './ThemeToggler'

function Navbar() {
  return (
    <nav className='navbar'>
      <ul className='navbar-nav'>
        <LogoItem Icon={<LogoIcon />} Label='wowee!' href='/' />

        <NavItem Icon={<CatIcon />} Label='Login' href='/login' />

        <NavItem Icon={<AlienIcon />} Label='Register' href='/register' />

        <NavItem Icon={<DeathstarIcon />} Label='Space' href='/check' />

        <NavItem Icon={<RocketIcon />} Label='Shuttle' href='rocket' />

        <ThemeToggler Icon={<SunIcon />} Label='Toggler' href='#' />
      </ul>
    </nav>
  )
}

export { Navbar, NavItem }
