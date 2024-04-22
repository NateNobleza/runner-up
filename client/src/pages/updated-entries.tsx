type ModalProps = {
  isOpen: boolean;
  updatedData: {
    time: string;
    distance: string;
    date: string;
    weather: string;
    userId: string;
  };
  onClose: () => void;
};

export function Modal({ isOpen, updatedData, onClose }: ModalProps) {
  return isOpen ? (
    <div className="modal">
      <div className="modal-content">
        <h2>Updated Entries</h2>
        <p>Time: {updatedData.time}</p>
        <p>Distance: {updatedData.distance}</p>
        <p>Date: {updatedData.date}</p>
        <p>Weather: {updatedData.weather}</p>
        <p>User ID: {updatedData.userId}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  ) : null;
}
