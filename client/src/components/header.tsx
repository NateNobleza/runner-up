import{ Outlet, Link } from 'react-router-dom'

export function Header(){

  return(
    <>
    <header className='bg-slate-500 min-h-18 text-center text-xl'>Runner UP
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
