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
import validateFields from "@/app/hooks/firestoreHooks/validateFields";
import EmailIcon from '../../../public/emailIcon.svg'
import EmailSignUpWidget from "@/app/components/TeamProfileEditorComponents/EmailSignUpWidget";

export default function TeamProfileEditor() {

    const searchParams = useSearchParams();
    const isSigningUp = searchParams.get("isSigningUp");
    
    const [isInfoVerified, setIsInfoVerified] = useState(false)

    const teamName = searchParams.get("teamName");
    const [fullName, setFullName] = useState(searchParams?searchParams.get("fullName"):"")
    const [phoneNumberObj, setPhoneNumberObj] = useState({phoneNumber:searchParams?searchParams.get("phoneNumber"):"", isValid:null})
    const [emailAddress, setEmailAddress] = useState(searchParams?searchParams.get("emailAddress"):"")
    const [password, setPassword] = useState("")
    const [coachImg, setCoachImg] = useState([]);
    const [logoImg, setLogoImg] = useState([]);
    const [locationImgs, setLocationImgs] = useState([]);
    const [selectedAmenities, setSelectedAmenities] = useState([])

    const [useDifferentEmailThanContact, setUseDifferentEmailThanContact] = useState(false)
    const [alternativeSignUpEmail, setAlternativeSignUpEmail] = useState("")

    const [choseSignUpMethod, setChoseSignUpMethod] = useState("")
    const [newTeamName,setNewTeamName] = useState(teamName)
    const [swimTeamDescription, setSwimTeamDescription] = useState("")
    const [googleMapsLink, setGoogleMapsLink] = useState("")
    const [address,setAddress] = useState("")
    const [coords, setCoords] = useState(null)
    const [headCoachName, setHeadCoachName] = useState("")
    const [headCoachBio, setHeadCoachBio] = useState("")
    const [province, setProvince] = useState("")
    const [city, setCity] = useState("")
    const [country,setCountry] = useState("")

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

    const [hourOfOpError,setHourOfOpError] = useState("")
    useEffect(()=>{
      for (const dayNum in daysOfWeek){
        let day = daysOfWeek[dayNum]
        if (day.checked){
          if (day.hoursOfOps.length>0)
          {setIsDaysSet(true)
          }
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
    const [teamMetadata,setTeamMetadata] = useState([])

    const changeField = ({ setDict, field, value }) => {
      setDict(prevState => {
        if (prevState[field] === value) {
          // No state change required
          return prevState;
        }
        // Update state only if the value is different
        return {
          ...prevState,
          [field]: value,
        };
      });
    };    

    const [teamInfo,setTeamInfo] = useState({"teamName":teamName,"swimTeamDescription":swimTeamDescription,
    "logoImg":logoImg,
    "sport":"swimming"})
    const [contactInfo, setContactInfo] = useState({
      "emailAddress":emailAddress, "phoneNumber":phoneNumberObj?phoneNumberObj.phoneNumber:"","contactName":fullName})
    const [locationData,setLocationData] = useState({"address":address,"city":city,"province":province,"country":country,
    "longitude": coords ? coords.lng : null,
    "latitude": coords ? coords.lat : null,
    "amenities": selectedAmenities,
    "locationImgs": locationImgs})
    const [programsOffered,setProgramsOffered] = useState({
      "opDays": daysOfWeek,
      "opTimes": timesOfDay,
      "skillLevels": programLevels,
      "programTypes": programTypes,
    })
    const [coachInfo, setCoachInfo] = useState({
      "fullName": headCoachName,
      "description": headCoachBio,
      "coachImg": coachImg,
      "coachType": "Head Coach"
    })

    useEffect(()=>{
      if (isFirstRender.current){
        isFirstRender.current=false;
      }else{
        
        changeField({setDict:setTeamInfo,field:"swimTeamDescription",value:swimTeamDescription})
        changeField({setDict:setTeamInfo,field:"logoImg",value:logoImg})
        changeField({setDict:setTeamInfo,field:"teamName",value:teamName})
        
        changeField({setDict:setContactInfo,field:"emailAddress",value:emailAddress})
        changeField({setDict:setContactInfo,field:"phoneNumber",value:phoneNumberObj?phoneNumberObj.phoneNumber:""})
        changeField({setDict:setContactInfo,field:"contactName",value:fullName})

        changeField({setDict:setLocationData,field:"address",value:address})
        changeField({setDict:setLocationData,field:"city",value:city})
        changeField({setDict:setLocationData,field:"province",value:province})
        changeField({setDict:setLocationData,field:"country",value:country})
        changeField({setDict:setLocationData,field:"longitude",value:coords ? coords.lng : null})
        changeField({setDict:setLocationData,field:"latitude",value:coords ? coords.lat : null})
        changeField({setDict:setLocationData,field:"amenities",value:selectedAmenities})
        changeField({setDict:setLocationData,field:"locationImgs",value:locationImgs})
        
        changeField({setDict:setProgramsOffered, field:"opDays",value:daysOfWeek})
        changeField({setDict:setProgramsOffered, field:"opTimes",value:timesOfDay})
        changeField({setDict:setProgramsOffered, field:"skillLevels",value:programLevels})
        changeField({setDict:setProgramsOffered, field:"programTypes",value:programTypes})

        changeField({setDict:setCoachInfo,field:"fullName","value":headCoachName})
        changeField({setDict:setCoachInfo,field:"description","value":headCoachBio})
        changeField({setDict:setCoachInfo,field:"coachImg","value":coachImg})
      };
      

      setIsMissingPrograms(false)
      setIsMissingCoachInfo(false)
      setIsMissingContact(false)
      setIsMissingTeamInfo(false)
      setIsMissingLocationDivRef(false)
    },[teamName,swimTeamDescription
      ,logoImg,emailAddress,phoneNumberObj,fullName,address,city,province,coords,selectedAmenities,locationImgs,daysOfWeek,timesOfDay,programLevels,programTypes,headCoachName,headCoachBio,coachImg])

    const [isMissingCoachInfo,setIsMissingCoachInfo]=useState(false)
    const coachInfoDivRef=useRef()
    const [isMissingProgramsOffered,setIsMissingPrograms]=useState(false)
    const programsOfferedDivRef=useRef()
    const [isMissingLocation,setIsMissingLocationDivRef]=useState(false)
    const locationDivRef=useRef()
    const [isMissingContact,setIsMissingContact]=useState(false)
    const contactDivRef=useRef()
    const [isMissingTeamInfo, setIsMissingTeamInfo]=useState(false)
    const teamInfoDivRef=useRef()

    const scrollToDiv = ({toDiv}) => {
      toDiv.current?.scrollIntoView({ behavior: "smooth",block:'center' });
    };

    const verifyDataComplete = () => {
      // USE THIS FUNCTION ONLY IF SIGNING UP
      // let metaData
      let metaData = {
        "teamInfo":teamInfo,
        "contactInfo":contactInfo,
        "locationInfo":locationData,
        "programsOffered":programsOffered,
        "coachInfo":coachInfo
      }
      // CHECK TO ENSURE NO EMPTY FIELDS AND ENSURE TODS AND DOWS ARE GG
      if (metaData)
      {
      for (const [key, value] of Object.entries(metaData)) {
      try{
        validateFields({data:value})
        if (key==="programsOffered"){
          let missingHoursCounter=0;
          for (const dayNum in daysOfWeek){
            let day = daysOfWeek[dayNum]
            if (day.checked){
              if (day.hoursOfOps.length>0)
              {setIsDaysSet(true)
              }
              else{
              missingHoursCounter+=1;
              setHourOfOpError(day.day + " is missing hours of operation")
              throw new Error("missing hops")
              }
            if (missingHoursCounter===0){
              setHourOfOpError("")
            }

            }
          }
          if(!isDaysSet){
            throw new Error("bad");
          }

        return true
        }
      }catch(error){
        //GO TO KEY PART OF PAGE
        if (key.toString()==="teamInfo"){
        setIsMissingTeamInfo(true)
        scrollToDiv({toDiv:teamInfoDivRef})
        }else if(key.toString()==="contactInfo"){
        setIsMissingContact(true)
        scrollToDiv({toDiv:contactDivRef})
        }else if(key.toString()==="locationInfo"){
          setIsMissingLocationDivRef(true)
          scrollToDiv({toDiv:locationDivRef})
        }else if(key.toString()==="programsOffered"){
          setIsMissingPrograms(true)
          scrollToDiv({toDiv:programsOfferedDivRef})
        }else if(key.toString()==="coachInfo"){
          setIsMissingCoachInfo(true)
          scrollToDiv({toDiv:coachInfoDivRef})
        }

        return false
        
      }
      }
      }
      // ENSURE SIGN UP METHOD IS SUCCESSFULL

      // SEND TO BACKEND

      // ROUTE EM TO THE DASHBOARD

    }

    const completeSignUp = () => {

      //SIGN UP EMAIL ON FIREBASE AUTH 
      //get: firebaseId

      //ADD ACCOUNT INFO TO FIRESTORE
      //info piece:
      //accountType
      //dateJoined
      //fullName
      //phoneNumber
      //emailAddress
      //firebaseId
      
      //ADD TEAM INFO TO FIRESTORE
      // contactEmail
      // contactName
      // firebaseId
      // logoPhotoURL
      // phoneNumber
      // sport
      // teamDescription
      // teamName

      //ADD to Location collection the following fields
      // address
      // city
      // country
      // latitude
      // longitude
      // state
      // teamId

      //ADD to OperationDayTime collection BUT IT TAKES IN A LIST OF OBJECTS WITH THE SAME FIELDS showed below EXCEPT FOR LOCATIONID AND TEAMID, ITS PROVIDED ONCE AS A VARIABLE
      // day
      // hour
      // locationId
      // teamId

      //ADD to Amenities collection but it takes in A LIST OF amentiy ids EXCEPT FOR LOCATIONID AND TEAMID, theyre PROVIDED ONCE AS A VARIABLE
      // amenityId
      // locationId
      // teamId

      // ADD to SkillLevel collection but it takes in a list of objects with THE SAME FIELDS showed below EXCEPT FOR LOCATIONID AND TEAMID, theyre PROVIDED ONCE AS A VARIABLE 
      // category
      // lessonLevel
      // locationId
      // teamId

      // ADD to LessonType collection but it takes in a list of objects with THE SAME FIELDS showed below EXCEPT FOR LOCATIONID AND TEAMID, theyre PROVIDED ONCE AS A VARIABLE 
      // category
      // lessonType
      // locationId
      // teamId

      // ADD to Images collection but it takes in a list of image URLs but LOCATIONID, TEAMID, and photoType, are PROVIDED ONCE AS A VARIABLE 
      // photoURL
      // photoType
      // locationId
      // teamId

      // Add the following piieces of information
      // coachBio
      // coachType
      // coachName
      // locationId
      // photoURL
      // teamId

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

        <div className="mt-[10px] space-y-[20px]">

        <div className="font-bold text-streamlineBlue text-[18px] mt-[16px]"
        ref={teamInfoDivRef}>
            <div>
            Team Information
            </div>
            {isMissingTeamInfo &&
            <div className="text-red-500 text-[15px]">
              Please ensure you have completed all the fields in this section
            </div>}
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
        <ImageUploader allowMultiple={false} images={logoImg} setImages={setLogoImg} prompt={"Logo Image"}
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

        <div className="font-bold text-streamlineBlue text-[18px] mt-[16px]"
        ref={contactDivRef}>
            <div>
            Contact Information
            </div>
            {isMissingContact &&
            <div className="text-red-500 text-[15px]">
              Please ensure you have completed all the fields in this section
            </div>}
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
        customLength={"w-[190px]"}
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
        <div className="font-bold text-streamlineBlue text-[18px] pt-[15px]"
        ref={locationDivRef}>
            <div>
            Location Information
            </div>
            {isMissingLocation &&
            <div className="text-red-500 text-[15px]">
              Please ensure you have completed all the fields in this section
            </div>}
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
        country={country}
        setCountry={setCountry}
        setProvince={setProvince}
        />

        <ImageUploader allowMultiple={true} images={locationImgs} setImages={setLocationImgs} prompt={"Location Images (at least 5 images)"}
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

        <div className="font-bold text-streamlineBlue text-[18px]"
        ref={programsOfferedDivRef}>
            <div>
            Programs Offered at this Location
            </div>
            {isMissingProgramsOffered &&
            <div className="text-red-500 text-[15px]">
              Please ensure you have completed all the fields in this section
            </div>}
        </div>

        <SelectingCategories categoryTypes={"Program Levels"}
        programs={programLevels}
        setPrograms={setProgramLevels}
        categoryDict={CONFIG.skillLevels}/>

        <SelectingCategories categoryTypes={"Program Class Sizes"}
        programs={programTypes}
        setPrograms={setProgramTypes}
        categoryDict={CONFIG.lessonTypes}/>

        <DaysHoursOperations daysOfWeek={daysOfWeek} setDaysOfWeek={setDaysOfWeek} hourOfOpError=
        {hourOfOpError}/>

        <div className="h-[6px]"/>

        <div
            className="relative w-full h-[1px] bg-gray-200 mt-[15px]"
          />  
        <div className="h-[6px]"/>

        <div className="font-bold text-streamlineBlue text-[18px] pt-[4px]"
        ref={coachInfoDivRef}>
            <div>
            Head Coach Information
            </div>
            {isMissingCoachInfo &&
            <div className="text-red-500 text-[15px]">
              Please ensure you have completed all the fields in this section
            </div>}
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

        <ImageUploader allowMultiple={false} images={coachImg} setImages={setCoachImg} prompt={"Head Coach Photo"}
        buttonMessage={
            coachImg.length!=0?"Replace Head Coach Photo":"Upload Head Coach Photo"}/>

        </div>

        <div>
          
        <div
            className="relative w-full h-[1px] bg-gray-200 mt-[15px]"
          />  
        <div className="h-[10px]"/>

          <div className="flex-col w-full mt-[20px]">

            {isInfoVerified?
            <div className="flex justify-center space-x-[15px]">
            
            <div className="bg-streamlineBlue text-white font-bold mt-[20px] text-[15px] px-[20px] py-[10px] rounded-full cursor-pointer" onClick={()=>{
              
              const isVerified = verifyDataComplete()
              

              }}>
              Save Information and Complete Sign Up
            </div>

            </div>
            :
            choseSignUpMethod.length===0?
            <div className="flex w-full flex-col items-center justify-center">

                <div className="text-center mt-[10px] font-bold">
                  Choose Sign Up Method
                </div>

                <div className="flex py-2 rounded-2xl
                items-center justify-center relative
                border border-gray-300 px-3 text-[14px]
                mt-[20px] font-bold  w-[290px] text-center cursor-pointer"
                onClick={
                  ()=>{setChoseSignUpMethod("email")}
                }>
                    <div className='absolute left-[15px] top-[9px]'>
                        <EmailIcon className="w-[40px] h-[30px]"/>
                    </div>
                    Sign Up with Email
                </div>
            </div>:
              <EmailSignUpWidget setAlternativeSignUpEmail={setAlternativeSignUpEmail} alternativeSignUpEmail={alternativeSignUpEmail} useDifferentEmailThanContact={useDifferentEmailThanContact} setUseDifferentEmailThanContact={setUseDifferentEmailThanContact} emailAddress={emailAddress} setEmailAddress={setEmailAddress} password={password} setPassword={setPassword}/>
            }

          </div>

        </div>


        </div>
        </div>
        </DynamicScreen>
        </div>
    )
}