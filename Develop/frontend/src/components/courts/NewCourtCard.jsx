import React from "react";
import { ADD_COURT } from "../../util/paths";
import { Link } from "react-router-dom";

export default function NewCourtCard() {
  return (
    <div className="border-dashed border-gray-300 border-4 rounded-xl group relative zoom-animation">
      <div className="aspect-h-1 aspect-w-1 h-full w-full overflow-hidden rounded-md bg-white lg:aspect-none">
        <Link to={ADD_COURT}>
          <div className="h-full w-full object-cover object-center lg:h-full lg:w-full flex justify-center items-center flex-col">
            <div className="font-bold leading-12 flex justify-center items-center rounded-full text-gray-300 leading-none border-dashed border-gray-300 border-4  w-12 h-12 text-3xl">
              <span className="mb-1">+</span>
            </div>
            <div className="text-gray-300 font-medium text-xl">Add court</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
