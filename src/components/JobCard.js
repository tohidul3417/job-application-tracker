import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteJob } from "../redux/reducers/jobReducer";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useToast } from "../contexts/ToastContext";

/**
 * JobCard component displays job details and provides edit and delete options
 * with confirmation popup and custom delete toast notification
 * 
 * @param {object} - The job object containing job details
 * @returns {JSX.Element} 
 */

function JobCard({job}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Shows the confirmation popup
  const promptDelete = () => {
    setShowConfirmation(true);
  };

  // Handles the actual job deletion
  const handleDelete = () => {
    dispatch(deleteJob(job.id));
    setShowConfirmation(false);
    
    // Use the custom delete toast type
    addToast(`Job removed: "${job.position}" at ${job.company}`, 'delete');
  };

  // Cancels the deletion
  const cancelDelete = () => {
    setShowConfirmation(false);
  };

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
             <Button className="bg-red-500 hover:bg-red-700" onClick={promptDelete}>Delete</Button>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-sm mx-auto">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete the job: <span className="font-semibold">{job.position}</span> at <span className="font-semibold">{job.company}</span>?
            </p>
            <div className="flex justify-end space-x-4">
              <Button 
                className="bg-gray-300 hover:bg-gray-400 text-gray-800" 
                onClick={cancelDelete}
              >
                Cancel
              </Button>
              <Button 
                className="bg-red-500 hover:bg-red-700" 
                onClick={handleDelete}
              >
                Yes, Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobCard;