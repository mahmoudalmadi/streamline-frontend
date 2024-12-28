import { getEntriesByMatching } from "@/app/hooks/firestoreHooks/retrieving/getEntriesByMatching";
import InfoDropdown from "../InfoDropdown";
import LocationThumbnail from "./LocationThumbnail";
import { transformToDaysOfWeek, transformImagesListToJsons } from "@/app/hooks/firestoreHooks/retrieving/adjustingRetrievedData";
import { useState } from "react";
import LoadingSubScreen from "../../loadingSubscreen";
import EditableInfoSection from "../EditableInfoSection";
import DisplayLocationInfo from "../InfoDisplayWrappers/DisplayLocationInfo";
import LocationInfoWrapper from "../EditorWrappers/LocationInfoWrapper";
import ViewLocationInfo from "./ViewLocationInfo";
import CONFIG from "@/config";

export default function TeamProfileLocationsSection({ locationsInfo }) {

  const [retrievedSkillLevel,setRetrievedSkillLevel] = useState()
  const [retrievedLessonTypes,setRetrievedLessonTypes]=useState()
  const [daysOfWeek, setDaysOfWeek]=useState()
  const [retrievedCoachInfo, setRetrievedCoachInfo]=useState()
  const [retrievedAmenities,setRetrievedAmenities]=useState()

  const [locationBeingView, setLocationBeingView]=useState(null)
  const [isViewingLocationInfo, setIsViewingLocationInfo] = useState(false)
  const [isLoadingLocationInfo, setIsLoadingLocationInfo] = useState(false)
  

  const pullLocoInfo = async({locationId}) => {
      setIsLoadingLocationInfo(true)
      const locoAmenitiesFirestore = await getEntriesByMatching({collectionName:"Amenities",
      fields:{
        locationId:locationId
      }})
      
      const locoAmenitiesArray = []
      for (const locoAm of locoAmenitiesFirestore){
        locoAmenitiesArray.push(locoAm.selectedAmenities)
      }
      setRetrievedAmenities(locoAmenitiesArray)
      const firestoreLocationSkillLevel = await getEntriesByMatching({collectionName:"SkillLevel", fields:{locationId:locationId}})
      setRetrievedSkillLevel(firestoreLocationSkillLevel)

      const firestoreLocationLessonTypes = await getEntriesByMatching({collectionName:"LessonType", fields:{locationId:locationId}})
      setRetrievedLessonTypes(firestoreLocationLessonTypes)

      const firestoreDaysOfOp = await getEntriesByMatching({collectionName:"OperationDayTime", fields:{locationId:locationId}})
      const processedDaysHours = transformToDaysOfWeek(firestoreDaysOfOp)
      setDaysOfWeek(processedDaysHours)

      const firestoreLocationCoach = await getEntriesByMatching({collectionName:"Coach", fields:{locationId:locationId}})
      setRetrievedCoachInfo(firestoreLocationCoach)

      const chosenLocation = findJsonById(locationsInfo,locationId)
      setLocationBeingView(chosenLocation)
      setIsViewingLocationInfo(true)
      setIsLoadingLocationInfo(false)

  }
    function findJsonById(jsonList, targetId) {
      return jsonList.find(item => item.id === targetId) || null;
    }
  
        // retrievedCoachInfo={retrievedCoachInfo} setRetrievedCoachInfo={setRetrievedCoachInfo} retrievedSkillLevel={retrievedSkillLevel} setRetrievedSkillLevel={setRetrievedSkillLevel} retrievedLessonTypes={retrievedLessonTypes} setRetrievedLessonTypes={setRetrievedLessonTypes} daysOfWeek={daysOfWeek} setDaysOfWeek={setDaysOfWeek}

    if(isLoadingLocationInfo){
      return(<LoadingSubScreen loadingMessage={"Loading location information"}/>)
    }

    console.log(CONFIG.daysOfWeek)

    return (
      <>{isViewingLocationInfo?
        <>
        <ViewLocationInfo
        locationsInfo={locationBeingView}
        retrievedAmenities={retrievedAmenities} setRetrievedAmenities={setRetrievedAmenities}
        />
        <>
        <div className="w-full h-[1px] bg-gray-200 mt-[18px] mb-[18px]"/>
        <div className="font-bold text-[16px] pt-[8px]">Class levels offered</div>    
        <ul className="list-disc pl-5">
          {[{"level":"one","category":"one"}].map((item, index) => (
            <li key={index} className="mb-2">
              {item.level} ({item.category})
            </li>
          ))}
        </ul>
        <div className="font-bold text-[16px] pt-[8px]">Class Sizes offered</div>    
        <ul className="list-disc pl-5">
          {[{"level":"one","category":"one"}].map((item, index) => (
            <li key={index} className="mb-2">
              {item.level} ({item.category})
            </li>
          ))}
        </ul>
        <div className="font-bold text-[16px] pt-[8px]">Hours of Operation</div>    
        <ul className="list-disc pl-5">
          {CONFIG.daysOfWeek.map((item, index) => (
            item.hoursOfOps.length>0 &&
            <>
            {<li key={index} className="mb-2 ">
              <div>
              {item.day}
              </div>
              <ul className="list-disc ">
                {["6 AM - 9 AM", "4 PM to 7 PM"].map((item, index) => (
                  <li key={index} className="flex items-center">
                     <div className="text-[10px] mr-[6px]">
                      ▶ 
                      </div>
                      {item}
                  </li>
                ))}
              </ul>
            </li>}
            </>
          ))}
        </ul>
        </>
        </>
        :
      <div className="w-full">
        <div className="flex justify-between items-center mb-[16px]">
        <div className="text-[18px] font-bold text-streamlineBlue w-full">Team Locations</div>
        <div className="flex text-[13px] font-bold text-white bg-green-500 px-[10px] py-[6px] rounded-full whitespace-nowrap space-x-[5px] items-center">
          <div className="text-[16px]">
          +
          </div>
          <div>
          Add another location
          </div>
        </div>
        </div>
        {/* <FaEllipsisV size={13} strokeWidth={0.5} /> */}
        {/* Parent Container */}
        <div className="w-full flex flex-col md:grid md:grid-cols-2 md:gap-4 py-[10px]">
          {locationsInfo.map((location, idx) => (
            <LocationThumbnail location={location} key={idx} pullLocoInfo={pullLocoInfo}/>
          ))}
        </div>
      </div>}
      </>
    );
  }
  