import { useState } from 'react';

export function ElementForm() {
  const [time, setTime] = useState('');
  const [distance, setDistance] = useState('');
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [userId, setUserId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/runs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          time,
          distance,
          date,
          weather,
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Clear form fields after successful submission
      setTime('');
      setDistance('');
      setDate('');
      setWeather('');
      setUserId('');

      console.log('Form submitted successfully!'); // Log success message
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="time">Time (HH:MM):</label>
        <input
          type="text"
          id="time"
          name="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="HH:MM"
        />
      </div>

      <div>
        <label htmlFor="distance">Distance:</label>
        <input
          type="number"
          id="distance"
          name="distance"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="weather">Weather:</label>
        <select
          id="weather"
          name="weather"
          value={weather}
          onChange={(e) => setWeather(e.target.value)}
        >
          <option value="sunny">Sunny</option>
          <option value="cloudy">Cloudy</option>
          <option value="rainy">Rainy</option>
          <option value="windy">Windy</option>
        </select>
      </div>

      <div>
        <label htmlFor="userId">User ID:</label>
        <input
          type="text"
          id="userId"
          name="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
