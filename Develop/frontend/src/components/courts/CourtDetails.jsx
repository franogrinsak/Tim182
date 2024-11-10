import React from "react";
import TabNavigation from "./TabNavigation";
import { Link, useParams } from "react-router-dom";
import { COURTS } from "../../util/test/courts";

export default function CourtDetail() {
  const { courtId } = useParams();
  const court = COURTS.find((court) => court.courtId == courtId);

  return (
    <div className="flex flex-col items-center">
      <div className="">
        <img
          alt={court.imageAlt}
          src={court.imageSrc}
          className=" object-contain rounded-2xl max-w-screen-sm max-h-80 "
        />
      </div>
      <div>
        <div className="px-4 sm:px-0">
          <p className="mt-1 max-w-2xl text-3xl text-neutral-950">
            {court.courtName}
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Owner</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {`${court.owner.firstName} ${court.owner.lastName}`}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Location</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {court.location}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Setting</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {court.isIndoor ? "Indoor" : "Outdoor"}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <Link>
        <button>Edit</button>
      </Link>
    </div>
  );
}
