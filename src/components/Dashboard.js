import React from "react";
import JobCard from "./JobCard";
import { useSelector } from "react-redux";

/**
 * Dashboard component to display the list of job applications
 *
 * @returns {JSX.Element} The Dashboard component
 */

function Dashboard() {
  const jobs = useSelector((state) => state.jobs.jobList);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Dashboard</h1>
      <div className="flex flex-wrap md:-mx-4 justify-center lg:justify-start">
        {jobs.map((job) => (
          <div className="w-96 sm:w-64 md:w-64 lg:w-72 xl:w-72 mx-1 my-3 xl:mx-2 2xl:mx-3 xl:my-4" key={job.id}>
            <JobCard job={job} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
