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

export default function UserProfilePage() {

    const {userInfo,loadingNewPage,setLoadingNewPage,user}= useAuth();

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
      
          const bookingsInfo = await getEntriesByMatching({
            collectionName: "TimeBlock",
            fields: { userId: user.uid },
          });
          
          if (bookingsInfo.length>1){

            bookingsInfo.forEach(async(item)=>{

                const locoInfo = await batchedGetEntriesByConditions({
                    queriesWithKeys:[{
                        key:`locationInfo`,
                        queryConfig:{
                          collectionName:'Location',
                          conditions:[{'field':"locationId",'operator':'==',value:item.locationId}]
                        }
                    },{
                        key:`skillMapping`,
                        queryConfig:{
                          collectionName:'SkillLevel',
                          conditions:[{'field':"locationId",'operator':'==',value:item.locationId}]
                        }
                    },{
                        key:`lessonTypeMapping`,
                        queryConfig:{
                          collectionName:'LessonType',
                          conditions:[{'field':"locationId",'operator':'==',value:item.locationId}]
                        }
                    },{
                        key:`locationImgs`,
                        queryConfig:{
                          collectionName:'Images',
                          conditions:[{'field':"locationId",'operator':'==',value:item.locationId}]
                        }
                    },
                ]
                })

                bookingsInfo["locationInfo"]=locoInfo.locationInfo
                bookingsInfo["skillMapping"]=locoInfo.skillMapping
                bookingsInfo["lessonTypeMapping"]=locoInfo.lessonTypeMapping
                bookingsInfo["locationImgs"]=locoInfo.locationImgs


            })
          }


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

                <div className="w-full h-[1px] bg-gray-200 mt-[5px] mb-[18px]"/>

                <div>

                    <div className="font-bold text-[16px] pt-[8px]">Account Holder Info</div>    
                    <div className="space-y-[4px] mt-[5px]">
                    <div className="flex">
                    <div className="flex text-[16px]">Contact person: 
                    </div>
                    <div className="ml-[4px]">
                    {accountFullname}
                    </div>
                    </div>
                    <div className="flex text-[16px] items-center space-x-[6px]"><EmailIcon/>
                    <div className="mt-[1px] text-[16px]">
                    {accountEmailAddress} 
                    </div>
                    </div>
                    <div className="flex text-[16px] items-center space-x-[6px]">
                    <div>
                        <img src="/PhoneIcon.png"
                        className="w-[30px]"
                        />
                    </div>
                    <div className="mt-[1px]">
                    {accountPhoneNumber.phoneNumber} 
                    </div></div>
                    <div>
                    
                    </div>
                    </div>

                    {(otherAthletes.length>1&&otherAthletes[0]!="nothing")&&<div>
                      <div className="font-bold text-[16px] pt-[8px]">{CONFIG.athleteType}s on this account</div>

                      <div className="flex flex-col space-y-[20px]">
                        {otherAthletes.map((athlete,index)=>(
                          <PersonEntry key={index} noLeftMargin={true} personInfo={{fullName:athlete.fullName,age:calculateAge(athlete.dateOfBirth).toString()}}/>
                        ))}
                      </div>

                    </div>}

                </div>


                {/* CONTACT INFO SECTION */}
                <div>
 
                </div>

                <div className="w-full h-[1px] bg-gray-200 mt-[18px] mb-[18px]"/>

                {/* LOCATION SECTION */}

            </div>
            }
           
           </div>
            </DynamicScreen>
         </div>


    )
}