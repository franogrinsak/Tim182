import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { Form, useNavigation, useParams } from "react-router-dom";
import { useUser } from "../../auth/UserContext";

export default function AddTournamentImage() {
  const { user } = useUser();
  const navigation = useNavigation();
  const { tournamentId, ownerId } = useParams();
  const [open, setOpen] = React.useState(false);
  const [imageError, setImageError] = React.useState();
  const [previewImage, setPreviewImage] = React.useState();
  const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB in bytes

  const handleOpen = () => setOpen(!open);

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
      <Button className="ml-auto mt-2" onClick={handleOpen}>
        Upload an image
      </Button>
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Upload an image
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleOpen}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        {imageError && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
            role="alert"
          >
            <span className="block sm:inline">{imageError}</span>
          </div>
        )}
        <Form method="post">
          <DialogBody className="space-y-4 pb-6"></DialogBody>
          <input type="hidden" name="imageText" value={previewImage || ""} />
          <input type="hidden" name="formId" value="image" />
          <input name="userId" value={user?.userId} hidden />
          <input name="tournamentId" value={tournamentId} hidden />
          <input name="ownerId" value={ownerId} hidden />
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
                    Click to upload a tournament image
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
                name="image"
                className="hidden"
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
              />
            </label>
          )}
          {previewImage && <button onClick={removeImage}>Remove image</button>}
          <DialogFooter>
            <Button
              loading={navigation.state === "submitting"}
              type="submit"
              className="ml-auto"
              color="blue"
            >
              Upload image
            </Button>
          </DialogFooter>
        </Form>
      </Dialog>
    </>
  );
}
