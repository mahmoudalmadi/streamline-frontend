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

export default function UserProfilePage() {

    const {userInfo
      // loadingNewPage,setLoadingNewPage
      ,user}= useAuth();

    const [loadingNewPage,setLoadingNewPage]=useState(true)

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