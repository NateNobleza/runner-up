import React, { useState } from 'react';

type ElementFormProps = {
  // Any additional props you might want to pass
}

export function ElementForm({}: ElementFormProps) {
  const [formData, setFormData] = useState({
    time: '',
    distance: '',
    date: '',
    weather: '',
    userId: '',
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/runs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Clear form fields after successful submission
      setFormData({
        time: '',
        distance: '',
        date: '',
        weather: '',
        userId: '',
      });

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
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
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
          onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="weather">Weather:</label>
        <select
          id="weather"
          name="weather"
          value={formData.weather}
          onChange={(e) => setFormData({ ...formData, weather: e.target.value })}
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
          value={formData.userId}
          onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
