import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Configure the localizer with Moment.js
const localizer = momentLocalizer(moment);

const MyCalendar = ({ events }) => {
  return (
    <div style={{ height: "800px", width: "100%" }}>
      <Calendar
        localizer={localizer}
        events={events}
        defaultView="week"
        views={["week"]}
        step={60} // 30-minute intervals
        timeslots={1} // One timeslot per step
        min={new Date(2023, 1, 1, 6, 0, 0)} // 6:00 AM
        max={new Date(2023, 1, 1, 22, 0, 0)} // 10:00 PM
        style={{ height: "100%" }}
        onNavigate={(date, view) => console.log("Navigated to:", date, view)}
      />
    </div>
  );
};

export default MyCalendar;
