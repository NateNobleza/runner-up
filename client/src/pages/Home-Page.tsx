import { Link } from 'react-router-dom';
// import {Link} from 'react-router-dom'
export function HomePage() {


  return (
    <div>
      <div>
        <Link to='/form-elements/new'>Entry Form</Link>
      </div>
      <div>
        <Link to='/runs-list'>Runs</Link>
      </div>
      <div>
        <Link to='/liked-entries'>Liked Entries</Link>
      </div>
    </div>
  );
}
