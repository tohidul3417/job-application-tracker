import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import JobForm from "./JobForm";
import { addJob } from "../redux/reducers/jobReducer";

// Create a mock Redux store for testing purposes
const mockStore = configureStore([]);

/**
 * Test suite for JobForm component
 */
describe("JobForm Component", () => {
  let store;

  // Initialize the mock store with an initial state before each test
  beforeEach(() => {
    store = mockStore({
      jobs: {
        jobList: [],
      },
    });
  });

  /**
   * Test to verify that all the form inputs are rendered
   */
  it("renders form inputs correctly", () => {
    // Render the JobForm component with the mock store and routing context 
    render(
      <Provider store={store}>
        <MemoryRouter>
          <JobForm isEditing={false} />
        </MemoryRouter>
      </Provider>
    );

    // Check if the position input is rendered
    expect(screen.getByLabelText(/position/i)).toBeInTheDocument();
    // Check if the company input field is rendered
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    // Check if status input field in rendered
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
  });

  /**
   * Test to verify that form submission dispatches the correct action
   */
  it("handles form submission", async () => {
    // Render the JobForm component with the mock store and routing context
    render(
      <Provider store={store}>
        <MemoryRouter>
          <JobForm isEditing={false} />
        </MemoryRouter>
      </Provider>
    );

    // Simulate user input in the position input field
    fireEvent.change(screen.getByLabelText(/position/i), {
      target: { value: "Back End Engineer" },
    });
    // Simulate user input in the compnay input field
    fireEvent.change(screen.getByLabelText(/company/i), {
      target: { value: "Amazon" },
    });
    // Simulate user input in the status input field
    fireEvent.change(screen.getByLabelText(/status/i), {
      target: { value: "Interview" },
    });

    // Simulate form submission by clicking the "Add Job" button
    fireEvent.click(screen.getByRole("button", { name: /add job/i }));

    // Wait for the action to be dispatched after clikcing the "Add Job" button and varify its payload
    await waitFor(() => {
      const actions = store.getActions();
      expect(actions).toContainEqual(
        addJob({
          id: expect.any(Number),
          position: "Back End Engineer",
          company: "Amazon",
          status: "Interview",
        })
      );
    });
  });
});
