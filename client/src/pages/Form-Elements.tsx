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
    console.log(runId);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newEntry = Object.fromEntries(formData) as unknown as Entry;

    try {
      if (runId !== 'new') {
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
    <div className='flex flex-col items-center h-screen bg-gray-800 '>
      <div className='p-2 fa-solid fa-house flex justify-center'>
        <button
          className="bg-gray-800 text-white	p-2"
          onClick={() => navigate('/')}>
          Home
        </button>
      </div>
      <div className=" w-1/2 border-4 border-slate-500 rounded-md p-4 flex justify-center">
        <form onSubmit={handleSubmit}>
          <div className="flex-col justify-between">
            <div className="justify-between">
              <div>
                <label className="text-white" htmlFor="time">
                  Time (HH:MM):
                </label>
              </div>
              <div className='p-1'>
                <input
                  className="rounded-md"
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
            </div>

            <div>
              <div className='p-1'>
                <label className="text-white" htmlFor="distance">
                  Distance:
                </label>
              </div>
              <div>
                <input
                  className="rounded-md "
                  type="number"
                  id="distance"
                  name="distance"
                  value={formData.distance}
                  onChange={(e) =>
                    setFormData({ ...formData, distance: e.target.value })
                  }
                  placeholder="miles"
                />
              </div>
            </div>

            <div>
              <div className='p-1'>
                <label className="text-white" htmlFor="date">
                  Date:
                </label>
              </div>
              <div>
              <input
                className="rounded-md"
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
              <div className='p-1'>
              <label className="text-white" htmlFor="weather">
                Weather:
              </label>
              </div>
              <select
                className="rounded-md"
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
            <div className='p-3'>
            <button className=" p-1 text-white bg-gray-500 fa-solid fa-plus" type="submit">
              Submit
            </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
