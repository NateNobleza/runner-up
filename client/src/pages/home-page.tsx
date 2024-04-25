import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
// import {Link} from 'react-router-dom'
export function HomePage() {
  const [showForm, setShowForm] = useState(false);
  const [showLikedEntries, setShowLikedEntries] = useState(false);

  const navigate = useNavigate()
  const handleAddEntryClick = () => {
    navigate('/form-elements')
    // setShowForm(true);
    // setShowLikedEntries(false); // Hide LikedEntries component when Add Entry button is clicked
  };

  const handleLikesButtonClick = () => {
    setShowLikedEntries(true);
    setShowForm(false); // Hide ElementForm component when Likes button is clicked
  };

  const handleHomeButtonClick = () => {
    setShowForm(false);
    setShowLikedEntries(false);
  };

  return (
    <div>
      {!showForm && !showLikedEntries && (
        <button onClick={handleAddEntryClick}>Add Entry</button>
      )}
      {!showForm && !showLikedEntries && (
        <button onClick={handleLikesButtonClick}>Likes</button>
      )}
      {(showForm || showLikedEntries) && (
        <button onClick={handleHomeButtonClick}>Home</button>
      )}

      {/* {showForm && <ElementForm formData={formData} setFormData={setFormData} />}
      {showLikedEntries && <LikedEntries />} */}
    </div>
  );
}
