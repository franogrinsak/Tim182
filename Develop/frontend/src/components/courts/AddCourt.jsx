import React from "react";
import { Form, useActionData } from "react-router-dom";
import { useUser } from "../auth/UserContext";
import { USER_ROLES } from "../../util/constants";

export async function action() {
  return null;
}

export default function AddCourt() {
  const { user } = useUser();
  const message = useActionData();
  const [imageError, setImageError] = React.useState();
  const [previewImage, setPreviewImage] = React.useState();
  const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB in bytes

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setImageError("File size exceeds 4MB. Please select a smaller file.");
        setPreviewImage(null);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result);
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setImageError(null);
    }
  };

  function removeImage(event) {
    setPreviewImage(null);
    setImageError(null);
  }

  return (
    <>
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
          {imageError && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
              role="alert"
            >
              <span className="block sm:inline">{imageError}</span>
            </div>
          )}
          <Form
            method="post"
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <input type="hidden" name="userId" value={user?.userId || ""} />
            <div className="flex items-center justify-center w-full mb-4">
              {previewImage && (
                <div className="mt-4 w-full flex justify-center">
                  <img
                    src={previewImage}
                    alt="Uploaded preview"
                    className="max-w-sm max-h-64 rounded-lg bg-contain"
                  />
                </div>
              )}
              {!previewImage && (
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">
                        Click to upload the court image
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG or JPG
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
            {previewImage && (
              <button onClick={removeImage}>Remove image</button>
            )}
            <div className="flex flex-wrap flex-col -mx-3 mb-6 register-layout">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 text-left"
                  htmlFor="courtName"
                >
                  Court name
                </label>
                <input
                  minLength="1"
                  maxLength="50"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="courtName"
                  name="courtName"
                  type="text"
                  placeholder="Court name"
                  required
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 text-left"
                  htmlFor="location"
                >
                  Location
                </label>
                <input
                  minLength="1"
                  maxLength="50"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Location"
                  required
                />
              </div>
            </div>

            <div className="-mx-3 mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 text-left"
                htmlFor="roleId"
              >
                Setting
              </label>
              <div className="flex flex-column items-start">
                <div className="inline-block relative w-28">
                  <select
                    name="isIndoor"
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="true">Indoor</option>
                    <option value="false">Outdoor</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <button
              disabled={user && navigation.state !== "idle"}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {navigation.state === "submitting" ? "Adding..." : "Add"}
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
