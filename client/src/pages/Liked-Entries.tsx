import { useNavigate } from 'react-router-dom';

export function LikedEntries() {
  const navigate = useNavigate();


  return (
    <div>
      <button onClick={() => navigate('/')}>Home</button>
      <h2>Liked Entries</h2>
    </div>
  );
}
