import { createSlice } from "@reduxjs/toolkit";

const initialState = { jobList: [] };
const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    // To add a job to the job list
    addJob(state, action) {
      state.jobList.push(action.payload);
    },
    // To update a job in the job list
    updateJob(state, action) {
      const index = state.jobList.findIndex(
        (job) => job.id === action.payload.id
      );
      if (index !== -1) {
        state.jobList[index] = action.payload;
      }
    },
    // To delete a job from the job list
    deleteJob(state, action) {
      state.jobList = state.jobList.filter((job) => job.id !== action.payload);
    },
  },
});

export const { addJob, updateJob, deleteJob } = jobSlice.actions;
export default jobSlice.reducer;
