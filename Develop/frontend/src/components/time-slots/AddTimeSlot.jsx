import React from "react";
import {
  Input,
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Select from "react-select";
import { postNewTimeSlot } from "../../util/api";
import { redirect, useNavigate, useParams } from "react-router-dom";

const daysOfTheWeek = [
  { value: "mon", label: "Monday" },
  { value: "tue", label: "Tuesday" },
  { value: "wed", label: "Wednesday" },
  { value: "thu", label: "Thursday" },
  { value: "fri", label: "Friday" },
  { value: "sat", label: "Saturday" },
  { value: "sun", label: "Sunday" },
];

export default function AddTimeSlot(props) {
  const navigate = useNavigate();
  const { courtId } = useParams();
  const [formData, setFormData] = React.useState({
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    dow: [daysOfTheWeek[0]],
    weeks: "1",
    price: "0.00",
  });

  React.useEffect(() => {
    setFormData({
      ...formData,
      startDate: props.initialSlot?.startDate || "",
      startTime: props.initialSlot?.startTime || "",
      endDate: props.initialSlot?.endDate || "",
      endTime: props.initialSlot?.endTime || "",
    });
  }, [JSON.stringify(props.initialSlot)]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMultiSelectChange = (selectedOptions) => {
    setFormData({
      ...formData,
      dow: selectedOptions,
    });
  };

  const handleOpen = () => props.setOpen(!props.open);

  async function submitSlot() {
    const data = {
      courtId: courtId,
      startTimestamp: `${formData.startDate}T${formData.startTime}`,
      endTimestamp: `${formData.endDate}T${formData.endTime}`,
      price: formData.price,
    };

    const success = await postNewTimeSlot(data);
    console.log(success);
    if (success) window.location.reload();
  }

  return (
    <>
      <Button className="ml-auto" onClick={handleOpen}>
        Add slot
      </Button>
      <Dialog size="sm" open={props.open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Add time slots
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Add a new time slots
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
                required
              />
              <input
                value={formData.startTime}
                type="time"
                id="startTime"
                name="startTime"
                onChange={handleChange}
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
                required
              />
              <input
                value={formData.endTime}
                type="time"
                id="appt"
                name="endTime"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {/*
          <div className="mt-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Repeat on days of the week
            </Typography>
            <Select
              isMulti
              name="dow"
              options={daysOfTheWeek}
              className="basic-multi-select"
              classNamePrefix="select"
              value={formData.dow}
              onChange={handleMultiSelectChange}
            />
          </div>
          <div className="flex gap-4 mt-4">
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Number of weeks to repeat the slot (1 only creates slots for the
                current week, 2 includes the next, etc.)
              </Typography>
              <div className="w-24">
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                  <input
                    value={formData.weeks}
                    onChange={handleChange}
                    min={1}
                    max={53}
                    type="text"
                    name="weeks"
                    id="weeks"
                    className="grow block min-w-0 py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    placeholder="Weeks"
                  />
                </div>
              </div>
            </div>
          </div>
          */}
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
          <Button className="ml-auto" color="blue" onClick={submitSlot}>
            Add slot
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
