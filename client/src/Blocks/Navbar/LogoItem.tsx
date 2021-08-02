import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

type LogoItemProps = {
  Label: String
  Icon: ReactElement
  href: string
}
export default function LogoItem(props: LogoItemProps) {
  return (
    <li className='logo unselectable'>
      <Link to={props.href} className='nav-link'>
        {props.Icon}
        <span className='link-text logo-text'>{props.Label}</span>
      </Link>
    </li>
  )
}
