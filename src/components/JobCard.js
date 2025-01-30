import React from "react";
import { useDispatch } from "react-redux";
import { deleteJob } from "../redux/reducers/jobReducer";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

/**
 * JobCard component displays job details and provides edit and delete options
 * 
 * @param {object} - The job object containing job details
 * @returns {JSX.Element} 
 */

function JobCard({job}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handles a job card deletion
  const handleDelete = () => dispatch(deleteJob(job.id));

  // Handles job edit
  const handleEdit = () => navigate(`/edit-job/${job.id}`);

  return (
    <div className="">
      <div className="bg-white dark:bg-gray-800 dark:text-gray-100 shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h5 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{job.position}</h5>
          <p className="text-gray-600 dark:text-gray-300">{job.company}</p>
          <p className="text-gray-500 dark:text-gray-400"><small>{job.status}</small></p>
          <div className="flex justify-between mt-4">
             <Button onClick={handleEdit}>Edit</Button>
             <Button className="bg-red-500 hover:bg-red-700" onClick={handleDelete}>Delete</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobCard;