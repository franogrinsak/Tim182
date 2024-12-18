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
import { useUser } from "../auth/UserContext";
import { isOwner, isPlayer } from "../../util/users";
import {
  postBookTimeSlot,
  postBookTimeSlotBuy,
  postCancelTimeSlot,
  postDeleteTimeSlot,
} from "../../util/api";
import { isEarlierThan24Hours } from "../../util/date";
import { useParams } from "react-router-dom";

export default function TimeSlotDetails(props) {
  const { user } = useUser();
  const { courtId, ownerId } = useParams();
  const [formData, setFormData] = React.useState({
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    price: "0",
  });

  React.useEffect(() => {
    setFormData({
      ...formData,
      timeSlotId: props.initialSlot?.id,
      startDate: props.initialSlot?.startDate || "",
      startTime: props.initialSlot?.startTime || "",
      endDate: props.initialSlot?.endDate || "",
      endTime: props.initialSlot?.endTime || "",
      price: props.initialSlot?.price || "",
      userId: props.initialSlot?.userId || "",
    });
  }, [JSON.stringify(props.initialSlot)]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOpen = () => props.setOpen(!props.open);

  async function cancelBookedSlot() {
    const data = new URLSearchParams();
    data.append("timeSlotId", formData.timeSlotId);

    const success = await postCancelTimeSlot(data);
    if (success) window.location.reload();
  }
  async function bookSlot() {
    let data = new URLSearchParams();
    data.append("timeSlotId", formData.timeSlotId);
    data.append("userId", user.userId);

    /*
    data = {
      timeSlotId: formData.timeSlotId,
      userId: user.userId,
      name: "Rezervacija",
      courtId: courtId,
      ownerId: ownerId,
    };
    */

    const success = await postBookTimeSlot(data);
    if (success) window.location.reload();
  }

  async function deleteSlot() {
    const data = new URLSearchParams();
    data.append("timeSlotId", formData.timeSlotId);

    const success = await postDeleteTimeSlot(data);
    if (success) window.location.reload();
  }

  return (
    <>
      <Dialog size="sm" open={props.open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Time slot details
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            {/* Edit or delete the time slot */}
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
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Start date and time
            </Typography>
            <div>
              <input
                value={formData.startDate}
                type="date"
                id="startDate"
                name="startDate"
                onChange={handleChange}
                readOnly
                required
              />
              <input
                value={formData.startTime}
                type="time"
                id="startTime"
                name="startTime"
                onChange={handleChange}
                readOnly
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              End date and time
            </Typography>
            <div>
              <input
                value={formData.endDate}
                type="date"
                id="endDate"
                name="endDate"
                onChange={handleChange}
                readOnly
                required
              />
              <input
                value={formData.endTime}
                type="time"
                id="appt"
                name="endTime"
                onChange={handleChange}
                readOnly
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="price"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Price
            </label>
            <div className="w-24">
              <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
                  €
                </div>
                <input
                  value={formData.price}
                  onChange={handleChange}
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
        </DialogBody>
        <DialogFooter>
          {isOwner(user) && (
            <Button className="ml-auto" color="red" onClick={deleteSlot}>
              Delete slot
            </Button>
          )}
          {isPlayer(user) && formData.userId == 0 && (
            <Button className="ml-auto" onClick={bookSlot}>
              Book slot
            </Button>
          )}
          {isPlayer(user) &&
            formData.userId != 0 &&
            isEarlierThan24Hours(formData.startDate, formData.startTime) && (
              <Button
                className="ml-auto"
                color="red"
                onClick={cancelBookedSlot}
              >
                Cancel booking
              </Button>
            )}
        </DialogFooter>
      </Dialog>
    </>
  );
}
