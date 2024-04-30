import { Link } from 'react-router-dom';

export function HomePage() {


  return (
    <div className='h-screen bg-gray-800 text-center'>
      <div className='flex justify-center'>
        <div className='p-4'>
          <div className='border rounded-md text-slate-400 p-2 max-w-24 fa-solid fa-plus'>
            <Link to='/form-elements/new'>Add Entry</Link>
          </div>
        </div>
        <div className='p-4'>
          <div className='border rounded-md  text-slate-400 p-2 max-w-24 fa-solid fa-eye'>
            <Link to='/runs-list'> Runs</Link>
          </div>
        </div>
        {/* <div className='button'>
          <Link to='/liked-entries'>Liked Entries</Link>
        </div> */}
      </div>
    </div>
  );
}
