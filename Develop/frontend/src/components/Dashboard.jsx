import React from "react";
import { useUser } from "./auth/UserContext";
import { getFeatureCards } from "../util/constants";

export default function Dashboard() {
  const { user } = useUser();

  return (
    <>
      <section className="flex flex-wrap justify-center feature-cards-container">
        {user && getFeatureCards(user)}
      </section>
    </>
  );
}
