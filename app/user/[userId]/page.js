"use client";

import DynamicScreen from "@/app/components/DynamicScreen";
import TopBar from "@/app/components/TopBarComps/TopBar";
import { useAuth } from "@/app/contexts/AuthContext";
import { useContext } from "react";
import LoadingScreen from "@/app/components/loadingScreen";

export default function UserProfile(){

    const {user, userInfo} = useAuth()

      // Show a loading state if userInfo is not yet loaded
    if (!userInfo) return(
        <LoadingScreen loadingMessage={"Loading user profile..."}/>
    )


    return(
        <div className="flex justify-center items-center h-full">
      <DynamicScreen className=" h-full">

        <TopBar/>

        <div
        className="relative flex flex-col items-center justify-center w-full"
        >
        <div
            className="relative w-screen h-[1px] bg-gray-200 mt-[18px]"
          />  

        <div className="flex flex-col w-full">

        <div className="text-[18px]
        font-bold items-start mt-[20px] mb-[15px] leading-[18px]">
          {userInfo.userData.fullName}'s Profile
        </div>

        <div
            className="relative w-full h-[1px] bg-gray-200 mt-[5px]"
          />  


        </div>
        </div>
        </DynamicScreen>
        </div>
    )
}