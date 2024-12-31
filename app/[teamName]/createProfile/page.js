"use client"

import DynamicScreen from "@/app/components/DynamicScreen";
import ProfileEntryEditor from "@/app/components/TeamProfileEditorComponents/ProfileEntryEditor";
import TopBar from "@/app/components/TopBarComps/TopBar";
import { useEffect, useRef, useState } from "react";
import { changeField } from "@/app/hooks/changeField";
import GoogleAddyEntryEditor from "@/app/components/TeamProfileEditorComponents/GoogleAddressInput";
import SelectingCategories from "@/app/components/TeamProfileEditorComponents/SelectingCategories";
import CONFIG from "@/config";
import ImageUploader from "@/app/components/TeamProfileEditorComponents/ImageUploader";
import AmenitiesSelection from "@/app/components/TeamProfileEditorComponents/AmentitiesSelection";
import DaysHoursOperations from "@/app/components/TeamProfileEditorComponents/DaysHoursOperation";
import { useSearchParams, useRouter } from "next/navigation";
import MultiFieldPhoneEntry from "@/app/components/AuthModalComps/MultiFieldPhoneEntry";
import validateFields from "@/app/hooks/firestoreHooks/validateFields";
import EmailIcon from '../../../public/emailIcon.svg'
import EmailSignUpWidget from "@/app/components/TeamProfileEditorComponents/EmailSignUpWidget";
import { addInfoAsJson } from "@/app/hooks/firestoreHooks/adding/addInfoAsJson";
import { emailSignUp } from "@/app/hooks/authHooks/firebaseAuth";
import { uploadImagesToS3 } from "@/app/hooks/awsHooks/uploadToS3";
import { addListOfJsons, generateJsonList, generateJsonListGivenJsons } from "@/app/hooks/firestoreHooks/adding/addInfoAsList";
import LoadingScreen from "@/app/components/loadingScreen";
import { getEntriesByMatching } from "@/app/hooks/firestoreHooks/retrieving/getEntriesByMatching";
import { useAuth } from "@/app/contexts/AuthContext";
import TeamInfoWrapper from "@/app/components/TeamProfileEditorComponents/EditorWrappers/TeamInfoWrapper";
import ContactInfoWrapper from "@/app/components/TeamProfileEditorComponents/EditorWrappers/ContactInfoWrapper";
import LocationInfoWrapper from "@/app/components/TeamProfileEditorComponents/EditorWrappers/LocationInfoWrapper";
import ProgramOfferingsWrapper from "@/app/components/TeamProfileEditorComponents/EditorWrappers/ProgramOfferingsWrapper";
import HeadCoachWrapper from "@/app/components/TeamProfileEditorComponents/EditorWrappers/HeadCoachWrapper";
import BlackMoveLeft from "../../../public/BlackMoveLeft.svg"


export default function TeamProfileEditor() {

  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading,setIsLoading] = useState(false)
  const [firstLoading,setFirstLoading]=useState(true)
  const {user, setUser,userInfo} = useAuth()
  const isSigningUp = searchParams.get("isSigningUp");
  const params = new URLSearchParams(searchParams.toString());


  useEffect(() => {
    // Get current search params
  
    if (!params.has('refreshed')) {
      params.set('refreshed', 'true'); // Add 'refreshed' flag to URL
      router.replace(`?${params.toString()}`); // Update the URL without full reload
      // setTimeout(()=>{
        window.location.reload(); // Trigger a full page reload
      // },400)
    } else {
      if(isSigningUp){
      setFirstLoading(false); // Proceed if already refreshed
      }
    }
  }, [searchParams, router]);
    
    const [isInfoVerified, setIsInfoVerified] = useState(false)

    const teamName = searchParams.get("teamName");
    const [fullName, setFullName] = useState(searchParams?searchParams.get("fullName"):"")
    const [phoneNumberObj, setPhoneNumberObj] = useState({phoneNumber:searchParams?searchParams.get("phoneNumber"):"", isValid:true})
    const [emailAddress, setEmailAddress] = useState(searchParams?searchParams.get("emailAddress"):"")
    const [password, setPassword] = useState("")
    const [coachImg, setCoachImg] = useState([]);
    const [logoImg, setLogoImg] = useState([]);
    const [locationImgs, setLocationImgs] = useState([]);
    const [selectedAmenities, setSelectedAmenities] = useState([])

    const [useDifferentEmailThanContact, setUseDifferentEmailThanContact] = useState(false)
    const [alternativeSignUpEmail, setAlternativeSignUpEmail] = useState("")
    const [emailWidgetError,setEmailWidgetError]=useState("")

    const [choseSignUpMethod, setChoseSignUpMethod] = useState("")
    const [newTeamName,setNewTeamName] = useState(teamName)
    const [teamDescription, setTeamDescription] = useState("")

    const [address,setAddress] = useState("")
    const [coords, setCoords] = useState(null)
    const [streetAddress,setStreetAddress]=useState("")
    const [postalCode,setPostalCode]=useState("")
    const [province, setProvince] = useState("")
    const [city, setCity] = useState("")
    const [country,setCountry] = useState("")

    const [locationContactName,setLocationContactName]=useState("")
    const [locationContactEmail,setLocationContactEmail]=useState("")
    const [locationContactPhone,setLocationContactPhone]=useState({phoneNumber:"", isValid:false})
    const [sameAsTeamContact,setSameAsTeamContact]=useState(null)

    useEffect(()=>{
      if(sameAsTeamContact){
        setLocationContactEmail(emailAddress)
        setLocationContactName(fullName)
        changeField({setDict:setLocationContactPhone,field:"phoneNumber",value:phoneNumberObj.phoneNumber})
      }
    },[fullName, phoneNumberObj,emailAddress,sameAsTeamContact])
    
    const [headCoachName, setHeadCoachName] = useState("")
    const [headCoachBio, setHeadCoachBio] = useState("")

    const [programLevels, setProgramLevels] = useState([
        { level: "", category: "" },
      ]);
    const [programTypes, setProgramTypes] = useState([
    { level: "", category: "" },
    ]);
    const [daysOfWeek,setDaysOfWeek] = useState(CONFIG.daysOfWeek);
    const [timesOfDay,setTimesOfDay] = useState(CONFIG.timesOfDay);
    const [isDaysSet,setIsDaysSet] = useState(false)

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

    const isFirstRender = useRef(true);

    const [teamInfo,setTeamInfo] = useState({"teamName":teamName,"teamDescription":teamDescription,
    "logoImg":logoImg,
    "sport":"swimming"})
    const [contactInfo, setContactInfo] = useState({
      "emailAddress":emailAddress, "phoneNumber":phoneNumberObj?phoneNumberObj.phoneNumber:"","contactName":fullName})
    const [locationData,setLocationData] = useState({"address":address,"city":city,"province":province,"country":country,
    "longitude": coords ? coords.lng : null,
    "latitude": coords ? coords.lat : null,
    "amenities": selectedAmenities,
    "locationImgs": locationImgs,
    "locationContactName":locationContactName,
    "locationContactNumber":locationContactPhone,
    "locationContactEmail":locationContactEmail
  })
  
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

    const [retrievedTeamInfo,setRetrievedTeamInfo] = useState({})
    const [retrievedLocationInfo,setRetrievedLocationInfo] = useState({})
    const [retrievedAmenitiesInfo, setRetrievedAmenitiesInfo] = useState({})
    const [retrievedDaysTimesOps, setRetrievedDaysTimesOps] = useState({})
    const [retrievedLessonType, setRetrievedLessonType] = useState({})
    const [retrievedLocationImages,setRetrievedLocationImages] = useState({})
    const [retrievedSkillLevel,setRetrievedSkillLevel] = useState({})
    const [retrievedCoachInfo,setRetrievedCoachInfo] = useState({})

    const transformImagesListToJsons = ({list}) => {
      return list.map(item => ({
        id: item.imageUrl,
        url: item.imageUrl
      }));
    };
    const extractAmenities = (jsonList) => {
      return jsonList.map(item => item.selectedAmenities);
    };

    const transformToDaysOfWeek = (data) => {
      const daysTemplate = CONFIG.daysOfWeek
      // Group data by day and add hours to the corresponding day in the template
      data.forEach(({ day, hour }) => {
        const dayEntry = daysTemplate.find((d) => d.day.toLowerCase() === day.toLowerCase());
        if (dayEntry) {
          dayEntry.checked = true; // Mark the day as checked since it has data
          dayEntry.hoursOfOps.push(hour);
        }
      });
    
      return daysTemplate;
    };

    const getFirestoreInfo = async()=>{
        if(user ){

          const firestoreTeamInfo=await getEntriesByMatching({collectionName:"Team",fields:{firebaseId:user.uid}})
          setRetrievedTeamInfo(firestoreTeamInfo[0])
          setNewTeamName(firestoreTeamInfo[0].teamName)
          setTeamDescription(firestoreTeamInfo[0].teamDescription)
          setLogoImg([{id:firestoreTeamInfo[0].logoPhotoURL,url:firestoreTeamInfo[0].logoPhotoURL}])
          setFullName(firestoreTeamInfo[0].contactName)
          setEmailAddress(firestoreTeamInfo[0].contactEmail)
          changeField({setDict:setPhoneNumberObj,field:"phoneNumber",value:firestoreTeamInfo[0].phoneNumber})

          const teamId = firestoreTeamInfo[0].id

          const firestoreTeamLocations=await getEntriesByMatching({collectionName:"Location",
          fields:{teamId:teamId}})
          // setRetrievedLocationInfo(firestoreTeamLocations)
          setAddress(firestoreTeamLocations[0].address)

          for (const location of firestoreTeamLocations){
            const locationId = location.id

            const firestoreDaysOfOp = await getEntriesByMatching({collectionName:"OperationDayTime", fields:{teamId:teamId,locationId:locationId}})
            const processedDaysHours = transformToDaysOfWeek(firestoreDaysOfOp)
            setRetrievedDaysTimesOps(processedDaysHours)
            setDaysOfWeek(processedDaysHours)

            const firestoreLocationAmenities = await getEntriesByMatching({collectionName:"Amenities", fields:{teamId:teamId,locationId:locationId}})
            const processedAmenities = extractAmenities(firestoreLocationAmenities)
            setSelectedAmenities(processedAmenities)
            setRetrievedAmenitiesInfo(processedAmenities)
            
            const firestoreLocationLessonTypes = await getEntriesByMatching({collectionName:"LessonType", fields:{teamId:teamId,locationId:locationId}})
            setRetrievedLessonType(firestoreLocationLessonTypes)
            setProgramTypes(firestoreLocationLessonTypes)

            const firestoreLocationSkillLevel = await getEntriesByMatching({collectionName:"SkillLevel", fields:{teamId:teamId,locationId:locationId}})
            setRetrievedSkillLevel(firestoreLocationSkillLevel)
            setProgramLevels(firestoreLocationSkillLevel)

            const firestoreLocationCoach = await getEntriesByMatching({collectionName:"Coach", fields:{teamId:teamId,locationId:locationId}})
            setRetrievedCoachInfo(firestoreLocationCoach)
            setHeadCoachName(firestoreLocationCoach[0].coachName)
            setHeadCoachBio(firestoreLocationCoach[0].coachBio)
            setCoachImg([{id:firestoreLocationCoach[0].photoUrl,url:firestoreLocationCoach[0].photoUrl}])

            const firestoreLocationImages = await getEntriesByMatching({collectionName:"Images", fields:{teamId:teamId,locationId:locationId}})
            const formattedLocationImages = transformImagesListToJsons({list:firestoreLocationImages})
            setRetrievedLocationImages(formattedLocationImages)
            setLocationImgs(formattedLocationImages)

          }
        }
      }

    // useEffect(()=>{
    //   if(user && params.has('refreshed')){
    //     getFirestoreInfo()
    //     setFirstLoading(false)
    //   }
    // },[user])

    useEffect(()=>{
      if (isFirstRender.current){

        isFirstRender.current=false;

      }else{
        
        changeField({setDict:setTeamInfo,field:"teamDescription",value:teamDescription})
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
        changeField({setDict:setLocationData,field:"locationContactName",value:locationContactName})
        changeField({setDict:setLocationData,field:"locationContactEmail",value:locationContactEmail})
        changeField({setDict:setLocationData,field:"locationContactNumber",value:locationContactPhone.isValid?locationContactPhone.phoneNumber:""})
        
        changeField({setDict:setProgramsOffered, field:"opDays",value:daysOfWeek})
        changeField({setDict:setProgramsOffered, field:"opTimes",value:timesOfDay})
        changeField({setDict:setProgramsOffered, field:"skillLevels",value:programLevels})
        changeField({setDict:setProgramsOffered, field:"programTypes",value:programTypes})
        
        console.log(locationData,locationContactPhone)
        // changeField({setDict:setCoachInfo,field:"fullName","value":headCoachName})
        // changeField({setDict:setCoachInfo,field:"description","value":headCoachBio})
        // changeField({setDict:setCoachInfo,field:"coachImg","value":coachImg})
      };
      

      setIsMissingPrograms(false)
      setIsMissingCoachInfo(false)
      setIsMissingContact(false)
      setIsMissingTeamInfo(false)
      setIsMissingLocationDivRef(false)
    },[teamName,teamDescription
      ,logoImg,emailAddress,phoneNumberObj,fullName,address,city,province,coords,selectedAmenities,locationImgs,daysOfWeek,timesOfDay,programLevels,programTypes,headCoachName,headCoachBio,coachImg,locationContactEmail,locationContactName,locationContactPhone])

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
        if (key==="contactInfo"){
          if(phoneNumberObj.isValid){

          }else{
            throw new Error("invalid phone number")
          }
        }
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

        }
        window.scrollTo(0, 0);
       
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

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
  
      return true
      }
      // ENSURE SIGN UP METHOD IS SUCCESSFULL

      // SEND TO BACKEND

      // ROUTE EM TO THE DASHBOARD

    }

    const completeSignUp = async () => {

      window.scrollTo(0, 0);
      
      setIsLoading(true)
      
      try{
        
        const firebaseId = await emailSignUp({email:useDifferentEmailThanContact?alternativeSignUpEmail:contactInfo.emailAddress,password:password})

        // FIRESTORE ACCOUNT INFO - DONE
        const accountId = await addInfoAsJson({jsonInfo:{
          accountType:"team",
          dateJoined:new Date(),
          emailAddress:contactInfo.emailAddress,
          firebaseId:firebaseId.uid,
          fullName:contactInfo.contactName,
          phoneNumber:contactInfo.phoneNumber,
          uploadTimestamp:new Date()
        },collectionName:"Account"})

        // FIRESTORE TEAM INFO - DONE
        const logoUrlList = await uploadImagesToS3({s3Uri:"s3://streamlineplatform/logoImgs/",files:logoImg})
        const teamId = await addInfoAsJson({jsonInfo:{
          contactEmail:contactInfo.emailAddress,
          contactName:contactInfo.contactName,
          firebaseId:firebaseId.uid,
          logoPhotoURL:logoUrlList[0],
          phoneNumber: contactInfo.phoneNumber,
          sport:"swimming",
          teamDescription:teamInfo.teamDescription,
          teamName:teamInfo.teamName,
          uploadTimestamp:new Date(),
        },collectionName:"Team"})

        // FIRESTORE LOCATION INFO
        const locationId = await addInfoAsJson({jsonInfo:{
          address:locationData.address,
          city:locationData.city,
          country:locationData.country,
          latitude:locationData.latitude?locationData.latitude:"na",
          longitude:locationData.longitude?locationData.longitude:"na",
          state:locationData.province,
          teamId:teamId,
          status:"Pending Verification",
          locationContactPhone:"",
          locationContactName:locationContactName,
          locationContactEmail:locationContactEmail,
          uploadTimestamp:new Date()
        },collectionName:"Location"})

        // FIRESTORE + AWS LOCATION IMGS
        const locationImageList = await uploadImagesToS3({s3Uri:"s3://streamlineplatform/locationImages/",files:locationImgs})
        const imagesFirestoreJsons = generateJsonList(locationImageList,"imageUrl",
        {locationId:locationId},
        {photoType:"location"},
        {teamId:teamId},
        {uploadTimestamp:new Date()})
        const imageFirestoreIds = await addListOfJsons({jsonList:imagesFirestoreJsons,collectionName:"Images"})

        // FIRESTORE OPERATION DAYS/TIMES
        let dayTimes = []
        for (const day of programsOffered.opDays)
        {
          if (day.hoursOfOps.length>0){
            const dayHours = generateJsonList(day.hoursOfOps,"hour",
            {day:day.day},
            {locationId:locationId},
            {teamId:teamId})
            dayTimes.push(...dayHours)
          }
        }
        const dayTimeIds = await addListOfJsons({jsonList:dayTimes,collectionName:"OperationDayTime"})

        // FIRESTORE AMENITIES
        const firestoreAmenities = generateJsonList(selectedAmenities,"selectedAmenities",{locationId:locationId},{teamId:teamId}) 
        const amenityIds = await addListOfJsons({jsonList:firestoreAmenities,
        collectionName:"Amenities"})
        
        //FIRESTORE PROGRAM LEVELS
        const firestoreSkillLevels = generateJsonListGivenJsons(programLevels,{locationId:locationId,teamId:teamId})
        const programLevelIds = await addListOfJsons({jsonList:firestoreSkillLevels,
        collectionName:"SkillLevel"})

        //FIRESTORE PROGRAM TYPES
        const firestoreProgramTypes = generateJsonListGivenJsons(programTypes,{locationId:locationId,teamId:teamId})
        const programTypesIds = await addListOfJsons({jsonList:firestoreProgramTypes,
        collectionName:"LessonType"})
        
        // FIRESTORE COACH INFO
        const coachPhotoUrl = await uploadImagesToS3({s3Uri:"s3://streamlineplatform/coachPhotos/",files:coachImg})
        const coachEntryId = await addInfoAsJson({jsonInfo:{
          coachBio:coachInfo.description,
          coachName:coachInfo.fullName,
          coachType:coachInfo.coachType,
          locationId:locationId,
          photoUrl:coachPhotoUrl[0],
          teamId:teamId
        },collectionName:"Coach"})


        router.push(`/${newTeamName.replace(/\s+/g, '').toLowerCase()}/dashboard`)
      }catch(error){
        if (error.message.includes("auth")){
          setIsLoading(false)
        }else{
          router.push(`/${newTeamName.replace(/\s+/g, '').toLowerCase()}/dashboard`)
        }
        throw error;
      }
      
      // setIsLoading(false)

    }
    

    const handleUpdate = () => {

      // JUST UPDATE THE WHOLE DAMN THING OR AT LEAST BREAK IT DOWN TO COLLECTIONS THAT MATTER POTENTIALLY

    }

    if (isLoading || firstLoading){
      return<LoadingScreen loadingMessage={
        firstLoading?`${isSigningUp?"Loading sign up page":"Loading team profile page"}`:"Creating your new team account"}/>
    }

    return(
      !firstLoading &&
      <div className="flex justify-center items-center h-full">
      <DynamicScreen className=" h-full">

        <TopBar/>

        <div
        className="relative flex flex-col items-center justify-center w-full"
        >
          {!isInfoVerified &&
            <div
              className="relative w-screen h-[1px] bg-gray-200 mt-[18px]"
            />  }

          <div className="flex flex-col w-full">

              {!isInfoVerified&&
              <>
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
              <TeamInfoWrapper
              newTeamName={newTeamName}
              setNewTeamName={newTeamName}
              teamDescription={teamDescription}
              setTeamDescription={setTeamDescription}
              logoImg={logoImg}
              setLogoImg={setLogoImg}
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
                  Team Contact Info
                  </div>
                  {isMissingContact &&
                  <div className="text-red-500 text-[15px]">
                    Please ensure you have properly completed all the fields in this section
                  </div>}
              </div>
              <ContactInfoWrapper
              fullName={fullName}
              setFullName={setFullName}
              emailAddress={emailAddress}
              setEmailAddress={setEmailAddress}
              phoneNumberObj={phoneNumberObj}
              setPhoneNumberObj={setPhoneNumberObj}
              />

              <div
                  className="relative w-full h-[1px] bg-gray-200 mt-[10px]"
                />  
              <div
              className="h-[1px]"
              />
              <>
              </>
              
              <LocationInfoWrapper
              locationDivRef={locationDivRef}
              setPostalCode={setPostalCode}
              postalCode={postalCode}
              address={address}
              streetAddress={streetAddress}
              setStreetAddress={setStreetAddress}
              setAddress={setAddress}
              setCoords={setCoords}
              setCity={setCity}
              isMissingLocation={isMissingLocation}
              city={city}
              setProvince={setProvince}
              coords={coords}
              province={province}
              country={country}
              setCountry={setCountry}
              locationImgs={locationImgs}
              setLocationImgs={setLocationImgs}
              selectedAmenities={selectedAmenities}
              setSelectedAmenities={setSelectedAmenities}
              locationContactEmail={locationContactEmail}
              locationContactName={locationContactName}
              locationContactNumber={locationContactPhone}
              setLocationContactEmail={setLocationContactEmail}
              setLocationContactName={setLocationContactName}
              setLocationContactNumber={setLocationContactPhone}
              hasChosenLocationContact={false}
              sameAsTeamContact={sameAsTeamContact}
              setSameAsTeamContact={setSameAsTeamContact}
              />

              <div
              className="h-[8px]"
              />

              <ProgramOfferingsWrapper
              programsOfferedDivRef={programsOfferedDivRef}
              isMissingProgramsOffered={isMissingProgramsOffered}
              programLevels={programLevels}
              setProgramLevels={setProgramLevels}
              programTypes={programTypes}
              setProgramTypes={setProgramTypes}
              daysOfWeek={daysOfWeek}
              setDaysOfWeek={setDaysOfWeek}
              hourOfOpError={hourOfOpError}
              />
              <div className="h-[6px]"/>


              <HeadCoachWrapper
              coachInfoDivRef={coachInfoDivRef}
              isMissingCoachInfo={isMissingCoachInfo}
              headCoachBio={headCoachBio}
              headCoachName={headCoachName}
              setHeadCoachBio={setHeadCoachBio}
              setHeadCoachName={setHeadCoachName}
              coachImg={coachImg}
              setCoachImg={setCoachImg}
              />

              </div>

              </>
              }

              {/* SIGN UP AND SUBMIT MENU */}
              <div>
                
              {isSigningUp &&
                <>
              <div
                  className="relative w-full h-[1px] bg-gray-200 mt-[15px]"
                />  
              <div className="h-[10px]"/>

                <div className="flex-col w-full mt-[10px] mb-[10px]">

                  {!isInfoVerified?
                  <div className="flex justify-center space-x-[15px]">
                  
                  <div className="bg-streamlineBlue text-white font-bold mt-[20px] text-[15px] px-[20px] py-[10px] rounded-full cursor-pointer" onClick={()=>{
                    
                    const isVerified = verifyDataComplete()
                    
                    setIsInfoVerified(isVerified)

                    }}>
                    Save Information and Complete Sign Up
                  </div>

                  </div>
                  :
                  choseSignUpMethod.length===0?
                  <div className="flex w-full flex-col items-center justify-center h-screen">

                      <div className="text-center mt-[10px] font-bold text-streamlineBlue">
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
                    <div className="h-screen flex-col justify-center items-center">
                      <EmailSignUpWidget setAlternativeSignUpEmail={setAlternativeSignUpEmail} alternativeSignUpEmail={alternativeSignUpEmail} useDifferentEmailThanContact={useDifferentEmailThanContact} setUseDifferentEmailThanContact={setUseDifferentEmailThanContact} emailAddress={emailAddress} setEmailAddress={setEmailAddress} password={password} setPassword={setPassword}
                      completeSignUp={completeSignUp}
                      errorMessage={emailWidgetError}
                      setErrorMessage={setEmailWidgetError}
                      />
                    </div>
                  }

                  {isInfoVerified &&
                  <div className="flex w-full h-full items-start justify-center mt-[15px] ">
                    <div className="flex  border border-black rounded-full space-x-[8px] px-[18px] py-[10px] items-center cursor-pointer" onClick={()=>{
                      setIsInfoVerified(!isInfoVerified)
                    }}>
                    <div>
                      <BlackMoveLeft/>
                    </div>
                    <div>
                      Return to editing team profile
                    </div>
                    </div>
                  </div>
                }
                </div>
              </>
                }


              </div>


          </div>
        </div>
        </DynamicScreen>
        </div>
    )
}