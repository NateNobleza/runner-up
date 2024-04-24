import { useState, useEffect, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import {
  Entry,
  addEntry,
  readEntry,
  removeEntry,
  updateEntry,
  readEntries,
} from '../data';

export function ElementForm() {
  const { runId } = useParams();
  // const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState<Entry>({
    time: '',
    distance: '',
    date: '',
    weather: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [allEntries, setAllEntries] = useState<Entry[]>([]);
  const [showEntries, setShowEntries] = useState(false);
  const [hideForm, setHideForm] = useState(false); // New state variable

  useEffect(() => {
    if (runId) {
      setIsLoading(true);
      readEntry(parseInt(runId, 10))
        .then((data) => {
          setIsLoading(false);
          if (data) {
            setFormData(data);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.error('Error:', error);
        });
    }
  }, [runId]);

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    console.log(runId)
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newEntry = Object.fromEntries(formData) as unknown as Entry;

    try {
      if (runId) {
        updateEntry({ ...newEntry, runId: parseInt(runId, 10) });
      } else {
        addEntry(newEntry)
          .then((newEntry) => {
            console.log('New entry added:', newEntry);
            // After adding a new entry, refetch all entries to update the list
            fetchAllEntries();
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    } catch (error) {
      console.error('Error:', error);
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

  const handleReadEntries = async () => {
    try {
      const entries = await readEntries();
      setAllEntries(entries);
      setShowEntries(true);
      setHideForm(true); // Hide form elements when reading all entries
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleUpdate = async (entryId: number) => {

  }



  return (
    <form onSubmit={handleSubmit}>
      {!hideForm && (
        <>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div>
                <label htmlFor="time">Time (HH:MM):</label>
                <input
                  type="text"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  placeholder="HH:MM"
                />
              </div>

              <div>
                <label htmlFor="distance">Distance:</label>
                <input
                  type="number"
                  id="distance"
                  name="distance"
                  value={formData.distance}
                  onChange={(e) =>
                    setFormData({ ...formData, distance: e.target.value })
                  }
                />
              </div>

              <div>
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>

              <div>
                <label htmlFor="weather">Weather:</label>
                <select
                  id="weather"
                  name="weather"
                  value={formData.weather}
                  onChange={(e) =>
                    setFormData({ ...formData, weather: e.target.value })
                  }>
                  <option value="sunny">Sunny</option>
                  <option value="cloudy">Cloudy</option>
                  <option value="rainy">Rainy</option>
                  <option value="windy">Windy</option>
                </select>
              </div>

              <button type="submit">Submit</button>
            </>
          )}
        </>
      )}

      <div>
        <button type='button' onClick={handleReadEntries}>Read All Entries</button>
      </div>

      {showEntries && (
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
                <button type='button' onClick={() => entry.runId && handleUpdate(entry.runId)}>
                  Update
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}
