"use client";

import { useState,useEffect } from "react";
import { useAuth } from "@/app/contexts/AuthContext"
import TopBar from "../TopBarComps/TopBar"
import { useRouter } from "next/navigation";

export default function TeamDashHeader({selectedPage,setIsLoading}){

    const {userInfo} = useAuth()
    const router = useRouter();
    const [teamName, setTeamName] =useState("");
    const [teamLogo, setTeamLogo] =useState("");
    useEffect(()=>{
        if (userInfo.teamInfo){
            setTeamName(userInfo.teamInfo.teamName)
            setTeamLogo(userInfo.teamInfo.logoPhotoURL)
        }
    },[userInfo])

    return(

        <>
        <TopBar/>
            <div
                className="relative z-0 w-[2000px] left-[-100px] h-[1px] bg-gray-200 mt-[18px]"
            />

            
            <div className="flex space-x-[20px] h-[104px]">
                {teamLogo.length>0 ?
                <div className="flex items-center space-x-[20px]">
                    <img
                    src={teamLogo}
                    className='h-[90px] py-[8px]'
                    />
                    <div className="font-bold text-streamlineBlue text-[20px]">
                        {teamName}
                    </div>        
                </div> :
                <>
                </>}
            </div>

            <div className="flex space-x-[12px] items-center">


            <div className={selectedPage==="dashboard" ? `text-[18px] font-bold` :`text-[18px] font-bold text-gray-400 cursor-pointer`}
            onClick={()=>{
                if(userInfo.userData.accountType==="team")
                {
                    setIsLoading(true)
                    router.push(`/${teamName.replace(/\s+/g, '').toLowerCase()}/dashboard`)
                }else{
                    router.push(`/user/${userInfo.userData.firebaseId}/dashboard`)
                }}}>
                Dashboard
            </div>
            <div className="font-bold text-streamlineBlue text-[20px] mb-[5px]">
                |
            </div>
            <div className={selectedPage==="profile" ? `text-[18px] font-bold` :`cursor-pointer text-[18px] font-bold text-gray-400`}
            onClick={()=>{
                if(userInfo.userData.accountType==="team")
                {
                    setIsLoading(true)
                    router.push(`/${teamName.replace(/\s+/g, '').toLowerCase()}/profile`)
                }else{
                    router.push(`/user/${userInfo.userData.firebaseId}/profile`)
                }}}>
                Profile
            </div>
            </div>
            <div className="w-full h-[1px] bg-gray-200 mt-[5px] mb-[20px]"/>
        </>

    )
}