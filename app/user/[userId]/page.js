"use client";

import DynamicScreen from "@/app/components/DynamicScreen";
import TeamDashHeader from "@/app/components/TeamDashboard/TeamDashHeader";
import TopBar from "@/app/components/TopBarComps/TopBar";
import { useAuth } from "@/app/contexts/AuthContext";
import EmailIcon from '../../../public/emailIcon.svg'

import CONFIG from "@/config";
import { useEffect, useState,useRef } from "react";
import LoadingScreen from "@/app/components/loadingScreen";
import LoadingSubScreen from "@/app/components/loadingSubscreen";
import TeamInfoWrapper from "@/app/components/TeamProfileEditorComponents/EditorWrappers/TeamInfoWrapper";
import SwimClubDescription from "@/app/components/SwimClubDescription";
import { changeField } from "@/app/hooks/changeField";
import ContactInfoWrapper from "@/app/components/TeamProfileEditorComponents/EditorWrappers/ContactInfoWrapper";
import { editingMatchingEntriesByAllFields } from "@/app/hooks/firestoreHooks/editing/editingEntryByAllFields";
import validateFields from "@/app/hooks/firestoreHooks/validateFields";
import TeamProfileLocationsSection from "@/app/components/TeamProfileEditorComponents/ProfileLocationComps/TeamProfileLocationsSection";
import { getEntriesByMatching } from "@/app/hooks/firestoreHooks/retrieving/getEntriesByMatching";
import { parseAddress } from "@/app/hooks/addressExtraction";
import AmenitiesSection from "@/app/components/TeamPageComps/AmenitiesSection";
import {  transformImagesListToJsons } from "@/app/hooks/firestoreHooks/retrieving/adjustingRetrievedData";
import deleteS3Objects from "@/app/hooks/awsHooks/deleteFromS3";
import { uploadImagesToS3 } from "@/app/hooks/awsHooks/uploadToS3";
import { batchedGetEntriesByConditions } from "@/app/hooks/firestoreHooks/retrieving/batchedGetEntriesByConditions";
import UserDashHeader from "@/app/components/UserProfilePage/UserDashHeader";
import PersonEntry from "@/app/components/TeamDashboard/CalendarComps/PersonEntry";
import { calculateAge } from "@/app/hooks/miscellaneous";
import ViewUserInfo from "@/app/components/UserProfilePage/ViewUserInfo";
import { getEntriesByConditions } from "@/app/hooks/firestoreHooks/retrieving/getEntriesByConditions";
import { useRouter } from "next/navigation";

export default function UserProfilePage() {

    const {userInfo
      // loadingNewPage,setLoadingNewPage
      ,user}= useAuth();

    const [loadingNewPage,setLoadingNewPage]=useState(true)

    const router = useRouter()

    //CONTACT INFO STATES
    const [accountPhoneNumber, setAccountPhoneNumber] = useState({phoneNumber:"", isValid:null})
    const [accountFullname,setAccountFullname]=useState("")
    const [accountEmailAddress,setAccountEmailAddress]=useState("")
    const [otherAthletes,setOtherAthletes]=useState([])
    const [bookingInfo,setBookingInfo]=useState()
    const [allParsedAddresess,setAllParsedAddresses]=useState([])
    const intervalRef = useRef(null);
    const triggerTimeRef = useRef(null);

    useEffect(() => {
        triggerTimeRef.current = Date.now(); // Set trigger time

        // Start an interval to check elapsed time
        intervalRef.current = setInterval(() => {

                const elapsed = Date.now() - triggerTimeRef.current;

                    if (userInfo.userData&&userInfo.otherAthletes) {
                        clearInterval(intervalRef.current); // Break the interval
                        // TEAM INFO
                        
                        // CONTACT INFO
                        changeField({ setDict: setAccountPhoneNumber, field: "phoneNumber", value: userInfo.userData.phoneNumber });
                        changeField({ setDict: setAccountPhoneNumber, field: "isValid", value: true });
                        setAccountEmailAddress(userInfo.userData.emailAddress)
                        setAccountFullname(userInfo.userData.fullName);
                        console.log(userInfo.otherAthletes)
                        
                        setOtherAthletes(userInfo.otherAthletes)
                        getLocationInfo(); // Call after it's defined
                        
                    }
                if (elapsed >= 5000) {
                    window.location.reload()
                }
            
        }, 1000); // Check every second
        // Cleanup on unmount
        return () => clearInterval(intervalRef.current);

      
        // Define the function BEFORE calling it
        async function getLocationInfo() {
      
          const lessonEntries = await getEntriesByMatching({
            collectionName: "LessonBookings",
            fields: { userId: user.uid },
          });

          const lessonIds = new Set()
          const bookingsInfo = {}

          if (lessonEntries.length>0){

            lessonEntries.forEach(async(item)=>{

                if(!lessonIds.has(item.lessonId)){
                  
                  lessonIds.add(item.lessonId)
  
                  const eventInfo = await getEntriesByConditions({collectionName:"TimeBlock",conditions:[{'field':'id',operator:"==",value:item.lessonId}]})

                  const currEvent = eventInfo[0]
  
                  const locoInfo = await batchedGetEntriesByConditions({
                      queriesWithKeys:[{
                          key:`locationInfo`,
                          queryConfig:{
                            collectionName:'Location',
                            conditions:[{'field':"locationId",'operator':'==',value:currEvent.locationId}]
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

                  currentBooking["locationInfo"]=locoInfo.locationInfo
                  currentBooking["skillLevel"]=skillLevelsMapping[eventTypesInfo[0]]
                  currentBooking["lessonType"]=lessonTypesMapping[eventTypesInfo[1]]
                  currentBooking["locationImgs"]=locoInfo.locationImgs
                  currentBooking["teamInfo"]=locoInfo.teamInfo
  
                  bookingsInfo[lessonEntries.id]=currentBooking
                }

            })
          }

          console.log("bookings infooo",bookingsInfo)
          setBookingInfo(bookingsInfo)
          
          setLoadingNewPage(false)
        }
      }, [userInfo]);
      

    const [editingTeamInfo,setEditingTeamInfo]=useState(false)
    const [editingContactInfo,setEditingContactInfo]=useState(false)
    
    const [selectedPage,setSelectedPage]=useState("profile")

    return(

        <div className="flex overflow-x-hidden justify-center items-center w-full">
          <DynamicScreen className="flex min-h-screen w-[98%] md:w-[80%] lg:w-[72%]">
            <div className="min-h-screen">
            <UserDashHeader />
            {  loadingNewPage?
            <div className="items-center">
                <LoadingSubScreen loadingMessage={!loadingNewPage?`Loading your profile`:""}/>
            </div>
            :
            <div>
                
                {/* TEAM INFO SECTION */}

                <div className="h-[8px]"/>

                <ViewUserInfo
                userEmail={accountEmailAddress}
                setUserEmail={setAccountEmailAddress}
                userName={accountFullname}
                setUserName={setAccountFullname}
                userPhone={accountPhoneNumber}
                setUserPhone={setAccountPhoneNumber}
                otherAthletes={otherAthletes}
                setOtherAthletes={setOtherAthletes}
                />

                <div className="w-full h-[1px] bg-gray-200 mt-[30px] mb-[18px]"/>

                {/* CONTACT INFO SECTION */}
                <div className="flex flex-col">
                  <div className="font-bold text-[18px] text-streamlineBlue">
                    Trial lessons 
                  </div>

                  {Object.keys(bookingInfo).map((item,index)=> 
                  
                  <div className="flex w-full justify-center" key={index}>
                  <div className=" py-[20px] px-[20px] border border-gray-300 rounded-xl
                          shadow-[0_0_10px_rgba(0,0,0,0.1)] ">  
                              <div className="flex items-center  mb-[10px] space-x-[4px] items-end">
                                      <img
                                          src={bookingInfo[item].locationImgs[0]}
                                          className=
                                          " w-[140px] h-[140px] rounded-[10px]"
                                      />
                                  <div className="pl-[10px]">
                                  
                                  <div className="font-bold">
                                  {bookingInfo[item].teamInfo.teamName}
                                  </div>

                                  <div className="flex-col leading-1.25 text-[14px] flex">
                                  <div className=" mr-[3px]">Trial lesson, 1 {CONFIG.athleteType.toLowerCase()}
                                  </div>
                                  <div className="flex">
                                  <div className="flex font-bold mr-[3px]">Skill level: </div> {currSelectedSkillLevel}
                                  </div>
                                  <div className="flex">
                                  <div className="flex font-bold mr-[3px]">Lesson type: </div> {currSelectedLessonType}
                                  </div>
                                  </div>

                                  </div>
                              </div>

                          </div>
                  </div>)}

                  {
                    Object.keys(bookingInfo).length==0&&
                    <div className="flex flex-col justify-center">

                      <div className="w-full text-center pt-[45px] text-gray-400 font-bold">
                        You have no reserved trial lessons
                      </div>      

                      <div className="flex justify-center">
                        <div className=" text-center mt-[25px] rounded-full px-[16px] py-[8px] text-white bg-streamlineBlue cursor-pointer font-bold" onClick={()=>{router.push('/'); setLoadingNewPage(true)}}>
                          Find your perfect swim club!
                        </div>      
                      </div>      

                    </div>
                  }


                </div>
                {/* LOCATION SECTION */}

            </div>
            }
           
           </div>
            </DynamicScreen>
         </div>


    )
}