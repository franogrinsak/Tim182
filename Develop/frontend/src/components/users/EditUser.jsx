import React from "react";
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useParams,
} from "react-router-dom";
import ReturnButton from "../ReturnButton";
import { getAllUsers, postUpdateUserData } from "../../util/api";
import { USER_ROLES } from "../../util/constants";
import sleep from "../../util/sleep";
import { USERS } from "../../util/paths";

export async function action({ request }) {
  const formData = await request.formData();
  const data = {
    userId: formData.get("userId"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phoneNumber: formData.get("phoneNumber"),
    email: formData.get("email"),
    roleId: formData.get("roleId"),
  };
  try {
    // Sleep is here to test the register button changing while doing a post request
    sleep(5000);
    await postUpdateUserData(data);
    return redirect(USERS);
  } catch (err) {
    console.log(err);
    return "Failed to register, reason: " + `${err.status} ${err.message}`;
  }
}

export async function loader({ params }) {
  const { userId } = params;
  const data = new URLSearchParams();
  const users = await getAllUsers();
  console.log(users);
  for (let i = 0; i < users.length; ++i) {
    if (users[i].userId == userId) {
      return { ...users[i] };
    }
  }
  return null;
}

export default function EditUser() {
  const user = useLoaderData();
  const message = useActionData();
  const { userId } = useParams();
  return (
    <>
      <ReturnButton link={"/app/users"} text="Return to users" />
      <h2>Edit user data</h2>
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
            <input type="hidden" name="userId" value={userId} />
            <input type="hidden" name="roleId" value={user?.roleId} />
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
                  defaultValue={user?.firstName}
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
                  defaultValue={user?.lastName}
                  required
                />
              </div>
            </div>
            <div className="-mx-3 mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 text-left"
                htmlFor="phoneNumber"
              >
                E-mail
              </label>
              <input
                minLength="1"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                name="email"
                type="text"
                placeholder="E-mail"
                defaultValue={user?.email}
                required
              />
            </div>
            {user?.roleId === USER_ROLES.OWNER && (
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
                  defaultValue={user.phoneNumber}
                  required
                />
              </div>
            )}

            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              {navigation.state === "submitting" ? "Editing..." : "Edit"}
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
