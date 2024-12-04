import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import TournamentsTable from "./TournamentsTable";
import { getTournamentsForOwners } from "../../util/api";

export async function loader({ params }) {
  const { ownerId } = params;
  const data = new URLSearchParams();
  data.append("userId", ownerId);
  return await getTournamentsForOwners(data.toString());
}

export default function Tournaments() {
  const tournaments = useLoaderData();
  return (
    <section>
      <Link to="organize">
        <button>Organize a tournament</button>
      </Link>
      <TournamentsTable tournaments={tournaments} />
    </section>
  );
}
