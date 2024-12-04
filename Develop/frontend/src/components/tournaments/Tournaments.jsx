import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import TournamentsTable from "./TournamentsTable";
import { getAllTournaments, getTournamentsForOwners } from "../../util/api";
import { useUser } from "../auth/UserContext";
import { isToday } from "../../util/date";
import TournamentNav from "./TournamentNav";
import { isOwner } from "../../util/users";

export async function loader({ params }) {
  const { ownerId } = params;
  const data = new URLSearchParams();
  data.append("userId", ownerId);
  return await getTournamentsForOwners(data.toString());
}

export async function allLoader() {
  return await getAllTournaments();
}

export const VIEWS = {
  OPEN: "open",
  TODAY: "today",
  PLAYED: "played",
};

export default function Tournaments() {
  const { user } = useUser();
  const tournaments = useLoaderData();
  const openTournaments = [];
  const playedTournaments = [];
  const ongoingTournaments = [];
  tournaments?.forEach((tournament) => {
    if (!tournament.open) {
      playedTournaments.push(tournament);
      return;
    }

    if (isToday(tournament.date)) {
      ongoingTournaments.push(tournament);
      return;
    }

    openTournaments.push(tournament);
  });

  const [currentView, setCurrentView] = React.useState(VIEWS.OPEN);
  return (
    <section>
      {isOwner(user) && (
        <Link to="organize">
          <button>Organize a tournament</button>
        </Link>
      )}
      <TournamentNav
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      {currentView == VIEWS.OPEN && (
        <TournamentsTable tournaments={openTournaments} />
      )}
      {currentView == VIEWS.TODAY && (
        <TournamentsTable tournaments={ongoingTournaments} />
      )}{" "}
      {currentView == VIEWS.PLAYED && (
        <TournamentsTable tournaments={playedTournaments} />
      )}
    </section>
  );
}
