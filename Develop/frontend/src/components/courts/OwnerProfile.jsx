import React from "react";
import { useUser } from "../auth/UserContext";
import { Link, useLoaderData } from "react-router-dom";
import { USER_ROLES } from "../../util/constants";
import { getOwnerProfileData } from "../../util/api/courts";

export async function loader({ params }) {
  const { ownerId } = params;
  const data = new URLSearchParams();
  data.append("userId", ownerId);
  return await getOwnerProfileData(data.toString());
}

export default function OwnerProfile() {
  const user = useLoaderData();
  const liquidUser = useUser().user;

  return (
    <div className="flex flex-col items-center">
      <div>
        <div className="px-4 sm:px-0">
          <p className="mt-1 max-w-2xl text-3xl text-neutral-950">
            {liquidUser?.roleId == USER_ROLES.OWNER ? "Your data" : ""}
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Name</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {`${user?.firstName} ${user?.lastName}`}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">
                Phone number
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {user?.phoneNumber}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      {liquidUser?.roleId == USER_ROLES.OWNER && (
        <Link to="edit">
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Edit
          </button>
        </Link>
      )}
    </div>
  );
}
