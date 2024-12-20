import React from "react";
import {
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { useUser } from "../auth/UserContext";
import { isOwner } from "../../util/users";

export default function (props) {
  const { user } = useUser();
  const { tournamentId, userId } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const message = useActionData();
  const navigation = useNavigation();
  return (
    <>
      {user && isOwner(user) && (
        <Button className="ml-auto" onClick={handleOpen}>
          Enter results and complete the tournament
        </Button>
      )}

      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <Form method="post">
          <DialogHeader className="relative m-0 block">
            <Typography variant="h4" color="blue-gray">
              Results
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
          <DialogBody className="space-y-4 pb-6">
            <div>
              <div>
                <input defaultValue={tournamentId} name="tournamentId" hidden />
                <input defaultValue={userId} name="userId" hidden />
                <textarea
                  id="results"
                  rows="4"
                  name="results"
                  className="min-h-96 text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Tournament results"
                  required
                ></textarea>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <button
              disabled={userId && navigation.state !== "idle"}
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-blue-500 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none ml-auto"
            >
              {navigation.state === "submitting"
                ? "Completing..."
                : "Complete tournament"}
            </button>
          </DialogFooter>
        </Form>
      </Dialog>
    </>
  );
}
