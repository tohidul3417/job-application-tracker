import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./reducers/jobReducer";
import { loadState, saveState } from "../utils/localStorage";


const persistedState = loadState();

/**
 * Configure the redux store with jobReducer.
 *
 * @returns {Object} The configured Redux store.
 */

const store = configureStore({
  reducer: {
    jobs: jobReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState({
    jobs: store.getState().jobs,
  })
})

export default store;
