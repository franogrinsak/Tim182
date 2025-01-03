import React from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../auth/UserContext";
import { USER_ROLES } from "../../util/constants";

const ACTIVE_STYLE =
  "court-nav-text remove-link-style inline-flex items-center h-10 px-2 py-2 -mb-px text-center text-blue-600 bg-transparent border-b-2 border-green-500 sm:px-4 -px-1 dark:border-green-400 dark:text-green-300 whitespace-nowrap focus:outline-none";
const INACTIVE_STYLE =
  "remove-link-style inline-flex items-center h-10 px-2 py-2 -mb-px text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:px-4 -px-1 dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400";

export default function TabNavigation() {
  const { user } = useUser();

  return (
    <nav aria-label="Tabs" className="flex justify-center">
      <div className="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
        <NavLink
          to="."
          end
          className={({ isActive }) =>
            isActive ? ACTIVE_STYLE : INACTIVE_STYLE
          }
        >
          <span className="mx-1 text-sm sm:text-base">Courts</span>
        </NavLink>
        <NavLink
          to="profile"
          className={({ isActive }) =>
            isActive ? ACTIVE_STYLE : INACTIVE_STYLE
          }
        >
          <span className="mx-1 text-sm sm:text-base">Profile</span>
        </NavLink>
        {user?.roleId === USER_ROLES.OWNER && (
          <NavLink
            to="add"
            className={({ isActive }) =>
              isActive ? ACTIVE_STYLE : INACTIVE_STYLE
            }
          >
            <span className="mx-1 text-sm sm:text-base">Add</span>
          </NavLink>
        )}
      </div>
    </nav>
  );
}
