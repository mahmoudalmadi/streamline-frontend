"use client"

import DynamicScreen from "@/app/components/DynamicScreen";
import ProfileEntryEditor from "@/app/components/TeamProfileEditorComponents/ProfileEntryEditor";
import TopBar from "@/app/components/TopBarComps/TopBar";
import { useEffect, useRef, useState } from "react";
import GoogleAddyEntryEditor from "@/app/components/TeamProfileEditorComponents/GoogleAddressInput";
import SelectingCategories from "@/app/components/TeamProfileEditorComponents/SelectingCategories";
import CONFIG from "@/config";
import ImageUploader from "@/app/components/TeamProfileEditorComponents/ImageUploader";
import AmenitiesSelection from "@/app/components/TeamProfileEditorComponents/AmentitiesSelection";
import DaysHoursOperations from "@/app/components/TeamProfileEditorComponents/DaysHoursOperation";
import { useSearchParams } from "next/navigation";
import MultiFieldPhoneEntry from "@/app/components/AuthModalComps/MultiFieldPhoneEntry";

export default function TeamProfileEditor() {

    const searchParams = useSearchParams();
    const isSigningUp = searchParams.get("isSigningUp");
    
    const teamName = searchParams.get("teamName");
    const [fullName, setFullName] = useState(searchParams?searchParams.get("fullName"):"")
    const [phoneNumberObj, setPhoneNumberObj] = useState({phoneNumber:searchParams?searchParams.get("phoneNumber"):"", isValid:null})
    const [emailAddress, setEmailAddress] = useState(searchParams?searchParams.get("emailAddress"):"")
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

    const [isDaysSet,setIsDaysSet] = useState(false)
    const [isTimesSet,setIsTimesSet] = useState(false)

    useEffect(()=>{
      for (const day in daysOfWeek){
        if (day.checked){
          setIsDaysSet(true)      
        }
      }
    },[daysOfWeek])
    useEffect(()=>{
      for (const time in timesOfDay){
        if(time.checked){
          setIsTimesSet(true)
        }
      }
    },[timesOfDay])

    const isFirstRender = useRef(true);
    let teamMetadata;
    useEffect(( )=>{
      if (isFirstRender.current){
        console.log("FIRST RENDER BB")
        isFirstRender.current=false;
      }else{
        teamMetadata = {
          teamInfo:{
            teamName:teamName,
            swimTeamDescription:swimTeamDescription,
            logoImg:logoImg
          },
          contactInfo:{
            emailAddress:emailAddress,
            phoneNumber:phoneNumberObj.phoneNumber,
            contactName:fullName
          },
          locationInfo:{
            address:address,
            city:city,
            province:province,
            longitude:coords?coords['long']:null,
            latitude:coords?coords['lat']:null,
            amenities:selectedAmenities,
            locationImgs:locationImgs
          },
          programsOffered:{
            opDays:daysOfWeek,
            opTimes:timesOfDay,
            skillLevels:programLevels,
            programTypes:programTypes,          
          },
          coachInfo:{
            fullName:headCoachName,
            description:headCoachBio,
            coachImg:coachImg
          }
        }
      }

    },[teamName,swimTeamDescription,logoImg,emailAddress,phoneNumberObj,fullName,address,city,province,coords,selectedAmenities,locationImgs,daysOfWeek,timesOfDay,programLevels,programTypes,headCoachName,headCoachBio,coachImg])

    const handleSubmit = () => {
      
      // USE THIS FUNCTION ONLY IF SIGNING UP
      
      // CHECK TO ENSURE NO EMPTY FIELDS

      // ENSURE SIGN UP METHOD IS SUCCESSFULL

      // SEND TO BACKEND

      // ROUTE EM TO THE DASHBOARD

    }

    const handleUpdate = () => {

      // JUST UPDATE THE WHOLE DAMN THING OR AT LEAST BREAK IT DOWN TO COLLECTIONS THAT MATTER POTENTIALLY

    }

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

        {isSigningUp && <div className="text-gray-500 leading-[14px] mb-[20px]">
          Please complete the fields below and submit to complete signing up your team
        </div>}
        <div
            className="relative w-full h-[1px] bg-gray-200 mt-[5px]"
          />  

        <div className="mt-[10px] space-y-[15px]">

        <div className="font-bold text-streamlineBlue text-[18px] mt-[16px] l">
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
        className="h-[10px]"
        />

        <div className="font-bold text-streamlineBlue text-[18px] mt-[16px]">
            Contact Information
        </div>
        <ProfileEntryEditor
        prompt={"Contact Name"}
        response={fullName}
        setResponse={setFullName}
        placeholder={"Full Name"}
        isLong={false}
        />
        
        <ProfileEntryEditor
        prompt={"Team Contact Email"}
        response={emailAddress}
        setResponse={setEmailAddress}
        placeholder={"Email Address"}
        isLong={false}
        />

        <MultiFieldPhoneEntry 
        prompt="Contact Phone Number"
        placeholder={"Phone Number"}
        fieldResponse={phoneNumberObj}
        setFieldResponse={setPhoneNumberObj}
        field="phoneNumber"
        customLength={"w-[40%]"}
        />

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
        locationImgs.length===0?"Upload Location Photos":"Add Location Photos"}/>

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