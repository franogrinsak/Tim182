import React from "react";
import { Link } from "react-router-dom";
import { ORGANIZE_TOURNAMENT } from "../../util/paths";

export default function Tournaments() {
  return (
    <section>
      <Link to={ORGANIZE_TOURNAMENT}>
        <button>Organize a tournament</button>
      </Link>
    </section>
  );
}
