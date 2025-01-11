import InfoIcon from "../../../../public/InfoIcon.svg"
import LocationIcon from "../../../../public/LocationIcon.svg"
import NotifIcon  from "../../../../public/NotifIcon.svg"
import PeopleIcon  from "../../../../public/PeopleIcon.svg"
import PersonEntry from "@/app/components/TeamDashboard/CalendarComps/PersonEntry";

export default function EventModal ({pickedEvent}){

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

    return(
        <>
                <div className="p-[8px]">
                    {pickedEvent && 
                    // <EventModalContent pickedEvent={pickedEvent}/>
                    <div>

                    <div className="flex flex-col">
                    <div className="flex items-center space-x-[16px]">

                    <div className="flex w-[22px] justify-center items-center">
                    <div className="flex w-[14px] h-[14px] rounded-[4px] bg-streamlineBlue "/>
                    </div>
                    
                        <div className="flex font-bold   text-[18px]">
                        {pickedEvent.title} 
                        </div>
                    </div>

                    </div>
                    <div className="ml-[38px] flex  text-[14px]">
                    {formatEventTime({startTime:pickedEvent.start,endTime:pickedEvent.end})}
                    </div>

                    <div className="flex flex-col mt-[4px]">
                    <div className="flex items-center space-x-[16px]">

                    <div className="flex w-[22px] py-[12px] mt-[4px] justify-center items-center">
                    <InfoIcon/>
                    </div>
                        <div className="flex flex-col">
                            <div className="flex  text-[14px]">
                            {"Group lesson; advanced swimmer 2"} 
                            </div>
                            <div className="flex leading-[14px] text-[14px]">
                            <div className="font-bold mr-[4px]">
                            Status:
                            </div>    
                            <div>
                            {"Confirmed"}
                            </div>    
                            </div>
                        </div>
                    </div>
                    </div>

                    <div className="flex flex-col mt-[4px]">
                    <div className="flex items-center space-x-[16px]">

                    <div className="flex w-[22px] py-[12px] justify-center items-center">
                    <LocationIcon/>
                    </div>
                        <div className="flex flex-col">
                            <div className="flex  text-[14px]">
                            {"Banana St"} 
                            </div>
                            <div className="flex leading-[12px] text-[14px]">
                            {"Lane 4"}
                            </div>
                        </div>
                    </div>
                    </div>


                    <div className="flex items-center py-[12px] space-x-[15px] mt-[3px]">

                    <div className="flex w-[22px] justify-center items-center">
                    <NotifIcon/>
                    </div>

                    <div className="flex  text-[14px]">
                    {"1 day before"} 
                    </div>
                    
                    </div>

                    <div className="flex items-center pt-[10px] space-x-[16px]">

                    <div className="flex w-[22px] justify-center items-center">
                    <PeopleIcon/>
                    </div>

                    <div className="flex font-bold text-[14px]">
                    Coach
                    </div>
                    
                    </div>

                    <div className="ml-[7px]">

                    <PersonEntry personInfo={
                        {
                            fullName:"Johny Apr",
                            email:"johnyhasaLAMB@gmail.com",
                            phoneNumber:"+1213421423"
                            }}/>

                    <div className="flex font-bold ml-[32px] text-[14px] mt-[6px] pt-[4px]">
                    Swimmer
                    </div>
                    <PersonEntry personInfo={
                        {
                            fullName:"Johny Apr",
                            email:"johnyhasaLAMB@gmail.com",
                            phoneNumber:"+1213421423"
                            }}/>

                    </div>


                </div>
                    }
                </div>
        </>
    )
}