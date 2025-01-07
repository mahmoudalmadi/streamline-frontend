import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BlueMoveLeft from "../../../../public/BlueMoveLeft.svg"
import BlueMoveRight from "../../../../public/BlueMoveRight.svg"
import "./custom-styles.css"; // Include the custom CSS file


// Configure the localizer with Moment.js
const localizer = momentLocalizer(moment);

const MyCalendar = ({ events, setPickedEvent, openEventModal }) => {


  const [currentDate,setCurrentDate]=useState(new Date())
  
      // Function to go to the next week
      const goToNextWeek = () => {
        const nextWeek = new Date(currentDate);
        nextWeek.setDate(currentDate.getDate() + 7);
        setCurrentDate(nextWeek);
      };
  
      // Function to go to the previous week
      const goToPreviousWeek = () => {
        const prevWeek = new Date(currentDate);
        prevWeek.setDate(currentDate.getDate() - 7);
        setCurrentDate(prevWeek);
      };

  const handleSelectEvent = (event) => {
    setPickedEvent(event); // Set the picked event
    openEventModal()
    console.log("Selected Event:", event);
  };

  const CustomToolbar = (props) => {
    return (
      <div className="custom-toolbar flex justify-between items-center py-[10px]">
        < div className="flex items-center space-x-[6px] text-streamlineBlue font-bold px-[4px] py-[4px] rounded-full cursor-pointer " onClick={() => props.onNavigate("PREV")}>
        <BlueMoveLeft/>  
        <button onClick={() => goToPreviousWeek()}>
        Previous</button>
        </div>
        <span className="font-bold">{props.label}</span>

        < div className="flex items-center space-x-[6px] text-streamlineBlue font-bold px-[4px] py-[4px] rounded-full cursor-pointer" onClick={() => props.onNavigate("NEXT")}>
        <button onClick={() => goToNextWeek()}>Next</button>
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
        step={30} // 30-minute intervals
        timeslots={2} // One timeslot per step
        min={new Date(2023, 1, 1, 6, 0, 0)} // 6:00 AM
        max={new Date(2023, 1, 1, 22, 0, 0)} // 10:00 PM
        style={{ height: "100%" }}
        components={{
          toolbar: CustomToolbar,
        }}
        date={currentDate}
        onSelectEvent={handleSelectEvent}
        onNavigate={(date, view) => console.log("Navigated to:", date, view)}
      />
    </div>
  );
};

export default MyCalendar;
