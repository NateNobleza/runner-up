// import { useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';

// export function LikedEntries() {
//   const navigate = useNavigate();
//   const [likedEntries, setLikedEntries] = useState<Entry[]>([])

//    useEffect(() => {
//     fetchLikedEntries();
//   }, []);

//   async function fetchLikedEntries() {
//     try {
//       const entries = await getLikedEntries();
//       setLikedEntries(entries);
//     } catch (error) {
//       console.error("Error fetching liked entries:", error);
//     }
//   }

//   return (
//     <div>
//       <button onClick={() => navigate('/')}>Home</button>
//       <h2>Liked Entries</h2>
//        <ul>
//         {likedEntries.map((entry, index) => (
//           <li key={index}>
//             {entry.runId} - {entry.time} - {entry.distance} - {entry.date} -{" "}
//             {entry.weather}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
