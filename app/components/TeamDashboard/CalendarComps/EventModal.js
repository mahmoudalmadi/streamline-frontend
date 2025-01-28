import CONFIG from "@/config";
import InfoIcon from "../../../../public/InfoIcon.svg"
import LocationIcon from "../../../../public/LocationIcon.svg"
import NotifIcon  from "../../../../public/NotifIcon.svg"
import PeopleIcon  from "../../../../public/PeopleIcon.svg"
import PersonEntry from "@/app/components/TeamDashboard/CalendarComps/PersonEntry";
import { useEffect, useState } from "react";
import { editingMatchingEntriesByAllFields } from "@/app/hooks/firestoreHooks/editing/editingEntryByAllFields";
import { addInfoAsJson } from "@/app/hooks/firestoreHooks/adding/addInfoAsJson";
import { getEntriesByMatching } from "@/app/hooks/firestoreHooks/retrieving/getEntriesByMatching";
import { getEntriesByConditions } from "@/app/hooks/firestoreHooks/retrieving/getEntriesByConditions";
import removeJsonByField, { appendToJsonSubListById, editJsonById } from "@/app/hooks/jsonHooks";
import { deleteMatchingEntriesByAllFields } from "@/app/hooks/firestoreHooks/editing/deleteEntriesByMatchingFields";

export default function EventModal ({pickedEvent,streetAddress,onClose,allEvents,setCurrWeekEvents, setEvents,events,currWeekEvents,setAllEvents}){
    
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

    console.log(currWeekEvents)

    const [rejectedStepOne,setRejectedStepOne] = useState(false)
    const [acceptedStepOne,setAcceptedStepOne] = useState(false)

    const [hasClickedSubmit,setHasClickedSubmit]=useState(false)

    const handleAcceptRequest = async() => {

        console.log(allEvents)
        // await editingMatchingEntriesByAllFields({collectionName:"TimeBlock", matchParams:{"id":pickedEvent.availableSister},updateDate})
        setHasClickedSubmit(true)

        allEvents.forEach(async(item)=>{
            if (item.id == pickedEvent.availableSister){
                console.log("geer",item)
            if (!item.confirmedSister){
                // CREATE NEWLY ACCEPTED EVENT OR CHECK FOR EXISTING CONFIRMED

                const newConfirmedEvent = {
                    coachEmail:pickedEvent.coachEmail,
                    coachName:pickedEvent.coachName,
                    coachPhone:pickedEvent.coachPhone,
                    createdOn:new Date(),
                    day:pickedEvent.day,
                    end:pickedEvent.end,
                    lessonType:pickedEvent.lessonType,
                    locationId:pickedEvent.locationId,
                    reminder:pickedEvent.reminder,
                    start:pickedEvent.start,
                    status:"Confirmed",
                    numberOfAthletes:1,
                    teamId:pickedEvent.teamId,
                    title:pickedEvent.title,
                    availableSister:pickedEvent.availableSister,
                    athletes:pickedEvent.athletes,
                    contact:pickedEvent.contact
                }

                const createdEntryId = await addInfoAsJson({jsonInfo:newConfirmedEvent,collectionName:"TimeBlock"})
                
                const editedAllFields= editJsonById({fieldName:"confirmedSister",fieldValue:createdEntryId,setter:setAllEvents,id:pickedEvent.availableSister,jsonList:allEvents}) 

                await editingMatchingEntriesByAllFields({collectionName:"TimeBlock",matchParams:{id:pickedEvent.availableSister},updateData:{confirmedSister:createdEntryId}})

                await deleteMatchingEntriesByAllFields({collectionName:"TimeBlock",matchParams:{id:pickedEvent.id}})
                
                const updatedAllEvents = removeJsonByField({fieldName:"id",fieldValue:pickedEvent.id,setter:setEvents,jsonList:editedAllFields})
                const updatedEvents = removeJsonByField({fieldName:"id",fieldValue:pickedEvent.id,setter:setEvents,jsonList:events})
                const updatedCurrWeekEvents = removeJsonByField({fieldName:"id",fieldValue:pickedEvent.id,setter:setCurrWeekEvents,jsonList:currWeekEvents})
                
                setAllEvents([...updatedAllEvents,newConfirmedEvent])
                setEvents([...updatedEvents,newConfirmedEvent])
                setCurrWeekEvents([...updatedCurrWeekEvents,newConfirmedEvent])

                onClose()
            }else{

                console.log("we good")
                
                let confirmedSister;
                
                allEvents.forEach(item=>{if(item.availableSister==pickedEvent.availableSister){confirmedSister=item}})

                
                const updatedCurrWeekEvents = appendToJsonSubListById({fieldMappings:{"athletes":pickedEvent.athletes,"contact":pickedEvent.contact,"numberOfAthletes":1},setter:setCurrWeekEvents,jsonList:currWeekEvents,id:confirmedSister.id})
                const updatedEvents = appendToJsonSubListById({fieldMappings:{"athletes":pickedEvent.athletes,"contact":pickedEvent.contact,"numberOfAthletes":1},setter:setEvents,jsonList:events,id:confirmedSister.id})
                const finalizedEvents = removeJsonByField({fieldName:"id",fieldValue:pickedEvent.id,setter:setEvents,jsonList:updatedEvents})
                const finalizedCurrWeekEvents = removeJsonByField({fieldName:"id",fieldValue:pickedEvent.id,setter:setCurrWeekEvents,jsonList:updatedCurrWeekEvents})

                setEvents(finalizedEvents)
                setCurrWeekEvents(finalizedCurrWeekEvents)
                await deleteMatchingEntriesByAllFields({collectionName:"TimeBlock",matchParams:{id:pickedEvent.id}})

                await editingMatchingEntriesByAllFields({collectionName:"TimeBlock", matchParams:{"id":item.confirmedSister},updateData:{athletes:[...confirmedSister.athletes,...pickedEvent.athletes],contact:[...confirmedSister.contact,...pickedEvent.contact],numberOfAthletes:confirmedSister.numberOfAthletes+1}})
                onClose()
            }
            }
        })

    }

    return(
        <>
                <div className="p-[8px]"  style={{
            userSelect: "none", // Prevent text selection
            WebkitUserSelect: "none", // Safari
            MozUserSelect: "none", // Firefox
            msUserSelect: "none",}} >
                    {pickedEvent && 
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
                    {(pickedEvent.numberOfSpots||pickedEvent.numberOfAthletes)&&<div className="flex text-[14px] ml-[38px]">
                    {pickedEvent.numberOfSpots?
                        <>
                        <div className="font-bold mr-[4px]">
                        Spots:
                        </div>    
                        <div>
                        {pickedEvent.numberOfSpots}
                        </div>    
                        </>:
                        <>
                        <div className="font-bold mr-[4px]">
                        Attendees:
                        </div>
                        <div className=" mr-[4px]">
                        {pickedEvent.numberOfAthletes} {CONFIG.athleteType}{pickedEvent.numberOfAthletes>1?"s":""}
                        </div>    
                        </>
                    }
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

                    <div className="ml-[7px] space-y-[14px]">

                    {pickedEvent.coachName&&<PersonEntry personInfo={
                        {
                            fullName:pickedEvent.coachName,
                            email:pickedEvent.coachEmail,
                            phoneNumber:pickedEvent.coachPhone
                            }}/>}

                    {pickedEvent.athletes &&
                    <>
                    {pickedEvent.coachName&&<div className="flex font-bold ml-[32px] text-[14px] mt-[6px] pt-[4px]">
                    {CONFIG.athleteType}{pickedEvent.athletes.length>1?"s":""}
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

                    <div className="leading-[10px] mt-[4px] w-full text-[14px] ml-[73px] mb-[6px]">
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

                    {/* BUTTONS AT THE END */}
                    {pickedEvent.status.toLowerCase()=="pending"&&
                        <div className="flex space-y-[12px] flex-col w-full justify-center items-center mt-[25px]">

                        {
                            (!rejectedStepOne&&!acceptedStepOne)?
                            <>
                            <div className="text-white font-bold py-[8px] text-center w-[240px]    cursor-pointer text-[14px] rounded-full " style={{backgroundColor:CONFIG.calendar.blockColors.confirmed}} onClick={()=>{setAcceptedStepOne(true)}}>
                            Accept trial lesson request
                            </div>
                            <div className="text-white font-bold py-[8px] text-center w-[240px] cursor-pointer text-[14px] rounded-full bg-red-500" onClick={()=>{setRejectedStepOne(true)}}>
                                Reject trial lesson request 
                            </div>        
                            </>:
                            <>
                            {rejectedStepOne?
                             <div className="flex flex-col items-center justify-center text-[14px] w-[270px] mb-[20px]" >
                             <div className="flex leading-[18px] mb-[16px] text-center">
                                 Are you sure you want to reject this trial lesson reservation? The {CONFIG.athleteType.toLowerCase()} will be notified of your response.
                             </div>
                             <div className="flex justify-center items-center space-x-[12px] justify-between w-full px-[12px]">
                                 <div className="py-[6px] px-[10px] text-white font-bold rounded-full cursor-pointer bg-red-500">
                                     Yes, reject trial lesson
                                 </div>

                                 <div className="font-bold   px-[10px] text-streamlineBlue cursor-pointer" onClick={()=>{setRejectedStepOne(false)}}>
                                     No
                                 </div>
                             </div>
                         </div>
                            :
                            <div className="flex flex-col items-center justify-center text-[14px]  mb-[20px]" style={{width:'280px'}}>
                                <div className="flex leading-[18px] mb-[16px] text-center">
                                    Are you sure you want to accept this trial lesson reservation? The {CONFIG.athleteType.toLowerCase()} will be notified of your response.
                                </div>
                                <div className="flex justify-center items-center space-x-[62px]  w-full">
                                    <div className={`py-[6px] px-[10px] text-white font-bold bg-green-500 rounded-full cursor-pointer ${hasClickedSubmit?"opacity-50":""}`} onClick={()=>{handleAcceptRequest()}}>
                                        Yes, accept trial lesson
                                    </div>

                                    <div className="font-bold text-streamlineBlue cursor-pointer" onClick={()=>{setAcceptedStepOne(false)}}>
                                        No
                                    </div>
                                </div>
                            </div>
                            }
                            </>
                        }
                        <div className="font-bold text-streamlineBlue text-[14px] py-[8px] cursor-pointer" onClick={()=>{onClose()}}>
                            Go back to dashboard
                        </div>                
                        
                    </div>        }
                </div>
                    }
                </div>
        </>
    )
}