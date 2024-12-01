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

export default function OwnerCalendar() {
  const { user } = useUser();
  const calendarRef = useRef(null);

  const slots = TEST_SLOTS;

  const [open, setOpen] = React.useState(false);
  const [openDetails, setOpenDetails] = React.useState(false);
  const [initialSlot, setInitialSlot] = React.useState({
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  });

  const [eventSlot, setEventSlot] = React.useState();

  const handleDateClick = (info) => {
    const calendarApi = calendarRef.current.getApi(); // Get the calendar instance
    calendarApi.changeView("timeGridWeek", info.dateStr);
  };

  const handleEventMouseEnter = (mouseEnterInfo) => {
    if (
      isPlayer(user) &&
      mouseEnterInfo.event.extendedProps.userId &&
      mouseEnterInfo.event.extendedProps.userId != user.userId
    )
      return;

    mouseEnterInfo.el.style.cursor = "pointer"; // Change cursor to pointer
  };

  const handleEventMouseLeave = (mouseLeaveInfo) => {
    mouseLeaveInfo.el.style.cursor = ""; // Reset cursor
  };

  function handleEventClick(info) {
    info.jsEvent.preventDefault();

    if (
      isPlayer(user) &&
      info.event.extendedProps.userId &&
      info.event.extendedProps.userId != user.userId
    )
      return;

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
    console.log(info.event);
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
