// import { useEffect, useState } from "react";
// import DashboardLayout from "../../components/DashboardLayout";
// import { BASE_URL } from "../../utils/api"; // Make sure utils/api.js exists

// export default function History() {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchHistory() {
//       try {
//         const res = await fetch(`${BASE_URL}/api/history`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             // add auth token here if required by backend
//             // "Authorization": `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) {
//           throw new Error("Failed to fetch history");
//         }

//         const data = await res.json();
//         setHistory(data); // assumes backend returns array of history objects
//       } catch (err) {
//         console.error(err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchHistory();
//   }, []);

//   return (
//     <DashboardLayout>
//       <div className="bg-white p-6 rounded-2xl shadow">
//         <h2 className="text-xl font-bold mb-4">Pickup History</h2>

//         {loading && <p>Loading...</p>}
//         {error && <p className="text-red-500">Error: {error}</p>}

//         {!loading && !error && (
//           <table className="w-full text-left">
//             <thead>
//               <tr className="text-gray-500 text-sm border-b">
//                 <th className="py-2">Date</th>
//                 <th>Type</th>
//                 <th>Kg</th>
//                 <th>Amount</th>
//                 <th>Status</th>
//               </tr>
//             </thead>

//             <tbody>
//               {history.map((item, i) => (
//                 <tr key={i} className="border-b">
//                   <td className="py-2">{item.date}</td>
//                   <td>{item.type}</td>
//                   <td>{item.kg}</td>
//                   <td>₦{item.amount}</td>
//                   <td>
//                     <span
//                       className={
//                         item.status === "Completed"
//                           ? "text-green-600"
//                           : "text-yellow-500"
//                       }
//                     >
//                       {item.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </DashboardLayout>
//   );
// }