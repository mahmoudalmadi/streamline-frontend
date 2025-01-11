"use client";

import DynamicScreen from "@/app/components/DynamicScreen";
import TeamDashHeader from "@/app/components/TeamDashboard/TeamDashHeader";
import TopBar from "@/app/components/TopBarComps/TopBar";
import { useAuth } from "@/app/contexts/AuthContext";
import CONFIG from "@/config";
import { useState, useEffect, useRef } from "react";
import LoadingSubScreen from "@/app/components/loadingSubscreen";
import MyCalendar from "@/app/components/TeamDashboard/CalendarComps/Calendar";
import ModalTemplate from "@/app/components/ModalTemplate";
import EventModalContent from "@/app/components/TeamDashboard/CalendarComps/EventModalContent";
import InfoIcon from "../../../public/InfoIcon.svg"
import LocationIcon from "../../../public/LocationIcon.svg"
import NotifIcon  from "../../../public/NotifIcon.svg"
import PeopleIcon  from "../../../public/PeopleIcon.svg"
import ClockIcon  from "../../../public/ClockIcon.svg"
import CalendarIcon  from "../../../public/CalendarIcon.svg"
import PersonEntry from "@/app/components/TeamDashboard/CalendarComps/PersonEntry";
import EventModal from "@/app/components/TeamDashboard/CalendarComps/EventModal";
import AddAvailibilityModal from "@/app/components/TeamDashboard/CalendarComps/AddAvailabilityModal";

// import ClubScheduler from "@/app/components/TeamDashboard/ScheduleComps/Schedule";

export default function TeamDashboard() {

    const {userInfo}= useAuth();
    const [locations, setLocations] = useState([{
        address:"Banana St, Dallas, TX"
    }])
    const [location, setLocation] = useState(locations[0]["address"]) 
    const [weeklyTrialLessons, setWeeklyTrialLessons] = useState([
        {
            name:"Mahmoud Al-Madi",
            age:"15 yo",
            lessonType:"Gold, Intermediate",
            dateTime:"Jan 22nd, 8:30 AM",
            status:"Pending"
        },    
        {
            name:"Mahmoud Al-Madi",
            age:"15 yo",
            lessonType:"Gold, Intermediate",
            dateTime:"Jan 22nd, 8:30 AM",
            status:"Confirmed"
        },
        {
            name:"Mahmoud Al-Madi",
            age:"15 yo",
            lessonType:"Gold, Intermediate",
            dateTime:"Jan 22nd, 8:30 AM",
            status:"Cancelled"
        }
    ])

    const triggerTimeRef = useRef(null); // Use a ref instead of state
    const intervalRef = useRef(null);
    const timesOfDay = CONFIG.timesOfDay
    const [isLoading,setIsLoading]=useState(true)

    useEffect(()=>{
        triggerTimeRef.current = Date.now(); // Set trigger time

        // Start an interval to check elapsed time
        intervalRef.current = setInterval(() => {
                const elapsed = Date.now() - triggerTimeRef.current;

                console.log(`Elapsed time: ${elapsed}ms`);
                if(userInfo.teamInfo){
        
                    setIsLoading(false)
                    clearInterval(intervalRef.current); // Break the interval
                }

                if (elapsed >= 3500) {
                    window.location.reload()
                }
        }, 1000); // Check every second
        // Cleanup on unmount
        return () => clearInterval(intervalRef.current);

    },[userInfo])

    const events = [
        {
          title: "Meeting with Team",
          start: new Date(2025, 0, 7, 10, 0, 0), // February 2nd, 10:00 AM
          end: new Date(2025, 0, 7, 11, 0, 0),   // February 2nd, 11:00 AM
        },
        {
          title: "Lunch Breakss",
          start: new Date(2025, 0, 9, 12, 30, 0), // February 2nd, 12:30 PM
          end: new Date(2025, 0, 9, 13, 30, 0),   // February 2nd, 1:30 PM
        },
        {
            title: "Lunch Breaktt",
            start: new Date(2025, 0, 9, 12, 30, 0), // February 2nd, 12:30 PM
            end: new Date(2025, 0, 9, 13, 30, 0),   // February 2nd, 1:30 PM
          },
          {
            title: "Lunch Break",
            start: new Date(2025, 0, 9, 12, 30, 0), // February 2nd, 12:30 PM
            end: new Date(2025, 0, 9, 13, 30, 0),   // February 2nd, 1:30 PM
          },
      ];
      
    const [pickedEvent, setPickedEvent] = useState(null);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);

    const openEventModal = () => {setIsEventModalOpen(true)};
    const closeEventModal = () => setIsEventModalOpen(false);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const openAddModal = () => {setIsAddModalOpen(true)};
    const closeAddModal = () => setIsAddModalOpen(false);

    return(

        <div className="flex flex-col overflow-x-hidden justify-center items-center"
        style={{overflow:isEventModalOpen||isAddModalOpen?'hidden':''}}>
      <DynamicScreen className="" style={{overflow:isEventModalOpen||isAddModalOpen?'hidden':''}}>


            <div className="flex flex-col" style={{overflow:isEventModalOpen||isAddModalOpen?'hidden':''}}>
            <TeamDashHeader selectedPage={"dashboard"}/>
            {  isLoading?
            <div className="items-center">
                <LoadingSubScreen loadingMessage={"Loading team dashboard"}/>
            </div>
            :
            <div className="flex flex-col flex-grow">
            <div className="flex justify-between items-center">
                <div className="flex  space-x-[5px] border border-gray-200 rounded-full shadow-[0_5px_6px_rgba(0,0,0,0.1)] py-[8px] px-[16px] items-center">
                    <div className="font-bold">
                        Location:
                    </div>
                    <div>
                        {location.split(",")[0]}
                    </div>
                    {
                        locations.length>0 &&
                        <div className="text-streamlineBlue font-bold pl-[7px] text-[12px] cursor-pointer">
                            Change
                        </div>
                    }

                </div>                
            </div>

         
            <div className="w-full mt-[20px]">
                <div className="">
                    <MyCalendar events={events} setPickedEvent={setPickedEvent} openEventModal={openEventModal}/>
                </div>
            </div>

            <ModalTemplate isOpen={isEventModalOpen} onClose={closeEventModal}>
                <EventModal pickedEvent={pickedEvent}/>
            </ModalTemplate>

            {/* add Availability modal */}
            <ModalTemplate onClose={closeAddModal} isOpen={isAddModalOpen}>
                <AddAvailibilityModal/>
            </ModalTemplate>

            <div className="flex">
            <div className="flex space-x-[5px] rounded-full text-white font-bold items-center px-[14px] bg-green-500 py-[8px] mt-[10px] cursor-pointer"
            onClick={()=>{openAddModal()}}>
                <div className="text-[15px]">
                +
                </div>
                <div className="text-[15px]">
                Add Availability
                </div>
            </div>
            </div>


            {/* TRIAL LESSONS LIST */}
            <div className="">
            <div className="flex font-bold text-streamlineBlue text-[15px] mt-[10px]">
                Trial lessons this week
            </div>
            <div className="flex w-full h-[1px] bg-gray-200 mt-[5px] mb-[15px]"/>
            <div className="flex w-full mt-[10px] text-[15px]">
                <div className="w-full">
                    <div className="flex p-[3px]">
                        <div className="font-bold  w-[25%] p-[3px]">
                            Name
                        </div>
                        <div className="font-bold  w-[15%] p-[3px]">
                            Age
                        </div>
                        <div className="font-bold  w-[20%] p-[3px]">
                            Lesson
                        </div>
                        <div className="font-bold  w-[20%] p-[3px]">
                            Time
                        </div>
                        <div className="font-bold  w-[90px] flex p-[3px]">
                            Status
                        </div>
                    </div>
                    <div className="w-full h-[0.5px] bg-streamlineBlue mt-[3px] mb-[8px]"/>
                    <div className="flex-col">
                        {weeklyTrialLessons.length===0 ?
                        <div className="w-full p-[20px] flex justify-center font-bold text-gray-400">
                            There are no trial lessons requested or scheduled this week
                        </div>
                        :
                        <>
                        {
                        weeklyTrialLessons.map((item,index) => (
                            <div 
                            key={index}
                            className={`flex items-center w-full rounded-[10px]
                            py-[6px]
                            ${index%2 == 0 ? "bg-gray-100" :""} cursor-pointer
                            hover:bg-gray-200 w-full`}>
                                <div className="w-[25%] p-[5px]">
                                    {item.name}
                                </div>            
                                <div className="w-[15%] p-[5px]">
                                    {item.age}
                                </div>            
                                <div className="w-[20%] p-[5px]">
                                    {item.lessonType}
                                </div>            
                                <div className="w-[20%] p-[5px]">
                                    {item.dateTime}
                                </div>            
                                <div className="w-[90px] flex justify-center items-center">
                                    <div className={`flex  text-white font-bold px-[10px] py-[6px] ${item.status==="Confirmed" ? "bg-green-500" : 
                                    item.status==="Pending" ? "bg-yellow-500" : "bg-red-500"} 
                                    rounded-full`}>
                                    {item.status}
                                    </div>
                                </div>            

                            </div>            
                        ))
                        }
                        </>
                        }
    
                    </div>
                </div>
            </div>
            </div>
            </div>
            }
            </div>
            </DynamicScreen>
            </div>


    )
}