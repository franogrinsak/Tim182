import { Button } from "@material-tailwind/react";
import React from "react";
import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom";
import { MEMBERSHIP } from "../../util/paths";
import {
  getMembershipPrice,
  postSetMembershipPrice,
} from "../../util/api/membership";

export async function loader() {
  return await getMembershipPrice();
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = new URLSearchParams();
  data.append("membershipPrice", formData.get("price"));
  try {
    await postSetMembershipPrice(data);
  } catch (err) {
    return "Failed to set the membership: " + err.message;
  }

  return redirect(MEMBERSHIP);
}

export default function EditMembership() {
  const price = useLoaderData();
  const navigation = useNavigation();

  return (
    <section>
      <h2>Edit membership price</h2>
      <Form method="post">
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
                type="text"
                name="price"
                id="price"
                title="Price has to be a non-zero decimal with 2 decimal digits at most and not greater than 9999.99€"
                pattern="^[0-9]{1,4}\.[0-9]{1,2}$"
                className="grow block min-w-0 py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            loading={navigation.state === "submitting"}
            color="blue"
            type="submit"
          >
            Edit price
          </Button>
        </div>
      </Form>
    </section>
  );
}
