import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { readEntries, removeEntry, type Entry } from '../data';

export function RunList() {
  const navigate = useNavigate();
  const [allEntries, setAllEntries] = useState<Entry[]>([]);
  // const [showEntries, setShowEntries] = useState(false);
  // const [hideForm, setHideForm] = useState(false); // New state variable

  useEffect(() => {
    // Fetch and populate all entries when the component mounts
    fetchAllEntries();
  }, []);

  async function fetchAllEntries() {
    try {
      const entries = await readEntries();
      console.log(entries)
      setAllEntries(entries);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  }

  const handleDelete = async (entryId: number) => {
    // setIsDeleting(true);
    try {
      await removeEntry(entryId);
      // After deleting an entry, refetch all entries to update the list
    } catch (error) {
      console.error('Error:', error);
    }
    fetchAllEntries()
  };

  const handleUpdate = (entryId: number) => {
    navigate(`/form-elements/${entryId}`);
  };

  // const handleLike = async (entryId: number) => {
  //   try {
  //     await likeEntry(entryId);
  //     navigate("/liked-entries");
  //   } catch (error) {
  //     console.error("Error liking entry:", error);
  //   }
  // };

  // const handleViewLikes = () => {
  //   navigate("/liked-entries");
  // };

  return (
    <div className=" h-screen bg-neutral-500 text-center flex flex-col items-center">
      <div className='pt-6'>
      <button
        className="text-white fa fa-home pt-2 p-2 bg-stone-600 rounded-md transform hover:bg-stone-700 hover:scale-105"
        onClick={() => navigate('/')}>
        {' '}
        Home
      </button>
      </div>
      <h2 className="text-white p-2 text-center text-2xl">All Entries</h2>
      {/* <button onClick={handleViewLikes}>View Liked Entries</button> */}
      <ul className="  text-white text-center space-y-2 text-xl">
        {allEntries.map((entry, index) => (
          <li className=" bg-stone-400 space-y-2 border-4 rounded-md  p-6 flex flex-col" key={index}>
            <div className='border-4 p-2'>
              <p className='p-2 '>Entry: #<span>{entry.runId}</span></p>
              <p className='p-2'>Time: <span>{entry.time}</span> min</p>
              <p className='p-2'>Distance:<span> {entry.distance}</span> Miles</p>
              <p className='p-2'>Current Weather:<span> {entry.weather}</span></p>
            </div>
            <button
              className="rounded-md bg-zinc-600 text-white border-2 border-green-500 transform hover:bg-zinc-500 hover:scale-105"
              type="button"
              onClick={() =>entry.runId && handleUpdate(entry.runId)}>
              Update
            </button>
            <button
              className="rounded-md bg-zinc-900 text-white border-2 border-red-500 transform hover:bg-zinc-700 hover:scale-105"
              type="button"
              onClick={() =>entry.runId && handleDelete(entry.runId)}>
              Delete
            </button>
            {/* <button type="button" onClick={() => handleLike(entry.runId)}>Like</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
}
