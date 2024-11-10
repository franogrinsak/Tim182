import React from "react";
import { NavLink } from "react-router-dom";

export default function TabNavigation() {
  return (
    <nav aria-label="Tabs" className="flex justify-center">
      <div className="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
        <NavLink className="remove-link-style inline-flex items-center h-10 px-2 py-2 -mb-px text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:px-4 -px-1 dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400">
          <span className="mx-1 text-sm sm:text-base">Courts</span>
        </NavLink>
        <NavLink className="remove-link-style inline-flex items-center h-10 px-2 py-2 -mb-px text-center text-blue-600 bg-transparent border-b-2 border-blue-500 sm:px-4 -px-1 dark:border-blue-400 dark:text-blue-300 whitespace-nowrap focus:outline-none">
          <span className="mx-1 text-sm sm:text-base">Profile</span>
        </NavLink>
      </div>
    </nav>
  );
}
