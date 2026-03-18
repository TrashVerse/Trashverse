"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";

const jobOpenings = [
  {
    id: 1,
    title: "Waste Management Specialist",
    type: "Full-time",
    location: "Remote",
    experience: "2-4 years",
    description:
      "We're looking for an experienced Waste Management Specialist to optimize our waste collection and recycling processes. You'll work with stakeholders to develop sustainable waste management solutions.",
    requirements: [
      "Bachelor's degree in Environmental Science or related field",
      "2-4 years of experience in waste management",
      "Strong knowledge of recycling and sustainability practices",
      "Excellent communication and project management skills",
      "Experience with waste management software systems",
    ],
  },
  {
    id: 2,
    title: "Junior Full Stack Developer",
    type: "Full-time",
    location: "On-site",
    experience: "0-2 years",
    description:
      "Join our development team to build and maintain the TrashVerse platform. You'll work on both frontend and backend technologies to create an intuitive waste management solution.",
    requirements: [
      "Proficiency in React, Next.js, and Node.js",
      "Understanding of RESTful APIs and databases",
      "Strong problem-solving and debugging skills",
      "Enthusiasm for learning and growth",
      "Experience with Git version control",
    ],
  },
  {
    id: 3,
    title: "Sustainability Consultant",
    type: "Contract",
    location: "Hybrid",
    experience: "3-5 years",
    description:
      "Provide strategic sustainability consulting to organizations implementing TrashVerse. Guide clients in reducing their environmental footprint through better waste management practices.",
    requirements: [
      "Bachelor's degree in Sustainability, Business, or Environmental Science",
      "3-5 years of consulting or sustainability experience",
      "Strong analytical and communication skills",
      "Experience with ESG reporting",
      "Client-facing presentation experience",
    ],
  },
  {
    id: 4,
    title: "Community Outreach Manager",
    type: "Full-time",
    location: "On-site",
    experience: "1-3 years",
    description:
      "Engage and educate communities about waste management and recycling. Build relationships with local organizations and schools to promote sustainable practices.",
    requirements: [
      "Experience in community engagement or public relations",
      "Excellent interpersonal and presentation skills",
      "Knowledge of sustainability and environmental issues",
      "Event planning and coordination experience",
      "Social media marketing proficiency",
    ],
  },
];

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resume: "",
    coverLetter: "",
  });

  const handleApply = (job) => {
    setSelectedJob(job);
    setFormData({ fullName: "", email: "", phone: "", resume: "", coverLetter: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Application submitted for ${selectedJob.title}!\n\nWe'll review your application and get back to you soon.`);
    setSelectedJob(null);
  };

  return (
    <div className="pt-24">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-green-500 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
          <p className="text-lg">
            Help us build a more sustainable future with innovative waste management solutions.
          </p>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Available Positions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {jobOpenings.map((job) => (
              <JobCard key={job.id} job={job} onApply={handleApply} />
            ))}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black w-full h-full bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Apply for {selectedJob.title}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your full name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Resume/CV Link *
                </label>
                <input
                  type="url"
                  name="resume"
                  value={formData.resume}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="https://link-to-your-resume.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Cover Letter
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Tell us why you're interested in this role..."
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Submit Application
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="flex-1 bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
