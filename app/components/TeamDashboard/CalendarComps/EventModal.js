import CONFIG from "@/config";
import InfoIcon from "../../../../public/InfoIcon.svg"
import LocationIcon from "../../../../public/LocationIcon.svg"
import NotifIcon  from "../../../../public/NotifIcon.svg"
import PeopleIcon  from "../../../../public/PeopleIcon.svg"
import PersonEntry from "@/app/components/TeamDashboard/CalendarComps/PersonEntry";
import { useEffect, useState } from "react";

export default function EventModal ({pickedEvent,streetAddress}){
    
    function formatEventTime({startTime, endTime}) {
        // Days of the week and months for formatting
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      
        // Extracting components for the start time
        const startDay = daysOfWeek[startTime.getDay()];
        const startMonth = months[startTime.getMonth()];
        const startDate = startTime.getDate();
      
        // Formatting hours and minutes for start and end time
        const formatTime = (date) => {
          const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
          const minutes = date.getMinutes().toString().padStart(2, "0");
          const amPm = date.getHours() >= 12 ? "PM" : "AM";
          return `${hours}${minutes !== "00" ? `:${minutes}` : ""} ${amPm}`;
        };
      
        const startFormattedTime = formatTime(startTime);
        const endFormattedTime = formatTime(endTime);
      
        // Return formatted string
        return `${startDay}, ${startMonth} ${startDate} · ${startFormattedTime} –${endFormattedTime}`;
    }

    function processEntries(entries) {
        const firstEntries = new Set();
        const secondEntries = new Set();
      
        entries.forEach(entry => {
          const [first, second] = entry.split('`');
          if (first && second) {
            firstEntries.add(first.trim());
            secondEntries.add(second.trim());
          }
        });
      
        return {
          firstEntries: Array.from(firstEntries),
          secondEntries: Array.from(secondEntries)
        };
      }
      
    const [selectedSkillsLevels,setSelectedSkillLevels]=useState(null)
    const [selectedLessonTypes,setSelectedLessonTypes]=useState(null)
    
    useEffect(()=>{
        const {firstEntries,secondEntries} = processEntries(pickedEvent.lessonType)
        
        setSelectedLessonTypes(secondEntries)
        setSelectedSkillLevels(firstEntries)
    },[])

    return(
        <>
                <div className="p-[8px]"  style={{
            userSelect: "none", // Prevent text selection
            WebkitUserSelect: "none", // Safari
            MozUserSelect: "none", // Firefox
            msUserSelect: "none",}} >
                    {pickedEvent && 
                    // <EventModalContent pickedEvent={pickedEvent}/>
                    <div>

                    <div className="flex flex-col">
                    <div className="flex items-center space-x-[16px]">

                    <div className="flex w-[22px] justify-center items-center">
                    <div className="flex w-[14px] h-[14px] rounded-[4px] "
                    style={{backgroundColor:CONFIG.calendar.blockColors[pickedEvent.status.toLowerCase()]}}/>
                    </div>
                    
                        <div className="flex font-bold   text-[18px]">
                        {pickedEvent.title} 
                        </div>
                    </div>

                    </div>
                    <div className="ml-[38px] flex  text-[14px]">
                    {formatEventTime({startTime:pickedEvent.start,endTime:pickedEvent.end})}
                    </div>

                    <div className="flex flex-col mt-[8px]">
                    <div className="flex items-center space-x-[16px]">
                    <div className="flex w-[22px] mt-[5px] justify-center items-center">
                    <InfoIcon/>
                    </div>
                    <div className="flex flex-col ">
                        <div className="flex leading-[14px] text-[14px] mt-[5px]">
                        <div className="font-bold mr-[4px]">
                        Status:
                        </div>    
                        <div>
                        {pickedEvent.status}
                        </div>    
                        </div>
                    </div>
                    </div>
                    </div>

                    {selectedLessonTypes&&
                    <>
                    {pickedEvent.numberOfSpots&&<div className="flex text-[14px] ml-[38px]">
                    <div className="font-bold mr-[4px]">
                    Spots:
                    </div>    
                    <div>
                    {pickedEvent.numberOfSpots}
                    </div>    
                    </div>}
                    <div className="text-[14px] leading-[8px] mt-[5px] mb-[3px] ml-[38px] font-bold">
                        {pickedEvent.status=="Available"?"Applicable lesson types:":"Lesson type"}
                    </div>
                    <div className="text-[14px] ml-[38px] ">
                        {selectedLessonTypes.join(", ")}
                    </div>
                    <div className="text-[14px] leading-[8px] mt-[8px] mb-[3px] ml-[38px] font-bold">
                    {pickedEvent.status=="Available"?"Applicable skill levels:":"Skill level"}
                    </div>
                    <div className="text-[14px]  ml-[38px] ">
                        {selectedSkillsLevels.join(", ")}
                    </div>
                    </>}

                    <div className="flex flex-col mt-[4px]">
                    <div className="flex items-center space-x-[16px]">

                    <div className="flex w-[22px] py-[12px] justify-center items-center">
                    <LocationIcon/>
                    </div>
                        <div className="flex flex-col">
                            <div className="flex  text-[14px]">
                            {streetAddress}
                            </div>
                        </div>
                    </div>
                    </div>


                    <div className="flex items-center py-[12px] space-x-[15px] mt-[3px]">

                    <div className="flex w-[22px] justify-center items-center">
                    <NotifIcon/>
                    </div>

                    <div className="flex  text-[14px]">
                    { `Reminder: ${pickedEvent.reminder.quantity} ${pickedEvent.reminder.metric} before`} 
                    </div>
                    
                    </div>
                    {(pickedEvent.coachName || pickedEvent.athletes) &&
                    <>
                    <div className="flex items-center pt-[10px] space-x-[16px]">

                    <div className="flex w-[22px] justify-center items-center">
                    <PeopleIcon/>
                    </div>

                    
                    <div className="flex font-bold text-[14px]">
                    {pickedEvent.coachName?"Coach":CONFIG.athleteType}
                    </div>
                    
                    </div>

                    <div className="ml-[7px]">

                    {pickedEvent.coachName&&<PersonEntry personInfo={
                        {
                            fullName:pickedEvent.coachName,
                            email:pickedEvent.coachEmail,
                            phoneNumber:pickedEvent.coachPhone
                            }}/>}

                    {pickedEvent.athletes &&
                    <>
                    {pickedEvent.coachName&&<div className="flex font-bold ml-[32px] text-[14px] mt-[6px] pt-[4px]">
                    {CONFIG.athleteType}{pickedEvent.athletes.length>1?"'s":""}
                    </div>}

                    {pickedEvent.athletes.map((athlete,index)=>
                    (
                    
                    athlete.athleteInfo.phoneNumber?
                    <PersonEntry key={index} personInfo={
                          {
                            fullName:athlete.fullName,
                            email:athlete.athleteInfo.emailAddress,
                            phoneNumber:athlete.athleteInfo.phoneNumber
                            }}/>
                    :
                    <div key={index}>
                    <PersonEntry  personInfo={
                        {
                          fullName:athlete.fullName
                          }}/>

                    <div className="leading-[10px] mt-[12px] w-full text-[14px] ml-[73px] mb-[6px]">
                        {athlete.fullName.split(" ")[0]}'s contact:
                    </div>
                    <PersonEntry noIcon={true} personInfo={
                        {
                          fullName:pickedEvent.contact[index].fullName,
                          email:pickedEvent.contact[index].emailAddress,
                          phoneNumber:pickedEvent.contact[index].phoneNumber
                        }}
                    />
                    </div>
                            
                    ))}
                    
                    </>
                    }

                    </div>

                    </>

                    }


                </div>
                    }
                </div>
        </>
    )
}