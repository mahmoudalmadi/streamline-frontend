"use client"

import DynamicScreen from "@/app/components/DynamicScreen";
import ProfileEntryEditor from "@/app/components/TeamProfileEditorComponents/ProfileEntryEditor";
import TopBar from "@/app/components/TopBarComps/TopBar";
import { useState } from "react";


export default function TeamProfileEditor() {

    const teamName = "Neptunes Swimming Academy"

    const [newTeamName,setNewTeamName] = useState(teamName)
    const [swimTeamDescription, setSwimTeamDescription] = useState("")

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
          {teamName} Profile
        </div>

        <div
            className="relative w-full h-[1px] bg-gray-200 mt-[5px]"
          />  

        <div className="mt-[10px] space-y-[10px]">
        <ProfileEntryEditor
        prompt={"Team Name"}
        response={newTeamName}
        setResponse={setNewTeamName}
        placeholder={"Team Name"}
        isLong={false}
        />
        <ProfileEntryEditor
        prompt={"Swim Team Description"}
        response={swimTeamDescription}
        setResponse={setSwimTeamDescription}
        placeholder={"Talk about your swim team's culture, offerings, history, staff etc..."}
        isLong={true}
        />

        </div>

        <div>

        </div>


        </div>
        </div>
        </DynamicScreen>
        </div>
    )
}