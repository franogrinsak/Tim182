import React from "react";
import { Outlet, Link } from "react-router-dom";
import { resolveBackendPath } from "../util/paths";

export default function Dashboard() {
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

  return (
    <>
      <button onClick={change}>Call /</button>
      {output && <h2>{output}</h2>}
      <Outlet />
    </>
  );
}
