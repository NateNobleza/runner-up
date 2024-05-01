import{ Outlet, Link } from 'react-router-dom'

export function Header(){

  return(
    <>
    <header className='bg-slate-500 min-h-19 text-center text-xl fa-solid fa-person-running w-screen'>Runner UP
      <div className='container'>
        <div>
            <Link to="/">
          </Link>
        </div>
      </div>
    </header>
    <Outlet/>
    </>
  )
}
