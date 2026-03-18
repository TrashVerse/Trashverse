import Link from "next/link";

export default function JobCard({ job, onApply }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition border-l-4 border-green-600">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-10">{job.title}</h2>
        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full">
            {job.type}
          </span>
          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
            {job.location}
          </span>
          <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full">
            {job.experience}
          </span>
        </div>
      </div>

      <p className="text-gray-700 mb-4">{job.description}</p>

      <div className="mb-5">
        <h3 className="font-semibold text-gray-800 mb-2">Requirements:</h3>
        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
          {job.requirements.map((req, idx) => (
            <li key={idx}>{req}</li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => onApply(job)}
        className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold py-2 rounded-lg hover:from-green-700 hover:to-green-600 transition"
      >
        Apply Now
      </button>
    </div>
  );
}
