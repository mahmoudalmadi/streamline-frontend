"use client";

import DynamicScreen from "@/app/components/DynamicScreen";
import ModalTemplate from "@/app/components/ModalTemplate";
import EventModal from "@/app/components/TeamDashboard/CalendarComps/EventModal";
import TopBar from "@/app/components/TopBarComps/TopBar";
import LoadingSubScreen from "@/app/components/loadingSubscreen";
import { useAuth } from "@/app/contexts/AuthContext";
import { changeField } from "@/app/hooks/changeField";
import { addInfoAsJson } from "@/app/hooks/firestoreHooks/adding/addInfoAsJson";
import { deleteMatchingEntriesByAllFields } from "@/app/hooks/firestoreHooks/editing/deleteEntriesByMatchingFields";
import { editingMatchingEntriesByAllFields } from "@/app/hooks/firestoreHooks/editing/editingEntryByAllFields";
import { batchedGetEntriesByConditions } from "@/app/hooks/firestoreHooks/retrieving/batchedGetEntriesByConditions";
import { getEntriesByConditions } from "@/app/hooks/firestoreHooks/retrieving/getEntriesByConditions";
import scheduleMessage from "@/app/hooks/twilio/scheduleMessage";
import sendMessage from "@/app/hooks/twilio/sendMessage";
import CONFIG from "@/config";
import { PathnameContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function AcceptLessonRequestPage(){

    const router = useRouter()
    const {loadingNewPage,setLoadingNewPage,userInfo} = useAuth()
    const [localLoading,setLocalLoading]=useState(true)
    const pathName = usePathname()
    const [requestAlreadyDone,setRequestAlreadyDone]=useState(false)
    const loginQuery = {state:"login"};
    const teamsLoginQuery = new URLSearchParams(loginQuery).toString();

    const [lessonId,setLessonId]=useState(false)
    const [selectedEventId,setSelectedEventId]=useState(null)
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);

    const openEventModal = () => {setIsEventModalOpen(true)};
    const closeEventModal = () => setIsEventModalOpen(false);

    const [bookingInfo,setBookingInfo]=useState({})

    function formatEventTime({startTime, endTime}) {
        // Days of the week and months for formatting
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      
        // Extracting components for the start time
        if(startTime){const startDay = daysOfWeek[startTime.getDay()];
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
        return `${startDay}, ${startMonth} ${startDate} · ${startFormattedTime} –${endFormattedTime}`;}else{
            return ""
        }
    }

    const handleAcceptRequest = async(pickedEvent) => {

            const availableSister = await getEntriesByConditions({collectionName:"TimeBlock",conditions:[{operator:"==",field:"id",value:pickedEvent.availableSister}]})

            if(availableSister.length==1){
            if (!availableSister[0].confirmedSister){
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

                await editingMatchingEntriesByAllFields({collectionName:"LessonBookings",matchParams:{lessonId:pickedEvent.id},updateData:{lessonId:createdEntryId}})

                await editingMatchingEntriesByAllFields({collectionName:"TimeBlock",matchParams:{id:pickedEvent.availableSister},updateData:{confirmedSister:createdEntryId}})

                await deleteMatchingEntriesByAllFields({collectionName:"TimeBlock",matchParams:{id:pickedEvent.id}})
                
            }else{
                
                const confirmedSister = await getEntriesByConditions({collectionName:"TimeBlock",conditions:[{operator:"==",field:"id",value:availableSister[0].confirmedSister}]})

                await editingMatchingEntriesByAllFields({collectionName:"LessonBookings",matchParams:{'lessonId':pickedEvent.id},updateData:{lessonId:availableSister[0].confirmedSister}})
                
                await deleteMatchingEntriesByAllFields({collectionName:"TimeBlock",matchParams:{id:pickedEvent.id}})

                await editingMatchingEntriesByAllFields({collectionName:"TimeBlock", matchParams:{"id":availableSister[0].confirmedSister},updateData:{athletes:[...confirmedSister[0].athletes,...pickedEvent.athletes],contact:[...confirmedSister[0].contact,...pickedEvent.contact],numberOfAthletes:confirmedSister[0].numberOfAthletes+1}})
            }}else{
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

                await editingMatchingEntriesByAllFields({collectionName:"LessonBookings",matchParams:{lessonId:pickedEvent.id},updateData:{lessonId:createdEntryId}})

                await deleteMatchingEntriesByAllFields({collectionName:"TimeBlock",matchParams:{id:pickedEvent.id}})

            }

    }

    function subtractTime(start, amount, unit) {
        const newDate = new Date(start); // Clone the original date
        const now = new Date(); // Get the current time
        
        if (unit === "days") {
          newDate.setDate(newDate.getDate() - amount);
        } else if (unit === "hours") {
          newDate.setHours(newDate.getHours() - amount);
        } else {
          throw new Error("Invalid unit. Use 'days' or 'hours'.");
        }
      
        return newDate < now ? false : newDate;
      }
      
      

    useEffect(()=>{

        async function getLocationInfo(eventInfo) {
      
            const currEvent = eventInfo[0]
            setLessonId(currEvent.id)
            const locoInfo = await batchedGetEntriesByConditions({
                queriesWithKeys:[{
                    key:`locationInfo`,
                    queryConfig:{
                        collectionName:'Location',
                        conditions:[{'field':"id",'operator':'==',value:currEvent.locationId}]
                    }
                },{
                    key:`skillMapping`,
                    queryConfig:{
                        collectionName:'SkillLevel',
                        conditions:[{'field':"locationId",'operator':'==',value:currEvent.locationId}]
                    }
                },{
                    key:`lessonTypeMapping`,
                    queryConfig:{
                        collectionName:'LessonType',
                        conditions:[{'field':"locationId",'operator':'==',value:currEvent.locationId}]
                    }
                },{
                    key:`locationImgs`,
                    queryConfig:{
                        collectionName:'Images',
                        conditions:[{'field':"locationId",'operator':'==',value:currEvent.locationId}]
                    }
                },{
                    key:`teamInfo`,
                    queryConfig:{
                    collectionName:'Team',
                    conditions:[{'field':"id",'operator':'==',value:currEvent.teamId}]
                    }
                }
            ]
            })

            const lessonTypesMapping = {}
            locoInfo.lessonTypeMapping.forEach((itemType)=>{
                lessonTypesMapping[itemType.level]=itemType.category
            })

            const skillLevelsMapping = {}
            locoInfo.skillMapping.forEach((itemSkill)=>{
                skillLevelsMapping[itemSkill.level]=itemSkill.category
            })

            const currentBooking = {}

            const eventTypesInfo = currEvent.lessonType[0].split('`')
            currentBooking["locationInfo"]=locoInfo.locationInfo[0]
            currentBooking["skillLevel"]=skillLevelsMapping[eventTypesInfo[0]]
            currentBooking["lessonType"]=lessonTypesMapping[eventTypesInfo[1]]
            currentBooking["locationImgs"]=locoInfo.locationImgs
            currentBooking["teamInfo"]=locoInfo.teamInfo[0]
            currentBooking['status']="Confirmed"
            currentBooking['athletes']=currEvent.athletes
            currentBooking['eventInfo']=currEvent
            currentBooking['eventId']=currEvent.id
            currentBooking['lessonId']=currEvent.id
            changeField({setDict:setBookingInfo,field:currEvent.id,value:currentBooking})

            const athleteContactNumber = currentBooking.eventInfo.contact[0].phoneNumber

            const reservationDateTime = formatEventTime({startTime:currentBooking.eventInfo.start,endTime:currentBooking.eventInfo.end})
            console.log("EVENT INFO", currentBooking.eventInfo.contact)
            const message = `Hi ${currentBooking.eventInfo.contact[0].fullName}. Your trial lesson with ${currentBooking.teamInfo.teamName} on ${reservationDateTime} has been accepted by Coach ${currentBooking.eventInfo.coachName} (contact: ${currentBooking.eventInfo.coachPhone}). \n\nPlease be sure to arrive at least 10 minutes before your lesson. \n\nLocation address: ${currentBooking.locationInfo.address}. \n\nIf you can no longer attend, please be sure to inform the coach BEFORE the scheduled time.
            `
            const scheduledMessageTime = subtractTime(currentBooking.eventInfo.start,currentBooking.eventInfo.reminder.quantity,currentBooking.eventInfo.reminder.metric)

            console.log(scheduledMessageTime,currentBooking.eventInfo.reminder.quantity,currentBooking.eventInfo.reminder.metric)

            const scheduledAthleteMessage = `Hi ${currentBooking.eventInfo.contact[0].fullName}. This is a courtesy reminder that your trial lesson with ${currentBooking.teamInfo.teamName} on ${reservationDateTime} is coming up soon. Happy Swimming!`;
            const scheduledCoachMessage = `Hi Coach ${currentBooking.eventInfo.coachName}. This is a courtesy reminder that your trial lesson with ${currentBooking.eventInfo.contact[0].fullName} on ${reservationDateTime} is coming up soon. Please reach out to the swimmer if there are any changes in your schedule at your earliest convenience.`

            if(scheduledMessageTime){
                await scheduleMessage(athleteContactNumber,scheduledAthleteMessage,scheduledMessageTime)
                await scheduleMessage(currentBooking.eventInfo.coachPhone,scheduledCoachMessage,scheduledMessageTime)
            }

            // sendMessage(
            //     athleteContactNumber
            //     ,message)
            
        }
          

        const acceptLessonRequest = async(id) => {
            const lessonInfo = await getEntriesByConditions({collectionName:"TimeBlock",conditions:[{field:"id",operator:"==",value:id}]})

            if(lessonInfo.length==1){
                if((lessonInfo[0].status.toLowerCase()!="cancelled") && (lessonInfo[0].status.toLowerCase()!="confirmed")){
                getLocationInfo(lessonInfo)
                // handleAcceptRequest(lessonInfo[0])
                }
                else{
                setRequestAlreadyDone(true)    
                }
            }else{
                setRequestAlreadyDone(true)
            }
        }

        // console.log("PATHNAME",pathName.split('/')[2])
        const lessonId = pathName.split('/')[2]

        acceptLessonRequest(lessonId)

        setLoadingNewPage(false)
        setLocalLoading(false)
    },[])

    return(

        <div>

            <div className="flex  justify-center items-center">
                <DynamicScreen className=" w-[98%]">

                    <div className="flex flex-col min-h-screen ">


                    <TopBar/>

                    <div
                    className="relative z-0 w-full h-[1px] bg-gray-200 mt-[20px]"
                />
                    {loadingNewPage||localLoading?
                    <LoadingSubScreen/>
                    :
                    <div className="mt-[20px]">

                        {

                            requestAlreadyDone?
                            <div className="h-full flex flex-col items-center justify-center">

                                <div className="flex flex-1 h-full text-center mt-[25%] font-bold text-gray-500 text-[18px]">
                                    This trial lesson request has already been resolved. Please go to your team dashboard to view your trial lessons schedule.
                                </div>

                                {(userInfo.userData && userInfo.teamInfo) ?
                                <div className="text-white px-[12px] py-[6px] rounded-full font-bold bg-streamlineBlue text-[15px] mt-[40px] cursor-pointer"
                                onClick={()=>{
                                    setLoadingNewPage(true);
                                    router.push(`/${userInfo.teamInfo.flattenedTeamName}/dashboard`)}}>
                                    Go to dashboard
                                </div>:
                                <div className="text-white px-[12px] py-[6px] rounded-full font-bold bg-streamlineBlue text-[15px] mt-[40px] cursor-pointer"
                                onClick={()=>{
                                    setLoadingNewPage(true);
                                    router.push(`/teams?${teamsLoginQuery}`)}}>
                                    Go to login
                                </div>
                                }


                            </div>
                            :
                            <div>

                                {bookingInfo[lessonId]&&
                                <>
                                <div className="flex flex-1 h-full text-center mt-[30%] font-bold text-gray-500 text-[16px] mb-[15px]">
                                    The following trial lesson request has been confirmed. The swimmer will receive an automatic notification about the confirmation.
                                </div>

                                <div className=" text-center font-bold text-gray-500 text-[16px] mb-[30px]">
                                You will both receive a reminder {bookingInfo[lessonId].eventInfo.reminder.quantity} {bookingInfo[lessonId].eventInfo.reminder.metric} before the lesson. If you'd like the {CONFIG.athleteType.toLowerCase()}'s contact info or view more information on this request, click on the thumbnail below.
                                </div>

                                <div className="flex w-full justify-center" >
                                <div className=" py-[20px] px-[20px] w-[80%] sm:w-[100%] border border-gray-300 rounded-xl
                                        shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-streamlineBlue cursor-pointer transition-shadow duration-300" onClick={()=>{setSelectedEventId(lessonId);openEventModal();}}>  
                                            <div className="flex items-center  mb-[10px] space-x-[4px] items-end">
                                                    <img
                                                        src={bookingInfo[lessonId]?bookingInfo[lessonId].locationImgs[0].imageUrl:""}
                                                        className=
                                                        " w-[140px] h-[140px] rounded-[10px]"
                                                    />
                                                <div className="pl-[10px]">
                                                
                                                <div className="font-bold text-streamlineBlue">
                                                {bookingInfo[lessonId]?bookingInfo[lessonId].teamInfo.teamName:""}
                                                </div>
                                                <div className=" flex  text-[12px] leading-[12px] pb-[4px]">
                                                {formatEventTime({startTime:bookingInfo[lessonId]?bookingInfo[lessonId].eventInfo.start:null,endTime:bookingInfo[lessonId]?bookingInfo[lessonId].eventInfo.end:null})}
                                                </div>

                                                <div className="flex-col leading-1.25 text-[14px] flex">
                                                <div className="flex">
                                                <div className="flex font-bold mr-[3px]">{CONFIG.athleteType}{bookingInfo[lessonId]?(bookingInfo[lessonId].athletes.length>1?"s":""):""}: 
                                                {/* </div> */}
                                                {/* <div className=" mr-[3px]"> */}
                                                {bookingInfo[lessonId].athletes.map((item,index)=>`${index==0?" ":", "}${item.athleteInfo.fullName}`)}
                                                </div>
                                                </div>
                                                <div className="flex">
                                                <div className="flex font-bold mr-[3px]">Skill level: </div> {bookingInfo[lessonId].skillLevel}
                                                </div>
                                                <div className="flex">
                                                <div className="flex font-bold mr-[3px]">Lesson type: </div> {bookingInfo[lessonId].lessonType}
                                                </div>
                                                <div className="flex-col itext-[14px]">
                                                <div className="flex items-center">
                                                    <div className="mr-2 font-bold">Status:</div>
                                                    <div
                                                    className={`font-bold mt-[1px] text-green-500`}
                                                    >
                                                    {bookingInfo[lessonId].status}
                                                    </div>
                                                </div>
                                                </div>
                                                </div>

                                                </div>
                                            </div>

                                        </div>
                                </div>

                                <ModalTemplate isOpen={isEventModalOpen} onClose={closeEventModal}>
                                {selectedEventId&&<EventModal pickedEvent={bookingInfo[selectedEventId].eventInfo} auxiliaryStatus={bookingInfo[selectedEventId].status} athletes={bookingInfo[selectedEventId].athletes} streetAddress={bookingInfo[selectedEventId].locationInfo.address} onClose={closeEventModal}/>}
                                </ModalTemplate>
                                </>
                                }

                            </div>

                        }

                    </div>}

                    </div>
                </DynamicScreen>
            </div>


        </div>

    )
}