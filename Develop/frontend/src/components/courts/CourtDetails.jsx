import React from "react";
import { Link, Navigate, useLoaderData, useParams } from "react-router-dom";
import { COURTS } from "../../util/test/courts";
import { tempCorts } from "../../util/paths";
import ReturnButton from "../ReturnButton";
import { getCourtDetails } from "../../util/api";

export async function loader({ params }) {
  const { courtId } = params;
  const data = new URLSearchParams();
  data.append("courtId", courtId);
  return await getCourtDetails(data.toString());
}

export default function CourtDetail() {
  const { ownerId } = useParams();
  const data = useLoaderData();

  console.log(data);

  const court = data;

  // User tries to find a non existent court
  if (!court) {
    return <Navigate to="not-found" replace />;
  }

  return (
    <div className="flex flex-col items-center">
      <ReturnButton link={"/app/courts/" + ownerId} text="Return to courts" />
      <div className="">
        <img
          alt={court?.imageAlt}
          src={court?.image}
          className=" object-contain rounded-2xl max-w-screen-sm max-h-80 "
        />
      </div>
      <div>
        <div className="px-4 sm:px-0">
          <p className="mt-1 max-w-2xl text-3xl text-neutral-950">
            {court?.courtName}
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Owner</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {`${court?.owner?.firstName} ${court?.owner?.lastName}`}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Location</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {court?.location}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Setting</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {court?.isIndoor ? "Indoor" : "Outdoor"}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <Link to="edit/court">
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Edit
        </button>
      </Link>
    </div>
  );
}
