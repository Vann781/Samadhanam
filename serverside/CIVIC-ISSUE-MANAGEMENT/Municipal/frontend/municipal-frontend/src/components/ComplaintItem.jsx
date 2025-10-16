import React from 'react'

const ComplaintItem = () => {
  const complaint = {
    id: 'C-12345',
    type: 'Pothole',
    location: 'Main Street, Sector 5',
    status: 'In Progress',
    assignedTo: 'John Doe',
    reportedAt: '2025-09-15',
    description:
      'Significant pavement damage creating safety hazards for vehicles and pedestrians. Needs repair and follow-up verification after work is completed.',
    image:
      'https://sripath.com/wp-content/uploads/2025/01/iStock-174662203.jpg'
  }

  return (
    <article className="w-full max-w-full mx-auto">
      <div className="w-full mb-10">
        <img
          src="https://www.livehindustan.com/lh-img/smart/img/2025/05/10/1200x900/Ghaziabad_Municipal_Corporation__HT_1746349441299_1746867572414.jpg"
          style={{ width: '100%', height: '45vh', objectFit: 'cover' }}
          alt="Ghaziabad Municipal Corporation"
        />
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row p-5 gap-x-3">
        <figure className=" md:w-1/2 h-64 md:h-auto bg-slate-100 shadow-black shadow-lg rounded-4xl overflow-hidden">
          <img
            src={complaint.image}
            alt={`Photograph of complaint ${complaint.id}`}
            className="object-cover w-full h-full rounded-2xl"
          />
        </figure>

        <section className="md:w-1/2 p-6 flex flex-col justify-between border-l rounded-4xl shadow-black shadow-2xl">
          <header>
            <h2 className="text-2xl font-semibold text-slate-800">Complaint Details</h2>
            <p className="text-sm text-slate-500 mt-1">
              Report ID <span className="font-medium">{complaint.id}</span> • Reported{' '}
              <time dateTime={complaint.reportedAt}>{complaint.reportedAt}</time>
            </p>
          </header>

          <div className="mt-4 text-slate-700 space-y-2">
            <p>
              <span className="font-medium">Type:</span> {complaint.type}
            </p>
            <p>
              <span className="font-medium">Location:</span> {complaint.location}
            </p>
            <p>
              <span className="font-medium">Assigned to:</span> {complaint.assignedTo}
            </p>
            <p className="flex items-center">
              <span className="font-medium mr-2">Status:</span>
              <span
                className={
                  'inline-flex items-center px-2 py-1 text-xs rounded ' +
                  (complaint.status === 'In Progress'
                    ? 'bg-yellow-100 text-yellow-800'
                    : complaint.status === 'Resolved'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-slate-100 text-slate-800')
                }
              >
                {complaint.status}
              </span>
            </p>
          </div>

          <p className="mt-4 text-slate-600">{complaint.description}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              htmlFor="solvedMedia"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
            >
              Upload resolution evidence
            </button>
            

          
            <button
              type="button"
              className="px-4 py-2 border rounded-md text-blue-600 hover:bg-blue-50"
              aria-label="Contact assigned person"
            >
              Contact assignee
            </button>
          </div>
        </section>
      </div>
    </article>
  )
}

export default ComplaintItem
