import { Button } from "@material-tailwind/react";
import React from "react";
import ExpandingHeader from "./ExpandingHeader";

export default function MobileDashboardHeader(props) {
  const { headerOpened, setHeaderOpened, name, user } = props;

  return (
    <>
      <Button
        onClick={() => setHeaderOpened((prev) => !prev)}
        color="white"
        className="flex justify-center items-cente ml-8"
      >
        <i className="pi pi-bars"></i>
      </Button>
      <ExpandingHeader
        headerOpened={headerOpened}
        setHeaderOpened={setHeaderOpened}
        name={name}
        user={user}
      />
    </>
  );
}
