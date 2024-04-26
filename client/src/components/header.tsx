import{ Outlet, Link } from 'react-router-dom'

export function Header(){

  return(
    <div>
      <nav>
        <Link to="/">
        </Link>
      </nav>
      <Outlet/>
    </div>
  )
}
