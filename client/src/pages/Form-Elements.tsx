import { useState, useEffect, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Entry, addEntry, updateEntry, readEntry } from '../data';

export function ElementForm() {
  const { runId } = useParams();
  const navigate = useNavigate();
  // const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState<Entry>({
    time: '',
    distance: '',
    date: '',
    weather: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const isEditing = runId && runId != 'new';

  useEffect(() => {
    async function load(id: number) {
      setIsLoading(true);
      try {
        const entry = await readEntry(id);
        if (!entry) throw new Error(`Entry with ID ${id} not found`);
        setFormData(entry);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (isEditing) load(+runId);
  }, [runId]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newEntry = Object.fromEntries(formData) as unknown as Entry;

    try {
      if (runId !== 'new' && runId !== undefined) {
        updateEntry({ ...newEntry, runId: parseInt(runId, 10) });
        navigate('/runs-list');
      } else {
        addEntry(newEntry)
          .then((newEntry) => {
            console.log('New entry added:', newEntry);
            navigate('/runs-list');
            // After adding a new entry, refetch all entries to update the list
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    } catch (error) {
      navigate('/runs-list');
      console.error('Error:', error);
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        Error Loading Entry with ID {runId}:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center h-screen bg-neutral-500'>
      <div className='p-6 flex justify-center'>
        <button
          className="rounded-md bg-stone-700 text-white	p-2 transform hover:bg-stone-800 hover:scale-105 fa-solid fa-house"
          onClick={() => navigate('/')}>
          Home
        </button>
      </div>
      <div className=" w-96 border-4 rounded-md p-4 flex justify-center bg-stone-500">
        <form onSubmit={handleSubmit}>
          <div className="flex-col justify-between">
            <div className="justify-between">
              <div className='p-1 mb-2'>
                <label className="text-white" htmlFor="time">
                  Time:
                </label>
              </div>
              <div className='p-1 mb-4'>
                <input
                  className="rounded-md p-2 w-48"
                  type="text"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  placeholder="Input Minutes "
                />
              </div>
            </div>

            <div>
              <div className='p-1 mb-2'>
                <label className="text-white" htmlFor="distance">
                  Distance:
                </label>
              </div>
              <div>
                <input
                  className="rounded-md p-2 w-48 mb-4"
                  type="number"
                  id="distance"
                  name="distance"
                  value={formData.distance}
                  onChange={(e) =>
                    setFormData({ ...formData, distance: e.target.value })
                  }
                  placeholder="Miles"
                />
              </div>
            </div>

            <div>
              <div className='p-1 mb-2'>
                <label className="text-white" htmlFor="date">
                  Date:
                </label>
              </div>
              <div>
              <input
                className="rounded-md p-2 w-48 mb-4"
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
              </div>
            </div>

            <div>
              <div className='p-1 mb-2'>
              <label className="text-white" htmlFor="weather">
                Weather:
              </label>
              </div>
              <select
                className="rounded-md p-2 w-48 mb-4"
                id="weather"
                name="weather"
                value={formData.weather}
                onChange={(e) =>
                setFormData({ ...formData, weather: e.target.value })
                }>
                <option>Select Weather</option>
                <option value="Sunny">Sunny</option>
                <option value="Cloudy">Cloudy</option>
                <option value="Rainy">Rainy</option>
                <option value="Windy">Windy</option>
              </select>
            </div>
            <div className='p-3'>
            <button className="rounded-md p-2 text-white bg-stone-700 fa-solid fa-plus transform hover:bg-stone-800 hover:scale-105" type="submit">
              Submit
            </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
