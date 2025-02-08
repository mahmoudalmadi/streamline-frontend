"use client";

import DynamicScreen from "@/app/components/DynamicScreen";
import TeamDashHeader from "@/app/components/TeamDashboard/TeamDashHeader";
import TopBar from "@/app/components/TopBarComps/TopBar";
import { useAuth } from "@/app/contexts/AuthContext";
import EmailIcon from '../../../../public/emailIcon.svg'

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

export default function UserProfilePage() {

    const {userInfo,loadingNewPage,setLoadingNewPage,user}= useAuth();

    //CONTACT INFO STATES
    const [phoneNumberObj, setPhoneNumberObj] = useState({phoneNumber:"", isValid:null})
    const [emailAddress,setEmailAddress]= useState("")
    const [contactName,setContactName]=useState("")

    const [locationInfo, setLocationInfo] = useState([])
    const [allParsedAddresess,setAllParsedAddresses]=useState([])
    const intervalRef = useRef(null);
    const triggerTimeRef = useRef(null);

    useEffect(() => {
        triggerTimeRef.current = Date.now(); // Set trigger time

        // Start an interval to check elapsed time
        intervalRef.current = setInterval(() => {

                const elapsed = Date.now() - triggerTimeRef.current;

                    if (userInfo.otherAthletes) {
                        clearInterval(intervalRef.current); // Break the interval
                        // TEAM INFO
                        setNewTeamName(userInfo.teamInfo.teamName);
                        setTeamDescription(userInfo.teamInfo.teamDescription);
                        setTeamLogo([{ id: userInfo.teamInfo.logoPhotoURL, url: userInfo.teamInfo.logoPhotoURL }]);
                        
                        // CONTACT INFO
                        changeField({ setDict: setPhoneNumberObj, field: "phoneNumber", value: userInfo.teamInfo.phoneNumber });
                        changeField({ setDict: setPhoneNumberObj, field: "isValid", value: true });
                        setEmailAddress(userInfo.teamInfo.contactEmail);
                        setContactName(userInfo.teamInfo.contactName);
                        
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



            })
          }


          setLocationInfo(locationsInfo)
          setAllParsedAddresses(parsedAddresses)
          
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
            {/* <UserDashHeader /> */}
            {  loadingNewPage?
            <div className="items-center">
                <LoadingSubScreen loadingMessage={!loadingNewPage?`Loading your profile`:""}/>
            </div>
            :
            <div>
                
                {/* TEAM INFO SECTION */}

                <div className="h-[8px]"/>

                <div className="w-full h-[1px] bg-gray-200 mt-[5px] mb-[18px]"/>

                {/* CONTACT INFO SECTION */}
                <div>
                <div>

                    <div className="font-bold text-[16px] pt-[8px]">Address</div>    
                    <div className="flex-col">
                    <div className="leading-[16px] mt-[4px]">{parsedAddress?.streetAddress || "Unknown St Address"}</div>
                    <div className="flex">
                    <div>{parsedAddress?.city || "Unknown City"}</div><div>, {parsedAddress?.state || "Unknown State"}</div><div>, {parsedAddress?.postalCode || "Unknown Postal Code"}</div><div>, {parsedAddress?.country || "Unknown Country"}</div>
                        </div>
                    </div>

                    <div className="font-bold text-[16px] pt-[8px]">Location Contact Info</div>    
                    <div className="space-y-[4px] mt-[5px]">
                    <div className="flex">
                    <div className="flex text-[16px]">Contact person: 
                    </div>
                    <div className="ml-[4px]">
                    {locationContactName}
                    </div>
                    </div>
                    <div className="flex text-[16px] items-center space-x-[6px]"><EmailIcon/>
                    <div className="mt-[1px] text-[16px]">
                    {locationContactEmail} 
                    </div>
                    </div>
                    <div className="flex text-[16px] items-center space-x-[6px]">
                    <div>
                        <img src="/PhoneIcon.png"
                        className="w-[30px]"
                        />
                    </div>
                    <div className="mt-[1px]">
                    {locationContactNumber} 
                    </div></div>
                    <div>
                    
                    </div>
                    </div>

                    <div className="font-bold text-[16px] pt-[8px]">Location Images</div>    
                    <div className="flex flex-wrap gap-[20px] py-[4px] mb-[4px]">
                    {locationImages.map((image, index) => (
                
                    
                  
                    <div
                      className="relative"
                    >
                      {/* Badge with Number */}

                      
                        <div
                        style={{
                          position: "absolute",
                          top: "5px",
                          left: "5px",
                          backgroundColor: "rgba(0, 0, 0, 0.7)",
                          color: "white",
                          borderRadius: "50%",
                          width: "20px",
                          height: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        {index + 1}
                      </div>

                      {/* Image Preview */}
                      <img
                        src={image.url}
                        alt={`uploaded-${index}`}
                        style={{
                          width: "120px",
                          height: "auto",
                          objectFit: "contain",
                          borderRadius: "5px",
                        }}
                      />

                    </div>
                  )
                
                     )}
                    </div>

                    <div className="font-bold text-[16px] pt-[8px]">Amenities</div>  
                    <div>
                    <AmenitiesSection amenities={amenitiesList} withoutHeader={true}/>
                    </div>

        </div>
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