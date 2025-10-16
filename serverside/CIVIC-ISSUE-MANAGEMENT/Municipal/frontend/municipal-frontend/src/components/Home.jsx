// import axios from 'axios';
// import React, { useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { useEffect } from 'react';
// import { toast } from 'react-toastify';
// const Home = () => {
//   const {id} = useParams();
//   const [municipal,setMunicipal] = useState([]);
//   useEffect(() => {
//     const fetchMunicipality = async () => {
//       try {
//         const { data } = await axios.post("http://localhost:4040"+"/municipalities/fetchDistrict",{id});
//         console.log("Response:", data);

//         if (data.success) {
//           setMunicipal(data.district);
//         } else {
//           toast.error(data.message);
//         }
//       } catch (error) {
//         console.error("Error fetching municipality:", error);
//         toast.error("Unable to load municipal data");
//       } 
//     };

//     fetchMunicipality();
//   }, [id]);
//   return (
//     <div>
//       <div className="w-full">
//         <img
//           src="./assets/Logo.jpeg"
//           style={{ width: '100%', height: '45vh', objectFit: 'cover' }}
//           alt="Ghaziabad Municipal Corporation"
//         />
//       </div>
//       <div className='m-2 p-2'>
//         <nav className="bg-white shadow flex items-center justify-between px-8 py-4">
//           <div className="flex items-center gap-3">
//             <img
//               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjk_Nso7j1og-0E9l16Bie6dMfxGXGvgN-0A&s"
//               alt="Logo"
//               className="h-12 w-12 rounded-full border"
//             />
//             <span className="text-blue-700 text-xl font-semibold tracking-wide">
//               {municipal.district_name} Municipal Corporation
//             </span>
//           </div>
//           <div className="flex items-center gap-8">
//             <span className="text-gray-700 text-lg font-medium">
//               14:00:56
//             </span>
//             <div className="flex items-center gap-2">
//               <span className="text-gray-700 font-medium">{municipal.official_username}</span>
//             </div>
//           </div>
//         </nav>
//         <div className='flex-col justify-center items-center gap-y-10 md:w-full md:h-1/2 flex md:flex-row md:gap-6 md:p-4 mt-10'>
//           <div className='p-15 bg-green-400  md:bg-green-400 md:h-full md:w-1/4 md:p-15 md:flex md:flex-col md:justify-center md:items-center shadow-black shadow-lg rounded-4xl'>
//             <h1 className='text-3xl'>Solved</h1>
//             <h2 className='text-7xl mt-3'>{municipal.solved}</h2>
//           </div>
//           <div className='p-15 bg-orange-400  md:bg-orange-400 md:h-full md:w-1/4 md:p-15 md:flex md:flex-col md:justify-center md:items-center shadow-black shadow-lg rounded-4xl'>
//             <h1 className='text-3xl'>Pending</h1>
//             <h2 className='text-7xl mt-3'>{municipal.pending}</h2>
//           </div>
//           <div className='p-15 bg-gray-500  md:bg-gray-500 md:h-full md:w-1/4 md:p-15 md:flex md:flex-col md:justify-center md:items-center shadow-black shadow-lg rounded-4xl'>
//             <h1 className='text-3xl'>Escalated</h1>
//             <h2 className='text-7xl mt-3'>{municipal.demerits}</h2>
//           </div>
//           <div className='p-15 bg-red-400  md:bg-red-400 md:h-full md:w-1/4 md:p-15 md:flex md:flex-col md:justify-center md:items-center shadow-black shadow-lg rounded-4xl'>
//             <h1 className='text-3xl'>Demerits</h1>
//             <h2 className='text-7xl mt-3'>{municipal.demerits}</h2>
//           </div>
//         </div>

//         <div className='mt-5 flex-row justify-center mb-5 p-2 shadow-2xl'>
//           <input type='text' className='p-2 border rounded-full w-1/5' placeholder='enter your complaint-ID'></input>
//           <select
//             name="speciality"
//             id="speciality"
//             className="w-1/4 ml-4 border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-2xl"
//           >
//             <option value="">Pothhole</option>
//             <option value="ENT">Garbage</option>
//             <option value="Child Specialist">Street Light</option>
//             <option value="diabeties">Drainage</option>
//             <option value="Endocrinologist">Sewage</option>
//             <option value="Gastroenterologist">Roads</option>
//             <option value="Cardiologist">Traffic light</option>
//           </select>
//           <input type='date' className='p-2 border rounded-full w-1/5 ml-4' placeholder='select by date'></input>
//           <button className='bg-blue-600 pl-4 pr-4 pt-2 pb-2 text-white ml-4 rounded-3xl text-2xl'>Apply Filter</button>
//           <button className='bg-green-500 pl-4 pr-4 pt-2 pb-2 text-white ml-4 rounded-3xl text-2xl'>Show all complaints</button>
//         </div>
//         <div className="overflow-x-auto mt-6">
//           <table className="min-w-full border border-gray-300 rounded-lg shadow-lg">
//             <thead className="bg-blue-600 text-white">
//               <tr>
//                 <th className="px-6 py-3 text-left font-semibold">Complaint ID</th>
//                 <th className="px-6 py-3 text-left font-semibold">Category</th>
//                 <th className="px-6 py-3 text-left font-semibold">Date</th>
//                 <th className="px-6 py-3 text-left font-semibold">Status</th>
//                 <th className="px-6 py-3 text-left font-semibold">Assigned To</th>
//                 <th className="px-6 py-3 text-left font-semibold">Details</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {/* {municipal.complaints.map((complaint) => (
//                 <tr key={complaint.id}>
//                   <td className="px-6 py-4">{complaint.id}</td>
//                   <td className="px-6 py-4">{complaint.category}</td>
//                   <td className="px-6 py-4">{complaint.date}</td>
//                   <td className="px-6 py-4">
//                     <span className={`bg-${complaint.status === "Solved" ? "green" : "red"}-100 text-${complaint.status === "Solved" ? "green" : "red"}-800 px-2 py-1 rounded-full text-xs`}>
//                       {complaint.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">{complaint.assignedTo}</td>
//                   <td>
//                     <button className='bg-orange-500 p-3 text-white rounded-2xl'>View Details</button>
//                   </td>
//                 </tr>
//               ))} */}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Home;


// import axios from 'axios';
// import React, { useState, useEffect, useMemo } from 'react';
// import { useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';

// // === Helper Functions for Status and Formatting ===

// /**
//  * Checks if a complaint with status 'pending' is older than 7 days, qualifying it as 'escalated'.
//  * @param {string} raisedDate - The ISO date string of when the complaint was raised.
//  * @returns {boolean} True if the complaint is older than 7 days.
//  */
// const isEscalated = (raisedDate) => {
//     // 7 days in milliseconds
//     const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
//     const now = new Date();
//     const raised = new Date(raisedDate);
//     // Note: The Escalated count is only applied to pending complaints older than 7 days.
//     return (now.getTime() - raised.getTime()) > SEVEN_DAYS_MS;
// };

// /**
//  * Formats an ISO date string into a localized, human-readable date.
//  * @param {string} dateString 
//  * @returns {string} Formatted date or 'N/A'.
//  */
// const formatDate = (dateString) => {
//     try {
//         return new Date(dateString).toLocaleDateString('en-IN', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric'
//         });
//     } catch {
//         return 'N/A';
//     }
// };

// /**
//  * Provides Tailwind CSS classes for displaying complaint status badges.
//  * @param {string} status - The status of the complaint ('solved', 'pending', 'escalated').
//  * @returns {string} Tailwind background and text color classes.
//  */
// const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//         case 'solved':
//             return 'bg-green-100 text-green-800';
//         case 'pending':
//             return 'bg-orange-100 text-orange-800';
//         case 'escalated':
//             return 'bg-red-100 text-red-800';
//         default:
//             return 'bg-gray-100 text-gray-800';
//     }
// };

// const Home = () => {
//     const { id } = useParams();
//     // Initialize municipal as an object, not an array, as it holds a single district's data
//     const [municipal, setMunicipal] = useState({}); 
//     // State to hold the fetched list of complaints
//     const [complaints, setComplaints] = useState([]); 

//     // === 1. Fetch Municipality Data ===
//     useEffect(() => {
//         const fetchMunicipality = async () => {
//             try {
//                 const { data } = await axios.post("http://localhost:4040/municipalities/fetchDistrict", { id });
//                 // console.log("Response:", data); // Keep this for debugging if needed

//                 if (data.success) {
//                     setMunicipal(data.district || {});
//                 } else {
//                     toast.error(data.message);
//                 }
//             } catch (error) {
//                 console.error("Error fetching municipality:", error);
//                 toast.error("Unable to load municipal data");
//             }
//         };

//         if (id) {
//             fetchMunicipality();
//         }
//     }, [id]);

//     // === 2. Fetch Complaints based on Municipality District Name (e.g., "Gwalior") ===
//     useEffect(() => {
//         const fetchComplaints = async (municipalityName) => {
//             if (!municipalityName) return; 

//             try {
//                 // This calls the complaints API using the district name from the municipality data
//                 const { data } = await axios.post("http://localhost:4040/complaints/fetchByName", { municipalityName }); 

//                 if (data.success && Array.isArray(data.complaints)) {
//                     setComplaints(data.complaints);
//                 } else {
//                     setComplaints([]); 
//                 }
//             } catch (error) {
//                 console.error("Error fetching complaints:", error);
//                 toast.error("Unable to load complaints data");
//             }
//         };

//         // Trigger complaint fetch once the district_name is loaded
//         if (municipal.district_name) {
//             fetchComplaints(municipal.district_name);
//         }
//     }, [municipal.district_name]); 

//     // === 3. Real-time Calculation for Summary Cards (Fulfills the user's request) ===
//     const summaryStats = useMemo(() => {
//         let solvedCount = 0;
//         let pendingCount = 0;
//         let escalatedCount = 0;
//         // Demerits are typically a static score on the municipal record
//         const demeritsScore = municipal.demerits ?? 0;

//         // Loop through the fetched complaints to calculate real-time counts
//         complaints.forEach(complaint => {
//             const status = complaint.status ? complaint.status.toLowerCase() : '';
//             if (status === 'solved') {
//                 solvedCount++;
//             } else if (status === 'pending') {
//                 // This counts the total number of pending complaints
//                 pendingCount++; 
                
//                 // Check if this pending complaint is also escalated (older than 7 days)
//                 if (isEscalated(complaint.raisedDate)) {
//                     escalatedCount++;
//                 }
//             }
//         });

//         return {
//             solved: solvedCount,
//             pending: pendingCount, // This is the calculated count
//             escalated: escalatedCount,
//             demerits: demeritsScore, 
//         };
//     }, [complaints, municipal.demerits]); // Recalculates when the complaints list or demerits change
    
//     // Safety check for accessing municipal properties in JSX
//     const currentMunicipal = Object.keys(municipal).length > 0 ? municipal : {};


//     return (
//         <div className="min-h-screen bg-gray-50 font-sans">
//             <div className="w-full"> 
//                 <img 
//                     src="./assets/Logo.jpeg" 
//                     style={{ width: '100%', height: '45vh', objectFit: 'cover' }} 
//                     alt="Municipal Corporation" 
//                 /> 
//             </div> 
//             <div className='m-2 p-2'> 
//                 <nav className="bg-white shadow flex items-center justify-between px-8 py-4"> 
//                     <div className="flex items-center gap-3"> 
//                         <img 
//                             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjk_Nso7j1og-0E9l16Bie6dMfxGXGvgN-0A&s" 
//                             alt="Logo" 
//                             className="h-12 w-12 rounded-full border" 
//                         /> 
//                         <span className="text-blue-700 text-xl font-semibold tracking-wide"> 
//                             {currentMunicipal.district_name || 'Loading...'} Municipal Corporation 
//                         </span> 
//                     </div> 
//                     <div className="flex items-center gap-8"> 
//                         <span className="text-gray-700 text-lg font-medium"> 
//                             {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
//                         </span> 
//                         <div className="flex items-center gap-2"> 
//                             <span className="text-gray-700 font-medium">{currentMunicipal.official_username || 'Official'}</span> 
//                         </div> 
//                     </div> 
//                 </nav> 
                
//                 {/* Summary Cards - Now using the calculated summaryStats */}
//                 <div className='flex-col justify-center items-center gap-y-10 md:w-full md:h-1/2 flex md:flex-row md:gap-6 md:p-4 mt-10'> 
//                     <div className='p-15 bg-green-400 md:h-full md:w-1/4 md:p-15 md:flex md:flex-col md:justify-center md:items-center shadow-black shadow-lg rounded-xl'> 
//                         <h1 className='text-3xl text-white'>Solved</h1> 
//                         <h2 className='text-7xl mt-3 text-white'>{summaryStats.solved}</h2> 
//                     </div> 
//                     <div className='p-15 bg-orange-400 md:h-full md:w-1/4 md:p-15 md:flex md:flex-col md:justify-center md:items-center shadow-black shadow-lg rounded-xl'> 
//                         <h1 className='text-3xl text-white'>Pending</h1> 
//                         <h2 className='text-7xl mt-3 text-white'>{summaryStats.pending}</h2> 
//                     </div> 
//                     <div className='p-15 bg-gray-700 md:h-full md:w-1/4 md:p-15 md:flex md:flex-col md:justify-center md:items-center shadow-black shadow-lg rounded-xl'> 
//                         <h1 className='text-3xl text-white'>Escalated</h1> 
//                         <h2 className='text-7xl mt-3 text-white'>{summaryStats.escalated}</h2> 
//                     </div> 
//                     <div className='p-15 bg-red-500 md:h-full md:w-1/4 md:p-15 md:flex md:flex-col md:justify-center md:items-center shadow-black shadow-lg rounded-xl'> 
//                         <h1 className='text-3xl text-white'>Demerits</h1> 
//                         <h2 className='text-7xl mt-3 text-white'>{summaryStats.demerits}</h2> 
//                     </div> 
//                 </div> 

//                 {/* Filter Bar */}
//                 <div className='mt-5 flex flex-wrap justify-center gap-4 mb-5 p-4 shadow-2xl bg-white rounded-lg'> 
//                     <input type='text' className='p-2 border rounded-full w-full sm:w-1/5 min-w-[150px]' placeholder='enter your complaint-ID'></input> 
//                     <select 
//                         name="speciality" 
//                         id="speciality" 
//                         className="w-full sm:w-1/4 border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-2xl" 
//                     > 
//                         <option value="">Filter by Type...</option> 
//                         <option value="Pothhole">Pothhole</option> 
//                         <option value="Garbage">Garbage</option> 
//                         <option value="Street Light">Street Light</option> 
//                         <option value="Drainage">Drainage</option> 
//                         <option value="Sewage">Sewage</option> 
//                         <option value="Roads">Roads</option> 
//                         <option value="Traffic light">Traffic light</option> 
//                     </select> 
//                     <input type='date' className='p-2 border rounded-full w-full sm:w-1/5 min-w-[150px]' placeholder='select by date'></input> 
//                     <button className='bg-blue-600 px-6 py-2 text-white rounded-3xl text-lg hover:bg-blue-700 transition'>Apply Filter</button> 
//                     <button className='bg-green-500 px-6 py-2 text-white rounded-3xl text-lg hover:bg-green-600 transition'>Show all complaints</button> 
//                 </div> 
                
//                 {/* Complaints Table - Now correctly mapped to the complaints state */}
//                 <div className="overflow-x-auto mt-6"> 
//                     <table className="min-w-full border border-gray-300 rounded-lg shadow-lg"> 
//                         <thead className="bg-blue-600 text-white"> 
//                             <tr> 
//                                 <th className="px-6 py-3 text-left font-semibold">Complaint ID</th> 
//                                 <th className="px-6 py-3 text-left font-semibold">Category</th> 
//                                 <th className="px-6 py-3 text-left font-semibold">Date</th> 
//                                 <th className="px-6 py-3 text-left font-semibold">Status</th> 
//                                 <th className="px-6 py-3 text-left font-semibold">Assigned To</th> 
//                                 <th className="px-6 py-3 text-left font-semibold">Details</th> 
//                             </tr> 
//                         </thead> 
//                         <tbody className="bg-white divide-y divide-gray-200"> 
//                             {complaints.length > 0 ? (
//                                 complaints.map((complaint) => {
//                                     // Determine the display status for the badge
//                                     const displayStatus = (complaint.status.toLowerCase() === 'pending' && isEscalated(complaint.raisedDate)) 
//                                         ? 'escalated' 
//                                         : complaint.status;

//                                     const statusClass = getStatusColor(displayStatus);

//                                     return (
//                                         <tr key={complaint._id || complaint.id || Math.random()}> 
//                                             <td className="px-6 py-4">{complaint._id || complaint.id || 'N/A'}</td> 
//                                             <td className="px-6 py-4">{complaint.type || complaint.category || 'N/A'}</td> 
//                                             <td className="px-6 py-4">{formatDate(complaint.raisedDate || complaint.date)}</td> 
//                                             <td className="px-6 py-4"> 
//                                                 <span className={`${statusClass} px-3 py-1 rounded-full text-xs font-semibold`}> 
//                                                     {displayStatus} 
//                                                 </span> 
//                                             </td> 
//                                             <td className="px-6 py-4">{complaint.assignedTo || 'N/A'}</td> 
//                                             <td> 
//                                                 <button className='bg-orange-500 p-3 text-white rounded-2xl hover:bg-orange-600 transition'>View Details</button> 
//                                             </td> 
//                                         </tr> 
//                                     );
//                                 })
//                             ) : (
//                                 <tr>
//                                     <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
//                                         No complaints found for {currentMunicipal.district_name || 'the municipality'}.
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody> 
//                     </table> 
//                 </div> 
//             </div> 
//         </div> 
//     ) 
// } 

// export default Home;

import axios from 'axios';
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast } from 'react-toastify';

// === Helper Components and Functions ===
const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
);

// [Keep all your existing helper functions here: isEscalated, formatDate, getStatusColor]
// ... (Your helper functions are assumed to be present here)

const isEscalated = (raisedDate) => {
    const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
    const now = new Date();
    const raised = new Date(raisedDate);
    return (now.getTime() - raised.getTime()) > SEVEN_DAYS_MS;
};

const formatDate = (dateString) => {
    try {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch {
        return 'N/A';
    }
};

const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
        case 'solved':
            return 'bg-green-100 text-green-800';
        case 'pending':
            return 'bg-orange-100 text-orange-800';
        case 'escalated':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};
// === End of Helper Components and Functions ===


const Home = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Initialize useNavigate
    const [municipal, setMunicipal] = useState({}); 
    const [complaints, setComplaints] = useState([]); 
    const [isLoading, setIsLoading] = useState(true); // Added loading state

    const token = localStorage.getItem("Admin login token");

    // === 1. Fetch Municipality Data ===
    useEffect(() => {
        const fetchMunicipality = async () => {
            if (!token) {
                toast.error("Authentication required. Redirecting to login.");
                navigate('/'); // Redirect to login if no token
                return;
            }
            
            setIsLoading(true);

            try {
                // FIX: Include the Authorization header with the token
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const { data } = await axios.post("http://localhost:4040"+"/municipalities/fetchDistrict", { id }, config);

                if (data.success === true) {
                    console.log(data.district);
                    setMunicipal(data.district);
                } else {
                    toast.error(data.message || "Failed to load municipal data.");
                }
            } catch (error) {
                console.error("Error fetching municipality:", error);
                if (error.response && error.response.status === 401) {
                     // Token expired or invalid
                    toast.error("Session expired. Please log in again.");
                    localStorage.removeItem("Admin login token");
                    navigate('/');
                } else {
                    toast.error("Unable to load municipal data. Server or network issue.");
                }
            } finally {
                // Note: We won't set isLoading to false until complaints are also fetched
            }
        };

        if (id) {
            fetchMunicipality();
        } else {
            setIsLoading(false);
        }
    }, [id, navigate, token]); // Depend on 'token' to run if it changes

    // === 2. Fetch Complaints based on Municipality District Name ===
    useEffect(() => {
        const fetchComplaints = async (municipalityName) => {
            if (!municipalityName || !token) {
                setIsLoading(false); // Stop loading if criteria not met
                return; 
            } 
            
            try {
                // FIX: Include the Authorization header with the token
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                // This calls the complaints API using the district name
                const { data } = await axios.post(
                    "http://localhost:4040/municipalities/fetchByName", 
                    { municipalityName }, 
                    config // Pass the config object with the token
                ); 

                if (data.success===true && Array.isArray(data.complaints)) {
                    setComplaints(data.complaints);
                } else {
                    setComplaints([]); 
                    toast.info(data.message || "No complaints found.");
                }
            } catch (error) {
                console.error("Error fetching complaints:", error);
                toast.error("Unable to load complaints data.");
            } finally {
                setIsLoading(false); // Done loading all data
            }
        };

        // Trigger complaint fetch once the district_name is loaded
        if (municipal.district_name) {
            fetchComplaints(municipal.district_name);
        }
    }, [municipal.district_name, token]); // Depend on district_name and token

    // === 3. Real-time Calculation for Summary Cards (Your logic is sound here) ===
    const summaryStats = useMemo(() => {
        let solvedCount = 0;
        let pendingCount = 0;
        let escalatedCount = 0;
        const demeritsScore = municipal.demerits ?? 0;

        complaints.forEach(complaint => {
            const status = complaint.status ? complaint.status.toLowerCase() : '';
            if (status === 'solved') {
                solvedCount++;
            } else if (status === 'pending') {
                pendingCount++; 
                
                // Assuming 'raisedDate' is available for the escalation check
                if (isEscalated(complaint.raisedDate)) { 
                    escalatedCount++;
                }
            }
        });

        return {
            solved: solvedCount,
            pending: pendingCount, 
            escalated: escalatedCount,
            demerits: demeritsScore, 
        };
    }, [complaints, municipal.demerits]); 
    
    // Handle Navigation to ComplaintItem
    const handleViewDetails = (complaintId) => {
        // Navigate to the correct route with the specific ID
        navigate(`/Complaints/${complaintId}`); 
    };

    // --- Loading and Error State Handling ---
    if (isLoading) {
        return <LoadingSpinner />;
    }

    const currentMunicipal = Object.keys(municipal).length > 0 ? municipal : {};
    if (!currentMunicipal.district_name) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <h1 className='text-2xl text-red-600'>Municipal data not loaded. Please log in again.</h1>
            </div>
        );
    }
    // --- End State Handling ---


    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* ... (Rest of your JSX structure) ... */}
            <div className="w-full"> 
                <img 
                    // Consider making this dynamic based on municipal data if available
                    src={"https://cdn.educba.com/academy/wp-content/uploads/2024/03/Civic-Engagement-.jpg"} 
                    style={{ width: '100%', height: '45vh', objectFit: 'cover' }} 
                    alt="Municipal Corporation" 
                /> 
            </div> 
            <div className='m-2 p-2'> 
                <nav className="bg-white shadow flex items-center justify-between px-8 py-4"> 
                    {/* ... (Navigation Bar Content) ... */}
                     <div className="flex items-center gap-3"> 
                         <img 
                             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjk_Nso7j1og-0E9l16Bie6dMfxGXGvgN-0A&s" 
                             alt="Logo" 
                             className="h-12 w-12 rounded-full border" 
                         /> 
                         <span className="text-blue-700 text-xl font-semibold tracking-wide"> 
                             {currentMunicipal.district_name || 'Loading...'} Municipal Corporation 
                         </span> 
                     </div> 
                     <div className="flex items-center gap-8"> 
                         <span className="text-gray-700 text-lg font-medium"> 
                             {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                         </span> 
                         <div className="flex items-center gap-2"> 
                             <span className="text-gray-700 font-medium">{currentMunicipal.official_username || 'Official'}</span> 
                         </div> 
                     </div> 
                </nav> 
                
                {/* Summary Cards - Using summaryStats */}
                <div className='flex-col justify-center items-center gap-y-10 md:w-full md:h-1/2 flex md:flex-row md:gap-6 md:p-4 mt-10'> 
                    {/* ... (Summary Card JSX using summaryStats.solved, .pending, .escalated, .demerits) ... */}
                    <div className='p-15 bg-green-400 md:h-full md:w-1/4 md:p-15 md:flex md:flex-col md:justify-center md:items-center shadow-black shadow-lg rounded-xl'> 
                         <h1 className='text-3xl text-white'>Solved</h1> 
                         <h2 className='text-7xl mt-3 text-white'>{municipal.solved}</h2> 
                    </div> 
                    <div className='p-15 bg-orange-400 md:h-full md:w-1/4 md:p-15 md:flex md:flex-col md:justify-center md:items-center shadow-black shadow-lg rounded-xl'> 
                         <h1 className='text-3xl text-white'>Pending</h1> 
                         <h2 className='text-7xl mt-3 text-white'>{municipal.pending}</h2> 
                    </div> 
                    <div className='p-15 bg-gray-700 md:h-full md:w-1/4 md:p-15 md:flex md:flex-col md:justify-center md:items-center shadow-black shadow-lg rounded-xl'> 
                         <h1 className='text-3xl text-white'>Escalated</h1> 
                         <h2 className='text-7xl mt-3 text-white'>{summaryStats.escalated}</h2> 
                    </div> 
                    <div className='p-15 bg-red-500 md:h-full md:w-1/4 md:p-15 md:flex md:flex-col md:justify-center md:items-center shadow-black shadow-lg rounded-xl'> 
                         <h1 className='text-3xl text-white'>Demerits</h1> 
                         <h2 className='text-7xl mt-3 text-white'>{summaryStats.demerits}</h2> 
                    </div> 
                </div> 

                {/* Filter Bar - No changes needed */}
                <div className='mt-5 flex flex-wrap justify-center gap-4 mb-5 p-4 shadow-2xl bg-white rounded-lg'> 
                    <input type='text' className='p-2 border rounded-full w-full sm:w-1/5 min-w-[150px]' placeholder='enter your complaint-ID'></input> 
                    
                    <input type='date' className='p-2 border rounded-full w-full sm:w-1/5 min-w-[150px]' placeholder='select by date'></input> 
                    <button className='bg-blue-600 px-6 py-2 text-white rounded-3xl text-lg hover:bg-blue-700 transition'>Apply Filter</button> 
                    <button className='bg-green-500 px-6 py-2 text-white rounded-3xl text-lg hover:bg-green-600 transition'>Show all complaints</button> 
                </div> 
                
                {/* Complaints Table */}
                <div className="overflow-x-auto mt-6"> 
                    <table className="min-w-full border border-gray-300 rounded-lg shadow-lg"> 
                        <thead className="bg-blue-600 text-white"> 
                            <tr> 
                                <th className="px-6 py-3 text-left font-semibold">Complaint ID</th> 
                                <th className="px-6 py-3 text-left font-semibold">Category</th> 
                                <th className="px-6 py-3 text-left font-semibold">Date</th> 
                                <th className="px-6 py-3 text-left font-semibold">Status</th> 
                                <th className="px-6 py-3 text-left font-semibold">Assigned To</th> 
                                <th className="px-6 py-3 text-left font-semibold">Details</th> 
                            </tr> 
                        </thead> 
                        <tbody className="bg-white divide-y divide-gray-200"> 
                            {complaints.length > 0 ? (
                                complaints.map((complaint) => {
                                    const displayStatus = (complaint.status?.toLowerCase() === 'pending' && isEscalated(complaint.raisedDate)) 
                                        ? 'escalated' 
                                        : complaint.status;

                                    const statusClass = getStatusColor(displayStatus || 'N/A');

                                    return (
                                        <tr key={complaint._id || complaint.id || Math.random()}> 
                                            <td className="px-6 py-4">{complaint._id || complaint.id || 'N/A'}</td> 
                                            <td className="px-6 py-4">{complaint.type || complaint.category || 'N/A'}</td> 
                                            <td className="px-6 py-4">{formatDate(complaint.raisedDate || complaint.date)}</td> 
                                            <td className="px-6 py-4"> 
                                                <span className={`${statusClass} px-3 py-1 rounded-full text-xs font-semibold`}> 
                                                    {displayStatus} 
                                                </span> 
                                            </td> 
                                            <td className="px-6 py-4">{complaint.assignedTo || 'N/A'}</td> 
                                            <td> 
                                                <button 
                                                    className='bg-orange-500 p-3 text-white rounded-2xl hover:bg-orange-600 transition'
                                                    onClick={() => handleViewDetails(complaint._id || complaint.id)} // Use ID for navigation
                                                >
                                                    View Details
                                                </button> 
                                            </td> 
                                        </tr> 
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                        No complaints found for {currentMunicipal.district_name || 'the municipality'}.
                                    </td>
                                </tr>
                            )}
                        </tbody> 
                    </table> 
                </div> 
            </div> 
        </div> 
    ) 
} 

export default Home;