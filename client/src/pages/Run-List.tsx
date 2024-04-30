import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { readEntries, removeEntry, type Entry } from "../data";

export function RunList(){
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
      fetchAllEntries();

    } catch (error) {
      console.error('Error:', error);
    } finally {
      navigate('/')
      // setIsDeleting(false);
    }
  };


const handleUpdate =  (entryId: number) => {
  navigate(`/form-elements/${entryId}`)
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


return(
  <div className=" h-screen bg-gray-800 text-center flex flex-col items-center">
    <button className ='border-white text-white fa fa-home' onClick={()=> navigate('/')}> Home</button>
    <h2 className ='text-white p-2 text-center'>All Entries</h2>
    {/* <button onClick={handleViewLikes}>View Liked Entries</button> */}
    <ul className ='w-1/2 text-white text-center bg-slate-500 '>
      {allEntries.map((entry, index) => (
        <li className ='border-2 rounded-md' key={index}>
          {entry.runId} - {entry.time} - {entry.distance} - {entry.date} -{' '}
          {entry.weather}{' '}
              <button className ='text-white border-white flex flex-row' type='button'
              onClick={() => entry.runId && handleDelete(entry.runId)}>
              Delete
              </button>
                <button className ='text-white border-white flex flex-row' type='button'
                  onClick={() =>handleUpdate(entry.runId)}>
                  Update
                </button>
             {/* <button type="button" onClick={() => handleLike(entry.runId)}>Like</button> */}
        </li>
      ))}
    </ul>
  </div>
)
}
