import React from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { getLinks } from "./DesktopDashboardHeader";
import { LOGOUT, resolveBackendPath } from "../../util/paths";

export default function ExpandingHeader(props) {
  const { headerOpened, setHeaderOpened, name, user } = props;

  return (
    <div className="card flex justify-content-center">
      <Sidebar
        visible={headerOpened}
        onHide={() => setHeaderOpened(false)}
        content={({ closeIconRef, hide }) => (
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="flex align-items-center justify-end px-4 pt-3 flex-shrink-0 w-full">
                <span>
                  <Button
                    type="button"
                    ref={closeIconRef}
                    onClick={(e) => hide(e)}
                    icon="pi pi-times"
                    rounded
                    outlined
                    className="h-2rem w-2rem"
                  ></Button>
                </span>
              </div>
              <div className="flex flex-col custom-mobile-link">
                {getLinks(user)}
              </div>
            </div>
            <div className="flex flex-col custom-mobile-link">
              <a
                className="text-green-500 hover:text-green-500"
                href={resolveBackendPath(LOGOUT)}
              >
                Logout
              </a>
              <div className="flex flex-column h-full">
                <div className="mt-auto">
                  <hr className="mb-3 mx-3 border-top-1 border-none surface-border" />
                  <span className="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                    <span className="font-bold">{name}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      ></Sidebar>
    </div>
  );
}
