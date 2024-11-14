import React from "react";
import { useUser } from "./auth/UserContext";
import {
  DEV_MODE,
  FEATURE_CARDS_BY_ROLES,
  getFeatureCards,
} from "../util/constants";
import { PLAYER_COURTS, PLAYER_TOURNAMENT } from "./FeatureCard";

export default function Dashboard() {
  const { user } = useUser();

  /*
  const [variable, setVariable] = React.useState(true);
   const [output, setOutput] = React.useState("");


  const change = () => {
    setVariable((old) => !old);
  };

  const getEmail = async () => {
    const response = await fetch(resolveBackendPath("/"), {
      method: "GET",
      credentials: "include",
    });

    const home = await response.text();
    setOutput(home);
  };

  React.useEffect(() => {
    getEmail();
  }, [variable]);

  */

  return (
    <>
      <section className="flex flex-wrap justify-center feature-cards-container">
        {user && getFeatureCards(user)}
      </section>
      {/*
      <button onClick={change}>Call /</button>
      {output && <h2>{output}</h2>}
      */}
    </>
  );
}
