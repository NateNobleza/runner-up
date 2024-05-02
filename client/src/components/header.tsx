import{ Outlet, Link } from 'react-router-dom'

export function Header(){

  return(
    <>
    <header className='bg-stone-400 min-h-12 text-center text-xl fa-solid fa-person-running w-screen items-center pt-2'>Runner UP
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
