import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BlueMoveLeft from "../../../../public/BlueMoveLeft.svg"
import BlueMoveRight from "../../../../public/BlueMoveRight.svg"

// Configure the localizer with Moment.js
const localizer = momentLocalizer(moment);

const MyCalendar = ({ events }) => {

  const CustomToolbar = (props) => {
    return (
      <div className="custom-toolbar flex justify-between items-center py-[10px]">
        < div className="flex items-center space-x-[6px] text-streamlineBlue font-bold px-[4px] py-[4px] rounded-full cursor-pointer " onClick={() => props.onNavigate("PREV")}>
        <BlueMoveLeft/>  
        <button onClick={() => props.onNavigate("PREV")}>
        Previous</button>
        </div>
        <span className="font-bold">{props.label}</span>

        < div className="flex items-center space-x-[6px] text-streamlineBlue font-bold px-[4px] py-[4px] rounded-full cursor-pointer" onClick={() => props.onNavigate("NEXT")}>
        <button onClick={() => props.onNavigate("NEXT")}>Next</button>
        <BlueMoveRight/>  
        </div>
      </div>
    );
  };

  return (
    <div className="items-center justify-center" 
    style={{ height: "800px", width: "100%" }}>
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
        components={{
          toolbar: CustomToolbar,
        }}
        onNavigate={(date, view) => console.log("Navigated to:", date, view)}
      />
    </div>
  );
};

export default MyCalendar;
