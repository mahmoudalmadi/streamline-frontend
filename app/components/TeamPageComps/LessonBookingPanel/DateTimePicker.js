import React, { useEffect, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import "react-day-picker/style.css";

const DateTimePicker = ({ isVisible, onClose, selectedDate, setSelectedDate, selectedTime, 
    toggleIsDateTimeDropdownVisible,
    setSelectedTime, dateTimePositioning}) => {
    const divRef = useRef(null);

    useEffect(() => {
        if (isVisible && divRef.current) {
            divRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [isVisible,selectedDate]);

    const [currentDate, setCurrentDate] = useState(null)

    const handleClickOutside = (event) => {
        if (divRef.current && !divRef.current.contains(event.target)) {
            onClose(); // Trigger the close function
        }
    };

      // Define the days that should be selectable
    const selectableDays = [
        new Date(2024, 10, 15),
        new Date(2024, 10, 16),
        new Date(2024, 10, 17)
    ];

    const availableTimes = {
        "11/15/2024" : ["Available times",currentDate?.toDateString().slice(0,
            currentDate.toDateString().length -4),"7 AM - 7:30 AM"],
       "11/16/2024" : ["Available times",currentDate?.toDateString().slice(0,
        currentDate.toDateString().length -4),"7 AM - 7:30 AM", "7:30 AM - 8:30 AM","8:30 - 9:00 AM"]
    }

    // Function to determine if a day is disabled
    const isDateDisabled = (date) => {
        return !selectableDays.some(selectableDay => 
        selectableDay.toDateString() === date.toDateString()
        );
    };

    useEffect(() => {
        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible]);

    return (
        isVisible && (
            <div
                ref={divRef}
                className={`absolute flex bg-white
                ${dateTimePositioning}
                 mt-2 py-2 
                 rounded-3xl shadow-[0_0_12px_rgba(0,0,0,0.1)] mb-[10px]
                 `}
                onClick={(e)=>e.stopPropagation()} // Close on click within the div
            >
                <div className='flex  overflow-y-scroll pl-3 space-x-[40px]'>
                    <div className='flex-1 flex-col mr-[15px]'>
                        <div className='text-[12px] mb-0.5 pl-[10px] whitespace-nowrap 
                        text-streamlineBlue '
                        style={{
                            fontWeight:525
                        }}>
                            {/* Available lesson types */}
                        </div>
                        <div className='flex flex-1 '>
                        <DayPicker
                            mode="single"
                            selected={currentDate}
                            onSelect={setCurrentDate}
                            disabled={isDateDisabled}
                        
                        />
                        </div>
                        </div>
                    </div>
                    <div className='flex flex-col'>

                        <div className='flex  flex-1 justify-center 
                                items-center max-w-[180px] px-[10px]'>
                            <div className=
                            {`flex-1 text-center space-y-[10px]
                            ${currentDate?"w-[200px]":" w-[200px] text-graySubtitle"}
                            `}>
                                {
                                currentDate ? 
                                
                                availableTimes[currentDate.toLocaleDateString()].map(
                                    (item,index)=>
                                    (<div className={item!="Available times" ? `flex-1 leading-6
                                    ${index==1 ? "font-bold": ""} 
                                    ${selectedTime!=item && index>1 ? "hover:bg-gray-100":""}
                                    ${selectedTime===item && index!=1 && currentDate==selectedDate ? "text-white bg-streamlineBlue":""}
                                    ${index>1?"text-streamlineBlue border border-streamlineBlue py-[4px]":""}
                                    rounded-full
                                    ` : ""} onClick={()=>{
                                        if(index>1)
                                        {setSelectedTime(item);
                                            setSelectedDate(
                                                currentDate
                                            )
                                        toggleIsDateTimeDropdownVisible()}}}>
                                        {item}
                                    </div>)
                                )
                                :
                                "Please select a date to view the available times "}
                            </div>
                        </div>
                        
                    </div>
            </div>
        )
    );
};

export default DateTimePicker;
