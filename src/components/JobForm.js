import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addJob, updateJob } from "../redux/reducers/jobReducer";
import { useToast } from "./ToastContext";  // Update this path based on your file structure

// Custom form components
const CustomTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;
  return (
    <div className="mb-4">
      <label
        className="block text-lg font-medium text-gray-700 dark:text-gray-100 mb-1"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <input
        className={`w-full text-black px-3 py-2 border ${
          hasError ? "border-red-500" : "border-gray-300"
        } rounded-md focus:outline-none focus:ring-indigo-500`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

const CustomSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;
  return (
    <div className="mb-4">
      <label
        className="block text-lg font-medium text-gray-700 dark:text-gray-100 mb-1"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <select
        className={`w-full text-black px-3 py-2 border ${hasError ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-indigo-500`}
        {...field}
        {...props}
      >
        {props.children}
      </select>
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

function JobForm({ isEditing }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { addToast } = useToast();
  const jobs = useSelector((state) => state.jobs.jobList);
  const job = jobs.find((job) => job.id === parseInt(id));

  const initialValues = job || {
    id: Date.now(),
    position: "",
    company: "",
    status: "Applied",
  };

  const validationSchema = Yup.object({
    position: Yup.string().required("Required"),
    company: Yup.string().required("Required"),
    status: Yup.string().required("Required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    try {
      if (isEditing) {
        dispatch(updateJob(values));
        addToast(`Successfully updated ${values.position} at ${values.company}`, 'success');
        resetForm();
        navigate("/dashboard");
      } else {
        dispatch(addJob(values));
        addToast(`Successfully added ${values.position} at ${values.company}`, 'success');
        resetForm();
      }
    } catch (error) {
      addToast(error.message || 'An error occurred', 'error');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {(formik) => (
        <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-lg bg-gray-100 dark:bg-gray-800">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            {isEditing ? "Edit Job" : "Add Job"}
          </h1>
          <Form>
            <CustomTextInput
              label="Position"
              name="position"
              id="position"
              type="text"
              placeholder="e.g., Software Engineer"
            />

            <CustomTextInput
              label="Company"
              name="company"
              id="company"
              type="text"
              placeholder="e.g., Amazon"
            />

            <CustomSelect label="Status" name="status" id="status">
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </CustomSelect>

            <div className="mt-4">
              <button
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-indigo-500 focus:ring-opacity-50"
                type="submit"
              >
                {isEditing ? "Update Job" : "Add Job"}
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default JobForm;