import React from 'react'

const All_district = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      
      <div className="mt-6 grid sm:grid-cols-1 md:grid-cols-3  items-center mb-6">
        <div className="">
          <label htmlFor="district" className="sr-only">Select District</label>
          <select
            id="district"
            name="district"
            className="w-full border border-gray-300 bg-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            aria-label="Select District"
            defaultValue=""
          >
            <option value="">Select District</option>
            <option value="Ghaziabad">Ghaziabad</option>
            <option value="Aligarh">Aligarh</option>
            <option value="Noida">Noida</option>
            <option value="Kanpur">Kanpur</option>
            <option value="Lucknow">Lucknow</option>
            <option value="Gorakhpur">Gorakhpur</option>
          </select>
        </div>

        <div className="flex md:justify-center">
          <button
            type="button"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            aria-label="Apply district filter"
          >
            Apply Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 w-full">
        <article className="bg-white border border-gray-500 rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row w-full">
          <div className="md:w-1/3 w-full h-48 md:h-auto">
            <img
              src="https://www.livehindustan.com/lh-img/smart/img/2025/05/10/1200x900/Ghaziabad_Municipal_Corporation__HT_1746349441299_1746867572414.jpg"
              alt="Municipal area in Ghaziabad"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 flex-1">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Ghaziabad — District ID: GZB34221</h3>
            <p className="text-sm text-gray-500 mb-4">
              Managed by: <span className="font-medium text-gray-700">GZBPraveenSharma</span>
            </p>

            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-gray-500">Solved issues</dt>
                <dd className="mt-1 text-lg font-semibold text-green-600">46</dd>
              </div>

              <div>
                <dt className="text-gray-500">Demerits</dt>
                <dd className="mt-1 text-lg font-semibold text-red-600">4</dd>
              </div>

              <div className="col-span-2">
                <dt className="text-gray-500">Credentials</dt>
                <dd className="mt-1 text-sm text-gray-700">
                  Username: <span className="font-medium">GZBPraveenSharma</span>
                  <span className="mx-2 text-gray-400">•</span>
                  Password: <span className="font-mono bg-gray-100 px-2 py-1 rounded">Hashed@12345</span>
                </dd>
              </div>
            </dl>
          </div>
        </article>
      </div>
    </div>
  )
}


export default All_district



// // //     style={{
    // //       width: '100%',
    // //       height: '65vh',
    // //       backgroundImage:
    // //         "linear-gradient(rgba(6,21,37,0.45), rgba(6,21,37,0.45)), url('https://images.unsplash.com/photo-1508873699372-7ae0453c03c7?auto=format&fit=crop&w=1950&q=80')",
    // //       backgroundSize: 'cover',
    // //       backgroundPosition: 'center',
    // //       display: 'flex',
    // //       alignItems: 'center',
    // //       justifyContent: 'center',
    // //     }}
    // //     aria-label="State government header"
    // //   >
    // //     <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 700 }}>
    // //       Uttar Pradesh State Government
    // //     </h1>
    // //   </div>

    // //   <nav className="bg-white shadow flex items-center justify-between px-8 py-4">
    // //     <div className="flex items-center gap-3">
    // //       <img
    // //         src="https://w7.pngwing.com/pngs/560/130/png-transparent-government-of-india-government-of-uttar-pradesh-uttar-pradesh-police-uttar-pradesh-subordinate-services-selection-commission-others-thumbnail.png"
    // //         alt="Logo"
    // //         className="h-12 w-12 rounded-full border"
    // //       />
    // //       <span className="text-blue-700 text-xl font-semibold tracking-wide">
    // //         Uttar Pradesh State government
    // //       </span>
    // //     </div>
    // //     <div className="flex flex-col gap-3 md:flex-row md:gap-8">
    // //       <div className="text-1xl hover:text-2xl">
    // //         <a href="/complaints">Complaints</a>
    // //       </div>
    // //       <div className="text-1xl hover:text-2xl">
    // //         <a href="/district">District</a>
    // //       </div>
    // //     </div>
    // //     <div className="flex items-center gap-8">
    // //       <span className="text-gray-700 text-lg font-medium">14:00:56</span>
    // //       <div className="flex items-center gap-2">
    // //         <span className="text-gray-700 font-medium">John Doe</span>
    // //       </div>
    // //     </div>
    // //   </nav>
