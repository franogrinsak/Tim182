import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import AddTimeSlot from "./AddTimeSlot";
import { useUser } from "../auth/UserContext";
import { isOwner, isPlayer } from "../../util/users";
import { TEST_SLOTS } from "../../util/test/time-slots";
import TimeSlotDetails from "./TimeSlotDetails";
import { getTimeSlotsOwners, getTimeSlotsPlayers } from "../../util/api";
import { useParams } from "react-router-dom";
import { USER_ROLES } from "../../util/constants";

function mapSlotForPlayers(slot) {
  const tmp = {
    id: slot.timeSlotId,
    start: slot.startTimestamp,
    end: slot.endTimestamp,
    title: "Available",
    extendedProps: {
      price: slot.price,
      userId: slot.user.userId,
      isBooked: slot.isBooked,
    },
  };
  if (slot.isBooked) {
    tmp.backgroundColor = "grey";
    tmp.title = "Booked";
  }
  if (slot.user.userId != 0) {
    tmp.backgroundColor = "green";
    tmp.title = "Your booking";
  }
  return tmp;
}

function mapSlotForOwners(slot) {
  return {
    id: slot.timeSlotId,
    start: slot.startTimestamp,
    end: slot.endTimestamp,
    backgroundColor: slot.user.userId != 0 ? "grey" : "",
    title:
      slot.user.userId != 0
        ? `Booked by ${slot.user.firstName} ${slot.user.lastName}`
        : "Available",
    extendedProps: {
      price: slot.price,
      userId: slot.user.userId,
      firstName: slot.user.firstName,
      lastName: slot.user.lastName,
    },
  };
}

async function getTimeSlots(ownerId, courtId, user) {
  const data = new URLSearchParams();
  data.append("courtId", courtId);
  data.append("userId", user.userId);

  let slots;
  if (user.roleId == USER_ROLES.OWNER) slots = await getTimeSlotsOwners(data);
  if (user.roleId == USER_ROLES.PLAYER) slots = await getTimeSlotsPlayers(data);
  return slots.map((slot) => {
    if (user.roleId == USER_ROLES.PLAYER) return mapSlotForPlayers(slot);
    if (user.roleId == USER_ROLES.OWNER) return mapSlotForOwners(slot);
  });
}

export default function OwnerCalendar() {
  const { user } = useUser();
  const [slots, setSlots] = React.useState([]);
  const [loadingSlots, setLoadingSlots] = React.useState(true);
  const { ownerId, courtId } = useParams();
  const calendarRef = useRef(null);

  const [open, setOpen] = React.useState(false);
  const [openDetails, setOpenDetails] = React.useState(false);
  const [initialSlot, setInitialSlot] = React.useState({
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  });

  React.useEffect(() => {
    async function getTimeSlotsWrapper() {
      if (user) {
        const data = await getTimeSlots(ownerId, courtId, user);
        setSlots(data);
      }
    }
    getTimeSlotsWrapper();
  }, [JSON.stringify(user)]);

  const [eventSlot, setEventSlot] = React.useState();

  const handleDateClick = (info) => {
    const calendarApi = calendarRef.current.getApi(); // Get the calendar instance
    calendarApi.changeView("timeGridWeek", info.dateStr);
  };

  const handleEventMouseEnter = (mouseEnterInfo) => {
    if (isPlayer(user) && mouseEnterInfo.event.extendedProps.isBooked) return;

    mouseEnterInfo.el.style.cursor = "pointer"; // Change cursor to pointer
  };

  const handleEventMouseLeave = (mouseLeaveInfo) => {
    mouseLeaveInfo.el.style.cursor = ""; // Reset cursor
  };

  function handleEventClick(info) {
    info.jsEvent.preventDefault();

    if (isPlayer(user) && info.event.extendedProps.isBooked) return;

    const startEnd = info.event.startStr.split("T");
    const endEnd = info.event.endStr.split("T");
    setEventSlot({
      ...eventSlot,
      startDate: startEnd[0],
      startTime: startEnd[1].split("+")[0],
      endDate: endEnd[0],
      endTime: endEnd[1].split("+")[0],
      id: info.event.id,
      price: info.event.extendedProps.price,
      userId: info.event.extendedProps.userId,
    });
    setOpenDetails(true);
  }

  function selectRange(info) {
    const startEnd = info.startStr.split("T");
    const endEnd = info.endStr.split("T");

    setInitialSlot({
      ...initialSlot,
      startDate: startEnd[0],
      startTime: startEnd[1].split("+")[0],
      endDate: endEnd[0],
      endTime: endEnd[1].split("+")[0],
    });
    setOpen(true);
  }
  return (
    <section className="w-full max-w-3xl py-10">
      {isOwner(user) && (
        <AddTimeSlot initialSlot={initialSlot} open={open} setOpen={setOpen} />
      )}
      <TimeSlotDetails
        initialSlot={eventSlot}
        open={openDetails}
        setOpen={setOpenDetails}
      />
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay", // user can switch between the three
        }}
        allDaySlot={false}
        selectable={true}
        nowIndicator={true}
        weekends={true}
        dateClick={handleDateClick}
        select={selectRange}
        eventClick={handleEventClick}
        eventMouseEnter={handleEventMouseEnter}
        eventMouseLeave={handleEventMouseLeave}
        selectAllow={(selectInfo) => {
          // Detect if the date string contains time info, rather than date only.
          return isOwner(user) && selectInfo.startStr.split("T").length > 1;
        }}
        events={slots}
      />
    </section>
  );
}
