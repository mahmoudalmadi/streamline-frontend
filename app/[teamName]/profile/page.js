"use client"

import DynamicScreen from "@/app/components/DynamicScreen";
import ProfileEntryEditor from "@/app/components/TeamProfileEditorComponents/ProfileEntryEditor";
import TopBar from "@/app/components/TopBarComps/TopBar";
import { useState } from "react";
import GoogleAddyEntryEditor from "@/app/components/TeamProfileEditorComponents/GoogleAddressInput";
import SelectingCategories from "@/app/components/TeamProfileEditorComponents/SelectingCategories";
import CONFIG from "@/config";


export default function TeamProfileEditor() {

    const teamName = "Neptunes Swimming Academy"

    const [newTeamName,setNewTeamName] = useState(teamName)
    const [swimTeamDescription, setSwimTeamDescription] = useState("")
    const [googleMapsLink, setGoogleMapsLink] = useState("")
    const [address,setAddress] = useState("")
    const [coords, setCoords] = useState(null)
    const [headCoachName, setHeadCoachName] = useState("")
    const [headCoachBio, setHeadCoachBio] = useState("")

    const [programLevels, setProgramLevels] = useState([
        { level: "", category: "" },
      ]);

    const [programTypes, setProgramTypes] = useState([
    { level: "", category: "" },
    ]);

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

        <div className="font-bold text-streamlineBlue text-[18px]">
            Team Information
        </div>
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

        <div
            className="relative w-full h-[1px] bg-gray-200 mt-[10px]"
          />  

        <div className="font-bold text-streamlineBlue text-[18px] pt-[5px]">
            Location Information
        </div>

        <GoogleAddyEntryEditor
        prompt={"Swim Team Location"}
        response={googleMapsLink}
        setResponse={setGoogleMapsLink}
        placeholder={"Google Maps Link"}
        isLong={false}
        address={address}
        setAddress={setAddress}
        setCoords={setCoords}
        coords={coords}
        />

        <div
            className="relative w-full h-[1px] bg-gray-200 mt-[10px]"
          />  

        <div className="font-bold text-streamlineBlue text-[18px]">
            Programs Offered at This Location
        </div>

        <SelectingCategories categoryTypes={"Program Levels"}
        programs={programLevels}
        setPrograms={setProgramLevels}
        categoryDict={CONFIG.skillLevels}/>

        <SelectingCategories categoryTypes={"Program Class Sizes"}
        programs={programTypes}
        setPrograms={setProgramTypes}
        categoryDict={CONFIG.lessonTypes}/>


        <div className="h-[4px]"/>

        <div
            className="relative w-full h-[1px] bg-gray-200 mt-[15px]"
          />  

        <div className="font-bold text-streamlineBlue text-[18px] pt-[4px]">
            Head Coach Information
        </div>
        
        <ProfileEntryEditor
        prompt={"Head Coach Name"}
        response={headCoachName}
        setResponse={setHeadCoachName}
        placeholder={"Coach Name"}
        isLong={false}
        />

        <ProfileEntryEditor
        prompt={"Head Coach Bio"}
        response={headCoachBio}
        setResponse={setHeadCoachBio}
        placeholder={"Talk about the head coach's experiences, history, fun facts, etc..."}
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