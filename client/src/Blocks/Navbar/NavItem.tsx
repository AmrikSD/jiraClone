import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

type NavItemProps = {
  Label: String
  Icon: ReactElement
  href: string
  onClick?: () => void
}
/**
 *
 * @param props @see NavItemProps
 * @returns A component that's designed to be used within @see Navbar
 */
export default function NavItem(props: NavItemProps) {
  return (
    <li className='nav-item unselectable' onClick={props.onClick}>
      <Link to={props.href} className='nav-link'>
        {props.Icon}
        <span className='link-text'>{props.Label}</span>
      </Link>
    </li>
  )
}
