import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import JobCard from "./JobCard";
import { deleteJob } from "../redux/reducers/jobReducer";
import { useDispatch } from "react-redux";

// Mock the useNavigate hook from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// Mock the useDispatch hook from react-redux
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

/**
 * Test suite for JobCard component
 */
describe("JobCard Component", () => {
  const mockNavigate = jest.fn();
  const mockDispatch = jest.fn();
  const job = {
    id: 1,
    position: "Full Stack Engineer",
    company: "IBM",
    status: "Offer",
  };

  // Set up mock navigate and mock dispatch function before each test
  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    useDispatch.mockReturnValue(mockDispatch);
  });

  it("renders job details correctly", () => {
    render(
      <MemoryRouter>
        <JobCard job={job} />
      </MemoryRouter>
    );

    // Assert: Verify that job details are rendered correctly
    expect(screen.getByText(/full stack engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/ibm/i)).toBeInTheDocument();
    expect(screen.getByText(/offer/i)).toBeInTheDocument();
  });

  it("handles edit button click and navigates to the edit form", async () => {
    render(
      <MemoryRouter>
        <JobCard job={job} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /edit/i }));

    expect(mockNavigate).toHaveBeenLastCalledWith("/edit-job/1");
  });

  it("handles delete button click", async () => {
    render(
      <MemoryRouter> 
        <JobCard
          job={job} />
      </MemoryRouter>
  );

    fireEvent.click(screen.getByRole("button", { name: /delete/i }));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(deleteJob(job.id));
    });
  });
});
