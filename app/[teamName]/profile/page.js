"use client"

import DynamicScreen from "@/app/components/DynamicScreen";
import ProfileEntryEditor from "@/app/components/TeamProfileEditorComponents/ProfileEntryEditor";
import TopBar from "@/app/components/TopBarComps/TopBar";
import { useState } from "react";
import GoogleAddyEntryEditor from "@/app/components/TeamProfileEditorComponents/GoogleAddressInput";
import SelectingCategories from "@/app/components/TeamProfileEditorComponents/SelectingCategories";
import CONFIG from "@/config";
import ImageUploader from "@/app/components/TeamProfileEditorComponents/ImageUploader";
import AmenitiesSelection from "@/app/components/TeamProfileEditorComponents/AmentitiesSelection";
import DaysHoursOperations from "@/app/components/TeamProfileEditorComponents/DaysHoursOperation";
import { useSearchParams } from "next/navigation";

export default function TeamProfileEditor() {

    const searchParams = useSearchParams();
    const phoneNumber = searchParams.get("phoneNumber");
    const emailAddress = searchParams.get("emailAddress");
    const fullName = searchParams.get("fullName");

    const teamName = "Neptunes Swimming Academy"
    const [coachImg, setCoachImg] = useState([]);
    const [logoImg, setLogoImg] = useState([]);
    const [locationImgs, setLocationImgs] = useState([]);
    const [selectedAmenities, setSelectedAmenities] = useState([])

    const [newTeamName,setNewTeamName] = useState(teamName)
    const [swimTeamDescription, setSwimTeamDescription] = useState("")
    const [googleMapsLink, setGoogleMapsLink] = useState("")
    const [address,setAddress] = useState("")
    const [coords, setCoords] = useState(null)
    const [headCoachName, setHeadCoachName] = useState("")
    const [headCoachBio, setHeadCoachBio] = useState("")
    const [province, setProvince] = useState("")
    const [city, setCity] = useState("")

    const [programLevels, setProgramLevels] = useState([
        { level: "", category: "" },
      ]);

    const [programTypes, setProgramTypes] = useState([
    { level: "", category: "" },
    ]);

    const [daysOfWeek,setDaysOfWeek] = useState(CONFIG.daysOfWeek);
    const [timesOfDay,setTimesOfDay] = useState(CONFIG.timesOfDay);

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

        <div className="mt-[10px] space-y-[15px]">

        <div className="font-bold text-streamlineBlue text-[18px] mt-[16px]">
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
        <ImageUploader allowMultiple={false} images={logoImg} setImages={setLogoImg}
        buttonMessage={
            logoImg.length!=0?"Replace Team Logo Image":"Upload Team Logo Image"}/>

        <div
        className="h-[8px]"
        />
        <div
            className="relative w-full h-[1px] bg-gray-200 mt-[10px]"
          />  
        <div
        className="h-[1px]"
        />
        <div className="font-bold text-streamlineBlue text-[18px] pt-[15px]">
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
        city={city}
        setCity={setCity}
        province={province}
        setProvince={setProvince}
        />

        <ImageUploader allowMultiple={true} images={locationImgs} setImages={setLocationImgs}
        buttonMessage={
        logoImg.length===0?"Upload Location Photos":"Add Location Photos"}/>

        <AmenitiesSelection 
        selectedAmenities={selectedAmenities}
        setSelectedAmenities={setSelectedAmenities}
        amenitiesIcons={CONFIG.amenitiesIcons}/>

        <div
        className="h-[8px]"
        />
        <div
            className="relative w-full h-[1px] bg-gray-200 mt-[10px]"
          />  

        <div
        className="h-[8px]"
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

        <DaysHoursOperations daysOfWeek={daysOfWeek} setDaysOfWeek={setDaysOfWeek}
        timesOfDay={timesOfDay} setTimesOfDay={setTimesOfDay}/>

        <div className="h-[6px]"/>

        <div
            className="relative w-full h-[1px] bg-gray-200 mt-[15px]"
          />  
        <div className="h-[6px]"/>

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

        <ImageUploader allowMultiple={false} images={coachImg} setImages={setCoachImg}
        buttonMessage={
            coachImg.length!=0?"Replace Head Coach Photo":"Upload Head Coach Photo"}/>

        </div>

        <div>

        </div>


        </div>
        </div>
        </DynamicScreen>
        </div>
    )
}