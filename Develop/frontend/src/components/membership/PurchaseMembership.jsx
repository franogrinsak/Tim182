import { Button } from "@material-tailwind/react";
import React from "react";
import { useLoaderData } from "react-router-dom";
import { postPurchaseMembership } from "../../util/api/membership";

export default function PurchaseMembership() {
  const price = useLoaderData();
  const [buying, setBuying] = React.useState(false);

  async function purchaseMembership() {
    setBuying(true);
    const data = {
      name: "Clanarina",
    };

    const success = await postPurchaseMembership(data);
    if (success) window.location.reload();
    setBuying(false);
  }

  return (
    <>
      <h2>Purchase membership</h2>
      <section>
        <div className="mt-4 flex justify-center">
          <label
            htmlFor="price"
            className="block text-sm/6 font-medium text-gray-900 flex items-center"
          >
            Price
          </label>
          <div className="w-24 m-4">
            <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
              <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
                €
              </div>
              <input
                defaultValue={price}
                readOnly
                type="text"
                name="price"
                id="price"
                className="grow block min-w-0 py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button color="blue" onClick={purchaseMembership} loading={buying}>
            Purchase
          </Button>
        </div>
      </section>
    </>
  );
}
