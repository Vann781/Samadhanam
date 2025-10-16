import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'    
import axios from 'axios';

const Home = () => {
  const [array,setArray] = useState([]); 
  const [stateArray,setStateArray] = useState([]);
  const {id} = useParams();
  useEffect(() => {
     const fetchData = async () => {
        try {
           const { data } = await axios.post("http://localhost:4005" + "/State/allDistricts", {id});
           if(data.success && Array.isArray(data.districts)){
              console.log("this is the received data",data.state.complaints);
              setArray(data.districts);         // all districts 
              setStateArray(data.state);   // one state 

           }
           else{
              console.log(data.error);
           }
        } catch (error) {
           console.error("Error fetching data:", error);
        }
     };
     fetchData();
  }, []);

  return (
    <div>
      
        <div className='flex-col justify-center items-center gap-y-10 md:w-full md:h-1/2 flex md:flex-row md:gap-6 md:p-4 mt-10'>
          <div className='p-15 bg-green-400  md:bg-green-400 md:h-full md:w-1/4 md:p-15 md:flex md:flex-col md:justify-center md:items-center shadow-black shadow-lg rounded-4xl'>
            <h1 className='text-3xl'>Solved</h1>
            <h2 className='text-7xl mt-3'>{stateArray.solved}</h2>
          </div>
          <div className='p-15 bg-orange-400  md:bg-orange-400 md:h-full md:w-1/4 md:p-15 md:flex md:flex-col md:justify-center md:items-center shadow-black shadow-lg rounded-4xl'>
            <h1 className='text-3xl'>Pending</h1>
            <h2 className='text-7xl mt-3'>{stateArray.pending}</h2>
          </div>
          {/* <div className='p-15 bg-gray-500  md:bg-gray-500 md:h-full md:w-1/4 md:p-15 md:flex md:flex-col md:justify-center md:items-center shadow-black shadow-lg rounded-4xl'>
            <h1 className='text-3xl'>Escalated</h1>
            <h2 className='text-7xl mt-3'>{}</h2>
          </div> */}
          <div className='p-15 bg-red-400  md:bg-red-400 md:h-full md:w-1/4 md:p-15 md:flex md:flex-col md:justify-center md:items-center shadow-black shadow-lg rounded-4xl'>
            <h1 className='text-3xl'>Total Districts</h1>
            <h2 className='text-7xl mt-3'>{array.length}</h2>
          </div>
        </div>
  
        <div className='mt-5 grid sm:grid-col-1 md:grid-cols-5 gap-2 mb-5 p-2 shadow-2xl '>
          <input type='text' className='p-2 border rounded-full' placeholder='enter your complaint-ID'></input>
          
          
          <select
            name="speciality"
            id="speciality"
            className=" ml-4 border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-2xl"
          >
            <option value="">Pothhole</option>
            <option value="Garbage">Garbage</option>
            <option value="Street Light">Street Light</option>
            <option value="Drainage">Drainage</option>
            <option value="Pothholes">Pothholes</option>
            <option value="Graffitti">Graffitti</option>
            
          </select>
          <input type='date' className='p-2 border rounded-full  ml-4' placeholder='select by date'></input>
          <button className='bg-blue-600 pl-4 pr-4 pt-2 pb-2 text-white ml-4 rounded-3xl text-1xl'>Apply Filter</button>
          
        </div>

        {/* Cards grid: each complaint displayed as a professional card with media, fields in requested order and description */}
        <div className="mt-6 grid grid-cols-1 gap-6 p-3">
          {/* Card 1 */}
          <article className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row w-full justify-center">
            <div className="md:w-1/3 w-full h-40 md:h-auto">
              <img
                src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=60"
                alt="Garbage pile in neighbourhood"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex-1">
              <h3 className="text-lg font-semibold">CMP001</h3>
              <p className="text-sm text-gray-500 mb-2">Location: Sector 4, Model Town</p>
              <p className="text-sm text-gray-500 mb-2">District: Ghaziabad</p>
              <p className="text-sm text-gray-500 mb-2">Date: 2024-06-01</p>
              <div className="mb-3">
                <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Solved</span>
              </div>
              <p className="text-gray-700 text-sm mb-4">
                Description: Repeated accumulation of household garbage near the main market causing foul smell and attracting stray animals. Residents request scheduled pickup and immediate clearing.
              </p>
              <div className="flex items-center gap-3">
                <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm">Report Update</button>
              </div>
              <button className="p-2 mt-4 text-white bg-blue-400 border-blue-700 border-2 rounded-3xl">Click Photo/Video</button>
            </div>
          </article>

          {/* Card 2 */}
          <article className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row w-full">
            <div className="md:w-1/3 w-full h-40 md:h-auto">
              <img
                src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=60"
                alt="Pothole on city road"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex-1">
              <h3 className="text-lg font-semibold">CMP002</h3>
              <p className="text-sm text-gray-500 mb-2">Location: Near Bus Stand</p>
              <p className="text-sm text-gray-500 mb-2">District: Aligarh</p>
              <p className="text-sm text-gray-500 mb-2">Date: 2024-06-02</p>
              <div className="mb-3">
                <span className="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">Unsolved</span>
              </div>
              <p className="text-gray-700 text-sm mb-4">
                Description: Large pothole that expands during rains causing vehicle damage and traffic slowdown. Request for patching and resurfacing of the affected stretch.
              </p>
              <div className="flex items-center gap-3">
                <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm">Escalate</button>
              </div>
              <button className="p-2 mt-4 text-white bg-blue-400 border-blue-700 border-2 rounded-3xl">Click Photo/Video</button>
            </div>
          </article>

          {/* Card 3 (video) */}
          <article className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row w-full">
            <div className="md:w-1/3 w-full h-40 md:h-auto bg-black">
              <video
                src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
                controls
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex-1">
              <h3 className="text-lg font-semibold">CMP003</h3>
              <p className="text-sm text-gray-500 mb-2">Location: Old Bazar Street</p>
              <p className="text-sm text-gray-500 mb-2">District: Agra</p>
              <p className="text-sm text-gray-500 mb-2">Date: 2024-06-03</p>
              <div className="mb-3">
                <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">Escalated</span>
              </div>
              <p className="text-gray-700 text-sm mb-4">
                Description: Several street lights non-functional across the stretch; attached video shows dark sections at night. Escalation requested to electrical maintenance team.
              </p>
              <div className="flex items-center gap-3">
                <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm">Assign Team</button>
              </div>
              <button className="p-2 mt-4 text-white bg-blue-400 border-blue-700 border-2 rounded-3xl">Click Photo/Video</button>
            </div>
          </article>

          {/* Card 4 */}
          <article className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row w-full">
            <div className="md:w-1/3 w-full h-40 md:h-auto">
              <img
                src="https://images.unsplash.com/photo-1505765052050-3f5a7b6b9f64?auto=format&fit=crop&w=600&q=60"
                alt="Blocked drainage"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex-1">
              <h3 className="text-lg font-semibold">CMP004</h3>
              <p className="text-sm text-gray-500 mb-2">Location: Riverside Colony</p>
              <p className="text-sm text-gray-500 mb-2">District: Mathura</p>
              <p className="text-sm text-gray-500 mb-2">Date: 2024-06-04</p>
              <div className="mb-3">
                <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">Demerits</span>
              </div>
              <p className="text-gray-700 text-sm mb-4">
                Description: Drainage blocked with debris causing localized flooding during monsoon. Immediate clearance requested to prevent property damage.
              </p>
              <div className="flex items-center gap-3"></div>
                <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm">Log Action</button>
                
              </div>
            
          </article>

          {/* Card 5 */}
          <article className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row w-full">
            <div className="md:w-1/3 w-full h-40 md:h-auto">
              <img
                src="https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=600&q=60"
                alt="Damaged road surface"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex-1">
              <h3 className="text-lg font-semibold">CMP005</h3>
              <p className="text-sm text-gray-500 mb-2">Location: Near Railway Overbridge</p>
              <p className="text-sm text-gray-500 mb-2">District: Kanpur</p>
              <p className="text-sm text-gray-500 mb-2">Date: 2024-06-05</p>
              <div className="mb-3">
                <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Solved</span>
              </div>
              <p className="text-gray-700 text-sm mb-4">
                Description: Cracks and uneven surfacing repaired; monitoring requested to ensure repairs hold through heavy traffic.
              </p>
              <div className="flex items-center gap-3">
                <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm">Close</button>
              </div>
              <button className="p-2 mt-4 text-white bg-blue-400 border-blue-700 border-2 rounded-3xl">Click Photo/Video</button>
            </div>
          </article>
        </div>
      </div>
    
  )
}

export default Home

