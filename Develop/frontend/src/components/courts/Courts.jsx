import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import NewCourtCard from "./NewCourtCard";
import { useUser } from "../auth/UserContext";
import { USER_ROLES } from "../../util/constants";
import { getCourtsForOwners, getOwnerProfileData } from "../../util/api/courts";

export async function loader({ params }) {
  const { ownerId } = params;
  const data = new URLSearchParams();
  data.append("userId", ownerId);
  const ownerData = await getOwnerProfileData(data.toString());
  const courts = await getCourtsForOwners(data.toString());

  if (ownerData instanceof Response) return ownerData;
  if (courts instanceof Response) return courts;

  return { ownerData: ownerData, courts: courts };
}

export default function Courts() {
  const { user } = useUser();
  let { courts, ownerData } = useLoaderData();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        {user?.roleId == USER_ROLES.PLAYER
          ? "Courts owned by " + `${ownerData.firstName} ${ownerData.lastName}`
          : "Your courts"}
      </h2>
      <div className="min-h-72 min-w-72 mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {user?.roleId == USER_ROLES.OWNER && <NewCourtCard />}
        {courts.map((court) => (
          <div key={court.courtId} className="group relative zoom-animation">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img
                alt={court.imageAlt}
                src={court.imageSrc || court.image}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-left text-gray-700">
                  <Link to={"" + court.courtId}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {court.courtName}
                  </Link>
                </h3>
                <p className="text-left mt-1 text-sm text-gray-500">
                  {court.location}
                </p>
              </div>
              <p className="text-sm font-medium text-gray-900">
                {court.isIndoor ? "Indoor" : "Outdoor"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
