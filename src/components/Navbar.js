import React, { useState } from "react";
import { Link } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-gray-800 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link className="text-white font-bold text-xl" to="/">
              Job Application Tracker
            </Link>
          </div>
          <div className="flex">
            <div className="hidden md:block">
              <div className="ml-10 space-x-4 flex items-center">
                <Link
                  className="text-gray-300 dark:text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-700 hover:text-white dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
                <Link
                  className="text-gray-300 dark:text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-700 hover:text-white dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  to="/add-job"
                >
                  Add Job
                </Link>
                <ThemeSwitcher />
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                className="bg-gray-800 dark:bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-300 hover:text-white darK:hover:text-white hover:bg-gray-700 dark:hover:bg-gray-800 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open Main Menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="false"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              className="text-gray-300 dark:text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-700 hover:text-white dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              to="/dashboard"
            >
              Dashboard
            </Link>
            <Link
              className="text-gray-300 dark:text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-700 hover:text-white dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              to="/add-job"
            >
              Add Job
            </Link>
            <ThemeSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
