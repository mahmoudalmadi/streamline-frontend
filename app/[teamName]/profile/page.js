"use client";

import DynamicScreen from "@/app/components/DynamicScreen";
import TeamDashHeader from "@/app/components/TeamDashboard/TeamDashHeader";
import TopBar from "@/app/components/TopBarComps/TopBar";
import { useAuth } from "@/app/contexts/AuthContext";
import EmailIcon from '../../../public/emailIcon.svg'

import CONFIG from "@/config";
import { useEffect, useState } from "react";
import LoadingScreen from "@/app/components/loadingScreen";
import LoadingSubScreen from "@/app/components/loadingSubscreen";
import TeamInfoWrapper from "@/app/components/TeamProfileEditorComponents/Wrappers/TeamInfoWrapper";
import SwimClubDescription from "@/app/components/SwimClubDescription";


export default function TeamProfilePage() {

    const [locations, setLocations] = useState([{
        address:"Banana St, Dallas, TX"
    }])
    const {userInfo} = useAuth()

    // TEAMINFO STATES
    const [newTeamName,setNewTeamName] =useState("")
    const [teamDescription,setTeamDescription] = useState("")
    const [teamLogo,setTeamLogo]=useState([])

    const [isLoading,setIsLoading]=useState(true)

    const [enableSaveTeamInfoChanges,setEnableSaveTeamInfoChanges]=useState(false)
    useEffect(()=>{
        if(editingTeamInfo){
            setEnableSaveTeamInfoChanges(true)
        }
    },[newTeamName,teamDescription,teamLogo])

    useEffect(()=>{
        if(userInfo.teamInfo){
            setNewTeamName(userInfo.teamInfo.teamName)
            setTeamDescription(userInfo.teamInfo.teamDescription)
            setTeamLogo([{id:userInfo.teamInfo.logoPhotoURL,url:userInfo.teamInfo.logoPhotoURL}])
            setIsLoading(false)
        }
    },[userInfo])

    const [editingTeamInfo,setEditingTeamInfo]=useState(false)
    const [editingContactInfo,setEditingContactInfo]=useState(false)
    
    return(

        <div className="flex overflow-x-hidden justify-center items-center">
          <DynamicScreen className="h-screen">
            <div className="h-screen">
            <TeamDashHeader selectedPage={"profile"}/>
            {  isLoading?
            <div className="items-center">
                <LoadingSubScreen loadingMessage={"Loading team profile"}/>
            </div>
            :
            <div>
                
                {/* TEAM INFO SECTION */}
                <div>
                <div className="flex items-center justify-between">
                <div className="text-[18px] font-bold text-streamlineBlue">
                    Team Info
                </div>
                {!editingTeamInfo && <div className="mt-[1px] text-[13px] ml-[8px] bg-streamlineBlue text-white font-bold px-[10px] py-[6px] rounded-full cursor-pointer"
                onClick={()=>{setEditingTeamInfo(!editingTeamInfo)}}>
                    Edit team info/logo
                </div>}
                </div>
                {!editingTeamInfo ?
                <div className="space-y-[3px]">
                    <div className="flex items-center space-x-[10px]">
                    <img src={teamLogo[0].url}
                    className="w-[60px]"/>
                    <div className="text-[16px]">{newTeamName}</div>
                    </div>
                    <div className="font-bold text-[16px]">Team description</div>    
                    <SwimClubDescription swimClubDescription={teamDescription}/>  
                    <div>
                    
                    </div>
                </div>:
                <div className="space-y-[8px] mt-[8px]">
                    <TeamInfoWrapper newTeamName={newTeamName} setNewTeamName={setNewTeamName} teamDescription={teamDescription} setTeamDescription={setTeamDescription} logoImg={teamLogo} setLogoImg={setTeamLogo}/>
                    <div className="flex justify-end space-x-[12px] items-center pb-[8px]">
                        <div className="text-streamlineBlue px-[10px]  py-[6px] border border-[1px] border-streamlineBlue text-[14px] rounded-full font-bold cursor-pointer"
                        onClick={()=>{
                            setEditingTeamInfo(!editingTeamInfo)
                        }}
                        >
                            Cancel
                        </div>
                        <div className={`px-[10px] py-[6px] text-[14px] font-bold text-white bg-streamlineBlue rounded-full ${enableSaveTeamInfoChanges?"cursor-pointer":"opacity-50"}`}
                        onClick={()=>{
                            if(enableSaveTeamInfoChanges){
                                console.log("HIIII!!")
                                setEditingTeamInfo(false)
                                setEnableSaveTeamInfoChanges(false)
                            }
                        }}>
                            Save changes
                        </div>        
                    </div>
                </div>
                }
                </div>

                <div className="h-[8px]"/>

                <div className="w-full h-[1px] bg-gray-200 mt-[5px] mb-[18px]"/>

                {/* CONTACT INFO SECTION */}
                <div>
                <div className="flex items-center justify-between">
                <div className="text-[18px] font-bold text-streamlineBlue">
                    Contact Info
                </div>
                <div className="mt-[1px] text-[13px] ml-[8px] bg-streamlineBlue text-white font-bold px-[10px] py-[6px] rounded-full cursor-pointer"
                onClick={()=>{setEditingContactInfo(!editingContactInfo)}}>
                    Edit contact info
                </div>
                </div>
                {!editingContactInfo ?
                <div className="space-y-[3px]">
                    <div className="flex">
                    <div className="flex text-[16px] font-bold">Contact name: 
                    </div>
                    <div className="ml-[4px]">
                    {userInfo.teamInfo.contactName}
                    </div>
                    </div>
                    <div className="flex text-[16px] items-center space-x-[6px]"><EmailIcon/>
                    <div className="mt-[1px] text-[16px]">
                    {userInfo.userData.emailAddress} 
                    </div>
                    </div>
                    <div className="flex text-[16px] items-center space-x-[6px]">
                    <div>
                        <img src="/PhoneIcon.png"
                        className="w-[30px]"
                        />
                    </div>
                    <div className="mt-[1px]">
                    {userInfo.userData.phoneNumber} 
                    </div></div>
                    <div>
                    
                    </div>
                </div>:
                <div>
                    <TeamInfoWrapper />
                </div>
                }
                </div>
            </div>
            }
           
           </div>
            </DynamicScreen>
        </div>


    )
}