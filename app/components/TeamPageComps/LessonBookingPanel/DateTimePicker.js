import React, { useEffect, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import "react-day-picker/style.css";

const DateTimePicker = ({ isVisible, onClose, selectedDate, setSelectedDate, selectedTime, 
    toggleIsDateTimeDropdownVisible, filteredEvents,
    setSelectedTime, dateTimePositioning,stackTimes,locationAvailability}) => {
    const divRef = useRef(null);

    useEffect(() => {
        if (isVisible && divRef.current) {
            divRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [isVisible,selectedDate]);

    const [currentDate, setCurrentDate] = useState(null)

    const availableTimes = locationAvailability
    const myDates = locationAvailability?locationAvailability.dates:null

    // Convert the list of available dates to a Set for better performance
    const availableDatesSet = new Set(myDates);

    // Disable all dates except the available ones
    const isDateSelectable = (date) => availableDatesSet.has(date.toDateString());

    const handleClickOutside = (event) => {
        if (divRef.current && !divRef.current.contains(event.target)) {
            onClose(); // Trigger the close function
        }
    };

      // Define the days that should be selectable
    // useEffect(()=>{

    //     function filterDatesMap(input,selectedSkillLevel
    //       ){

    //         const output = {dates:[],datesMap}
          
    //         dates.forEach((dateStr) => {
    //           const dateKey = new Date(dateStr).toDateString();
    //           const originalList = datesMap[dateKey];
          
    //           if (!originalList) return; // Skip if there's no entry for this date
          
    //           const filteredList = [
    //             originalList[0],
    //             originalList[1],
    //           ];
    //           console.log("OG LIST",originalList)
    //           if(originalList[2].length==3){
    //               console.log("OG LIST",originalList)
    //           originalList.slice(2).forEach((item) => {
    //             if (Array.isArray(item) && item.length === 3) {
    //               const [first, second, list] = item;
    //               list.forEach((entry) => {
    //                 const [skill1, skill2] = entry.split("#");
    //                 if (skill1 === selectedSkillLevel && skill2 === selectedSkillLevel) {
    //                   filteredList.push(item);
    //                 }
    //               });
    //             }
    //           });
          
    //           if (filteredList.length > 2) {
    //             output.dates.push(dateStr);
    //             output.datesMap[dateKey] = filteredList;
    //           }}
    //         });

    //         return output
    //     }
          
    //     const filteredOptions = filterDatesMap(locationAvailability)

    //     if(currentDate){

    //     }
    // },[currentDate])

    // Function to determine if a day is disabled
    const isDateDisabled = (date) => {
        return !myDates.some(selectableDay => 
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

    console.log(locationAvailability)
    console.log("HII",currentDate?locationAvailability.datesMap.get(currentDate.toDateString()):null,currentDate)

    return (
        isVisible && (
            <div
                ref={divRef}
                className={`absolute flex sm:flex-row flex-col bg-white justify-center items-center border border-gray-300
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
                            onSelect={(event)=>{
                                console.log("EVENET",typeof(event))
                                setCurrentDate(event)}}
                            disabled={isDateDisabled}
                            modifiers={{
                                selectable: (date) => isDateSelectable(date), // Highlight selectable dates
                              }}
                              modifiersClassNames={{
                                selectable: 'selectable', // Class name for selectable dates
                              }}

                        
                        />
                        </div>
                        </div>
                    </div>
                    <div className='flex text-[14px] flex-col sm:py-0 py-[20px]'>

                        <div className='flex  flex-1 justify-center 
                                items-center max-w-[180px] px-[10px]'>
                            <div className=
                            {`flex-1 text-center space-y-[10px]
                            ${currentDate?"w-[200px]":" w-[200px] text-graySubtitle"}
                            `}>
                                {
                                (currentDate&&locationAvailability.datesMap.get(currentDate.toDateString())) ? 
                                
                                locationAvailability.datesMap.get(currentDate.toDateString()).map(
                                    (item,index)=>
                                    (<div className={item!="Available times" ? `flex-1 leading-6
                                    ${index==1 ? "font-bold": ""} 
                                    ${selectedTime!=item[0] && index>1 ? "hover:bg-gray-100":""}
                                    ${selectedTime===item[0] && index!=1 && currentDate==selectedDate ? "text-white bg-streamlineBlue":""}
                                    ${index>1?"text-streamlineBlue border border-streamlineBlue py-[4px]":""}
                                    rounded-full
                                    ` : ""} onClick={()=>{
                                        if(index>1)
                                        {setSelectedTime(item[0]);
                                            setSelectedDate(
                                                currentDate
                                            )
                                        toggleIsDateTimeDropdownVisible()}}}>
                                        {index<=1?item:item[0]}
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
