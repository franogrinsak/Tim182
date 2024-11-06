import React from "react";
import { resolveBackendPath } from "../util/paths";
import { redirect } from "react-router-dom";

export default function Logged() {
  const [email, setEmail] = React.useState(undefined);
  const [changer, setChanger] = React.useState(true);

  const change = () => {
    setChanger((old) => !old);
  };

  const getEmail = async () => {
    try {
      const response = await fetch(resolveBackendPath("/logged"), {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          // other headers as needed
        },
      });
      const text = await response.text();
      setEmail(text);
    } catch (err) {
      console.error("Error occured: ", err);
      throw redirect("/login");
    }
  };
  React.useEffect(() => {
    getEmail();
  }, [changer]);
  return (
    <>
      {email && <pre>Logged in with:{email}</pre>}
      <button onClick={change}>Get signed in user data</button>
    </>
  );
}
