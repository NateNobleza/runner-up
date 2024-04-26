import { Link } from 'react-router-dom';
import './Home-Page.css'
export function HomePage() {


  return (
    <div>
      <div className='button'>
        <Link to='/form-elements/new'>Entry Form</Link>
      </div>
      <div className='button'>
        <Link to='/runs-list'>Runs</Link>
      </div>
      <div className='button'>
        <Link to='/liked-entries'>Liked Entries</Link>
      </div>
    </div>
  );
}
