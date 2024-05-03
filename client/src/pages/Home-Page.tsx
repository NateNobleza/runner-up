import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div className="bg-gradient-to-tr from-stone-400 to-stone-600 h-screen bg-neutral-500 text-center">
      <img src='https://images.unsplash.com/photo-1502224562085-639556652f33?q=80&w=1128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      className='w-full h-screen object-cover absolute mix-blend-overlay'/>
      <div className="flex justify-center place-items-center justify-evenly pt-48">
        <button className="text-stone-200 bg-stone-600 rounded-md p-2 w-48 h-12 fa-solid fa-plus transform hover:bg-stone-700 hover:scale-125">
          {' '}
          <Link to="/form-elements/new">Add Entry</Link>{' '}
        </button>

        <button className="text-stone-200 bg-stone-600 rounded-md p-2 w-48 h-12 fa-solid fa-eye transform hover:bg-stone-700 hover:scale-125">
          {' '}
          <Link to="/runs-list"> Runs</Link>
        </button>

        {/* <div className='button'>
          <Link to='/liked-entries'>Liked Entries</Link>
        </div> */}
      </div>
    </div>
  );
}
