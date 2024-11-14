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
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={change}
      >
        Get signed in user data
      </button>
    </>
  );
}
