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
  isEarlierThan24Hours,
  isEarlierThanThershold,
  THIRTY_MINUTES_MS,
} from "../../util/date";
import { useParams } from "react-router-dom";
import PaymentOptions from "./PaymentOptions";
import {
  postBookTimeSlot,
  postBookTimeSlotBuy,
  postCancelTimeSlot,
  postDeleteTimeSlot,
} from "../../util/api/time-slots";

export default function TimeSlotDetails(props) {
  const { user } = useUser();
  const { courtId, ownerId } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState();
  const [payment, setPayment] = React.useState("cash");
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
      title: props.initialSlot?.title || "",
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

    try {
      setLoading(true);
      const success = await postCancelTimeSlot(data);
      if (!success) return;
      window.location.reload();
    } catch (err) {
      setError("Failed to cancel the booking: " + err.message);
      setLoading(false);
    }
  }
  async function bookSlot() {
    let data = new URLSearchParams();

    if (payment === "cash") {
      data.append("timeSlotId", formData.timeSlotId);
      data.append("userId", user.userId);

      try {
        setLoading(true);
        const success = await postBookTimeSlot(data);
        if (!success) return;
        window.location.reload();
      } catch (err) {
        setError("Failed to book the time slot: " + err.message);
        setLoading(false);
      }
    } else {
      data = {
        timeSlotId: formData.timeSlotId,
        userId: user.userId,
        name: "Rezervacija",
        courtId: courtId,
        ownerId: ownerId,
      };

      try {
        setLoading(true);
        const success = await postBookTimeSlotBuy(data);
        if (!success) return;
        window.location.reload();
      } catch (err) {
        setError("Failed to purchase the booking: " + err.message);
        setLoading(false);
      }
    }
  }

  async function deleteSlot() {
    const data = new URLSearchParams();
    data.append("timeSlotId", formData.timeSlotId);

    try {
      setLoading(true);
      const success = await postDeleteTimeSlot(data);
      if (!success) return;
      window.location.reload();
    } catch (err) {
      setError("Failed to delete the time slot: " + err.message);
      setLoading(false);
    }
  }

  return (
    <>
      <Dialog
        size="sm"
        open={loading || props.open}
        handler={handleOpen}
        className="p-4"
      >
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Time slot details
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            {formData.title + " "}
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
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}
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
          {user &&
            isPlayer(user) &&
            !formData.userId &&
            new Date(formData.startDate + " " + formData.startTime) >=
              Date.now() && (
              <PaymentOptions payment={payment} setPayment={setPayment} />
            )}
        </DialogBody>
        <DialogFooter>
          {isOwner(user) && (
            <Button
              className="ml-auto"
              color="red"
              onClick={deleteSlot}
              loading={loading}
            >
              Delete slot
            </Button>
          )}
          {isPlayer(user) &&
            formData.userId == 0 &&
            isEarlierThanThershold(
              formData.startDate,
              formData.startTime,
              THIRTY_MINUTES_MS
            ) && (
              <Button className="ml-auto" onClick={bookSlot} loading={loading}>
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
                loading={loading}
              >
                Cancel booking
              </Button>
            )}
        </DialogFooter>
      </Dialog>
    </>
  );
}
