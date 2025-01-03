import React from "react";
import { useUser } from "../auth/UserContext";
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import ReturnButton from "../ReturnButton";
import { postUpdateOwnerProfileData } from "../../util/api";

export async function action({ request }) {
  const formData = await request.formData();
  const data = {
    userId: formData.get("userId"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phoneNumber: formData.get("phoneNumber"),
    roleId: formData.get("roleId"),
  };
  try {
    await postUpdateOwnerProfileData(data);
    return redirect("/app/courts/" + data.userId + "/profile");
  } catch (err) {
    console.log(err);
    return "Failed to register, reason: " + `${err.status} ${err.message}`;
  }
}

export default function EditOwnerProfile() {
  const { user } = useUser();
  const message = useActionData();
  const owner = useLoaderData();
  const navigation = useNavigation();
  console.log(owner);
  return (
    <>
      <ReturnButton
        link={"/app/courts/" + owner.userId + "/profile"}
        text="Return to profile"
      />
      <h2>Edit profile data</h2>
      <div className="register-form-container">
        <div className="w-full register-size">
          {message && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
              role="alert"
            >
              <span className="block sm:inline">{message}</span>
            </div>
          )}
          <Form
            method="post"
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <input type="hidden" name="userId" value={user?.userId || ""} />
            <div className="flex flex-wrap flex-row -mx-3 mb-6 register-layout">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 text-left"
                  htmlFor="firstName"
                >
                  First name
                </label>
                <input
                  minLength="1"
                  maxLength="50"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  defaultValue={owner?.firstName}
                  required
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 text-left"
                  htmlFor="lastName"
                >
                  Last name
                </label>
                <input
                  minLength="1"
                  maxLength="50"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  defaultValue={owner?.lastName}
                  required
                />
              </div>
            </div>

            <div className="-mx-3 mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 text-left"
                htmlFor="phoneNumber"
              >
                Phone number
              </label>
              <input
                minLength="1"
                maxLength="50"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                title="Only digits and spaces are allowed"
                placeholder="Phone number"
                defaultValue={owner.phoneNumber}
                required
              />
            </div>

            <button
              disabled={user && navigation.state !== "idle"}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              {navigation.state === "submitting" ? "Editing..." : "Edit"}
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
