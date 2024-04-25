import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { readEntries, readEntry, updateEntry, removeEntry, type Entry } from "../data";


export function RunList(){
  const navigate = useNavigate();
 const [allEntries, setAllEntries] = useState<Entry[]>([]);
  const [showEntries, setShowEntries] = useState(false);
  const [hideForm, setHideForm] = useState(false); // New state variable

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
      // setIsDeleting(false);
    }
  };


const handleUpdate =  (entryId: number) => {
  navigate(`/form-elements/${entryId}`)


};

return(
  <div>
    <h2>All Entries</h2>
    <ul>
      {allEntries.map((entry, index) => (
        <li key={index}>
          {entry.runId} - {entry.time} - {entry.distance} - {entry.date} -{' '}
          {entry.weather}{' '}
          <button type='button'
            onClick={() => entry.runId && handleDelete(entry.runId)}>
            Delete
          </button>
            <button type='button' onClick={() =>handleUpdate(entry.runId)}>Update</button>
        </li>
      ))}
    </ul>
  </div>
)
}
