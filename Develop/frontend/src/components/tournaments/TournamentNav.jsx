import React from "react";
import { VIEWS } from "./Tournaments";

const ACTIVE_STYLE =
  "court-nav-text remove-link-style inline-flex items-center h-10 px-2 py-2 -mb-px text-center text-blue-600 bg-transparent border-b-2 border-green-500 sm:px-4 -px-1 dark:border-green-400 dark:text-green-300 whitespace-nowrap focus:outline-none";
const INACTIVE_STYLE =
  "remove-link-style inline-flex items-center h-10 px-2 py-2 -mb-px text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:px-4 -px-1 dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400";

export default function TournamentNav(props) {
  const { currentView, setCurrentView } = props;

  return (
    <nav aria-label="Tabs" className="flex justify-center">
      <div className="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
        <button
          className={currentView === VIEWS.OPEN ? ACTIVE_STYLE : INACTIVE_STYLE}
          onClick={() => setCurrentView(VIEWS.OPEN)}
        >
          <span className="mx-1 text-sm sm:text-base">Open</span>
        </button>
        <button
          className={
            currentView === VIEWS.TODAY ? ACTIVE_STYLE : INACTIVE_STYLE
          }
          onClick={() => setCurrentView(VIEWS.TODAY)}
        >
          <span className="mx-1 text-sm sm:text-base">Today</span>
        </button>
        <button
          className={
            currentView === VIEWS.PLAYED ? ACTIVE_STYLE : INACTIVE_STYLE
          }
          onClick={() => setCurrentView(VIEWS.PLAYED)}
        >
          <span className="mx-1 text-sm sm:text-base">Played</span>
        </button>
      </div>
    </nav>
  );
}
