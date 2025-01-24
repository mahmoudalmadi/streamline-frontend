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
import { getEntriesByMatching } from "@/app/hooks/firestoreHooks/retrieving/getEntriesByMatching";
import { transformImagesListToJsons } from "@/app/hooks/firestoreHooks/retrieving/adjustingRetrievedData";
import { parseAddress } from "@/app/hooks/addressExtraction";
import "react-big-calendar/lib/css/react-big-calendar.css";
import getXWeeksData from "@/app/hooks/calendarHooks/getWeeksData";

// import ClubScheduler from "@/app/components/TeamDashboard/ScheduleComps/Schedule";

export default function TeamDashboard() {

    const {userInfo}= useAuth();
    const [locations, setLocations] = useState([{
        address:"Banana St, Dallas, TX"
    }])
    const [locationInfo,setLocationInfo]=useState([])
    const [allParsedAddresess,setAllParsedAddresses]=useState([])
    const [currentLocation,setCurrentLocation]=useState([])
    const [location, setLocation] = useState(locations[0]["address"]) 

    const availableColor = CONFIG.calendar.blockColors.available
    const pendingColor = CONFIG.calendar.blockColors.pending
    const confirmedColor = CONFIG.calendar.blockColors.confirmed

    const statuses = [{"Availability":availableColor},{"Pending Approval":pendingColor},{"Confirmed Lesson":confirmedColor}]

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
    const [retrievedCoaches,setRetrievedCoaches] = useState(null)

    const [xWeeks,setXWeeks]=useState(3)
    const [currWeekNum,setCurrWeekNum]=useState(null)

    const [currWeekEvents,setCurrWeekEvents] = useState(null)

    function getMinMaxHours(data) {
        if (!data || data.length === 0) {
          throw new Error("The input list is empty or invalid.");
        }
      
        const hours = data.map(item => item.hour);
      
        const minHour = Math.min(...hours);
        const maxHour = Math.max(...hours);
      
        return {
          minHour,
          maxHour
        };
      }
      

    function filterItemsByWeekAndStatus(items) {
        const now = new Date();
        
        // Calculate the start of the current week (Sunday at 12:00 AM)
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay()); // Adjust to the most recent Sunday
        startOfWeek.setHours(0, 0, 0, 0); // Set time to 12:00 AM
      
        // Calculate the end of the current week (Saturday at 11:59:59 PM)
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Move to Saturday
        endOfWeek.setHours(23, 59, 59, 999); // Set time to 11:59:59 PM
      
        // Filter the list
        return items.filter(item => {
          const startDate = new Date(item.start); // Parse the `start` date
          return (
            startDate >= startOfWeek &&
            startDate <= endOfWeek &&
            item.status.toLowerCase() !== "available"
          );
        });
      }    

    const [events,setEvents] = useState(null);
    const [currDay,setCurrDay]=useState(new Date())
    const [isCalendarLoading,setIsCalendarLoading]=useState(true)
    useEffect(()=>{

        const updateCal = async() => {
            setIsCalendarLoading(true)
            const newDate = new Date(currDay)
            newDate.setDate(currDay.getDate()+currWeekNum*7)
            const weekEvents = await getXWeeksData({locationId:currentLocation.id,x:xWeeks,currDay:newDate})
            setCurrWeekEvents(filterItemsByWeekAndStatus(weekEvents))
            setEvents(weekEvents)
            setCurrWeekNum(0)
            setCurrDay(newDate)
            setIsCalendarLoading(false)
        }
        
        if (Math.abs(currWeekNum)>xWeeks){
            
            updateCal()
        }else
        if (events) {
            setCurrWeekEvents(filterItemsByWeekAndStatus(events))
        }
    },[currWeekNum])

    useEffect(()=>{
        triggerTimeRef.current = Date.now(); // Set trigger time

        // Start an interval to check elapsed time
        intervalRef.current = setInterval(async() => {
                const elapsed = Date.now() - triggerTimeRef.current;

                console.log(`Elapsed time: ${elapsed}ms`);
                if(userInfo.teamInfo){
        
                    await getLocationInfo()
                    clearInterval(intervalRef.current); // Break the interval
                }

                if (elapsed >= 3500) {
                    window.location.reload()
                }
        }, 1000); // Check every second
        // Cleanup on unmount
        return () => clearInterval(intervalRef.current);

        async function getLocationInfo() {
      
            const locationsInfo = await getEntriesByMatching({
              collectionName: "Location",
              fields: { teamId: userInfo.teamInfo.id },
            });
            
            const firestoreCoaches = await getEntriesByMatching({
                collectionName:'Coach',
                fields:{teamId: userInfo.teamInfo.id}
            })

            setRetrievedCoaches(firestoreCoaches)

            const parsedAddresses = []
            const retrievedLocations = {}
            for (const location of locationsInfo) {
              const firestoreLocationImages = await getEntriesByMatching({
                collectionName: "Images",
                fields: {
                  teamId: userInfo.teamInfo.id,
                  locationId: location.id,
                  photoType: "location",
                },
              });
              const firestoreLocationHours = await getEntriesByMatching({
                collectionName: "OperationDayTime",
                fields: {
                  locationId: location.id,
                },
              });

              const transformData = (data) => {
                return data.map(({ category, level }) => ({ [level]: category }));
              };

              const firestoreLocationLessonTypes = await getEntriesByMatching({
                collectionName: "LessonType",
                fields: {
                  locationId: location.id,
                },
              });

              const locationLessonTypes = transformData(firestoreLocationLessonTypes)

              const firestoreLocationLessonSkills = await getEntriesByMatching({
                collectionName: "SkillLevel",
                fields: {
                  locationId: location.id,
                },
              });
              
              const locationLessonSkills = transformData(firestoreLocationLessonSkills)
              
              const formattedLocationImages = transformImagesListToJsons({list:firestoreLocationImages})
              
              const extractKeys = (data) => data.map(Object.keys).flat();
              
              location.images = formattedLocationImages
              location.skillLevels = extractKeys(locationLessonSkills)
              location.lessonTypes = extractKeys(locationLessonTypes)

              const {minHour,maxHour} = getMinMaxHours(firestoreLocationHours)
              
              const parsedAddress = parseAddress({address:location.address})
              parsedAddresses.push(parsedAddress)
              location.parsedAddress = parsedAddress
              location.maxHour = maxHour
              location.minHour = minHour

              retrievedLocations[parsedAddress.streetAddress]=location
            }

            
            const weekEvents = await getXWeeksData({locationId:locationsInfo[0].id,x:xWeeks,currDay:currDay})

            setCurrWeekEvents(filterItemsByWeekAndStatus(weekEvents))
            setEvents(weekEvents)
            setCurrentLocation(locationsInfo[0])
            setLocationInfo(retrievedLocations)
            setAllParsedAddresses(parsedAddresses)
            setIsCalendarLoading(false)
            setIsLoading(false);
          }

    },[userInfo])

    const [pickedEvent, setPickedEvent] = useState(null);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);

    const openEventModal = () => {setIsEventModalOpen(true)};
    const closeEventModal = () => setIsEventModalOpen(false);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    
    const [addAvailibilityModalKey,setAddAvailibilityModalKey]=useState(0)
    const openAddModal = () => {setIsAddModalOpen(true)};
    const closeAddModal = () => {setIsAddModalOpen(false),setAddAvailibilityModalKey(1+addAvailibilityModalKey)};

    const parentDivRef = useRef(null)

    const [selectedPage,setSelectedPage]=useState("dashboard")

    return(

        <div className="flex flex-col no-scroll overflow-x-hidden justify-center items-center"
        style={{overflow:isEventModalOpen||isAddModalOpen?'hidden':''}}>
      <DynamicScreen className={`${isEventModalOpen||isAddModalOpen?"no-scroll":"no-scroll"}`} style={{overflow:isEventModalOpen||isAddModalOpen?'hidden':''}}>


            <div className="flex flex-col no-scroll" style={{overflow:isEventModalOpen||isAddModalOpen?'hidden':''}}>
            <TeamDashHeader selectedPage={"dashboard"} setSelectedPage={setSelectedPage} setIsLoading={setIsLoading}/>
            {  isLoading?
            <div className="items-center">
                <LoadingSubScreen loadingMessage={"Loading team "+selectedPage}/>
            </div>
            :
            <div className="flex flex-col flex-grow">
            <div className="flex justify-between items-center">
                <div className="flex  space-x-[5px] border border-gray-200 rounded-full shadow-[0_5px_6px_rgba(0,0,0,0.1)] py-[8px] px-[16px] items-center">
                    <div className="font-bold">
                        Location:
                    </div>
                    <div>
                        {currentLocation.parsedAddress.streetAddress}
                    </div>
                    {
                        Object.keys(locationInfo).length>1 &&
                        <div className="text-streamlineBlue font-bold pl-[7px] text-[12px] cursor-pointer">
                            Change
                        </div>
                    }

                </div>                
            </div>

         
            <div className="w-full mt-[20px]">
                <div className="">
                    <MyCalendar loading events={events} setPickedEvent={setPickedEvent} openEventModal={openEventModal} setCurrWeekNum={setCurrWeekNum} isCalendarLoading={isCalendarLoading} setIsCalendarLoading={setIsCalendarLoading} currWeekNum={currWeekNum} minHour={currentLocation.minHour} maxHour={currentLocation.maxHour}/>
                </div>
            </div>

            <ModalTemplate isOpen={isEventModalOpen} onClose={closeEventModal}>
                <EventModal pickedEvent={pickedEvent} streetAddress={currentLocation.parsedAddress.streetAddress}/>
            </ModalTemplate>

            {/* add Availability modal */}
            <ModalTemplate onClose={closeAddModal} isOpen={isAddModalOpen} parentDivRef={parentDivRef}>
                <AddAvailibilityModal key={addAvailibilityModalKey}  parentDivRef={parentDivRef} lessonTypes={currentLocation.lessonTypes} lessonSkills={currentLocation.skillLevels} addAvailibilityModalKey={addAvailibilityModalKey} setAddAvailibilityModalKey={setAddAvailibilityModalKey} onClose={closeAddModal} teamId={userInfo.teamInfo.id} 
                retrievedCoaches={retrievedCoaches} locationId={currentLocation.id} events={events} setEvents={setEvents}/>
            </ModalTemplate>

            <div className="flex w-full justify-end">
            <div className="flex space-x-[5px] rounded-full text-white font-bold items-center px-[14px] bg-green-500 py-[8px] mt-[10px] cursor-pointer "
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
            <div className="flex font-bold text-streamlineBlue text-[17px] mt-[10px]">
                Trial lessons this week
            </div>
            <div className="flex w-full h-[1px] bg-gray-200 mt-[5px] mb-[15px]"/>
            <div className="flex w-full mt-[10px] text-[15px]">
                <div className="w-full">
                    <div className="flex p-[3px]">
                        <div className="font-bold  w-[25%] p-[3px]">
                            {CONFIG.athleteType}
                        </div>
                        <div className="font-bold  w-[15%] p-[3px]">
                            Age
                        </div>
                        <div className="font-bold  w-[20%] p-[3px]">
                            Coach
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
                        {currWeekEvents.length===0 ?
                        <div className="w-full p-[20px] items-center h-[150px] flex justify-center font-bold text-gray-400 text-center mt-[30px] text-[16px]">
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