"use client";

import DynamicScreen from "./components/DynamicScreen";
import TopBar from "./components/TopBarComps/TopBar";
import SearchBar from "./components/searchBarComps/SearchBar";
import SwimTeamsMenu from "./components/SwimTeamsMenu";
import { useAuth } from "./contexts/AuthContext";
import LoadingSubScreen from "./components/loadingSubscreen";
import { useEffect, useState } from "react";
import { getEntriesByConditions } from "./hooks/firestoreHooks/retrieving/getEntriesByConditions";
import CONFIG from "@/config";
import { batchedGetEntriesByConditions } from "./hooks/firestoreHooks/retrieving/batchedGetEntriesByConditions";
import { changeField } from "./hooks/changeField";

export default function Home() {
  
  const {isFetchingUserInfo,loadingNewPage,loadingNewPageMessage,setLoadingNewPage}  = useAuth();

  const [teamLocations,setTeamLocations] = useState([])
  const [loadingTeams,setLoadingTeams]=useState(true)

  const [locoIdsToHours,setLocoIdsToHours]=useState({})
  const [hoursToIds,setHoursToIds]=useState()

  const cities=new Set()
  const [citiesToUntethered,setCitiesToUntethered]=useState({})

  const citiesToIds={}

  const addCityAndId = (city, state,locationId,untetheredState) => {
    const cityState = `${city}, ${state}`;
    console.log("right before!!!",untetheredState)
    changeField({setDict:setCitiesToUntethered,field:cityState,value:untetheredState})
    if (citiesToIds[cityState]) {
      citiesToIds[cityState] = [...citiesToIds[cityState], locationId];
    } else {
      citiesToIds[cityState] = [locationId];
    }
  };

  useEffect(()=>{

    const getTeamLocations = async() => {

      const locations =  await getEntriesByConditions({collectionName:"Location",
        conditions:[]
      })

      const getUniqueDays = (data) => {
        const daysOrder = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const daysSet = new Set(data.map((item) => item.day?.substring(0, 3)));
        return daysOrder.filter(day => daysSet.has(day));
      };

      const getHoursOfOp = (existingData = {}) => (newData) => {
        return newData.reduce((acc, item) => {
            const key = `${item.day}${item.hour}`; // Create key by concatenating day and hour
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(item.locationId); // Append the new id to the list
            return acc;
        }, existingData);
    };
    
      let hoursOfOpsToIds;

      const processHours = getHoursOfOp();

      const updatedLocations = await Promise.all(
        locations.map(async (location) => {
          const daysHoursOps = await getEntriesByConditions({
            collectionName: "OperationDayTime",
            conditions: [{ field: "locationId", operator: "==", value: location.id }],
          });
    
          const uniqueDays = getUniqueDays(daysHoursOps);

          changeField({setDict:setLocoIdsToHours,field:location.id,value:daysHoursOps})
          
          const locationImages = await getEntriesByConditions({
            collectionName: "Images",
            conditions: [
              { field: "locationId", operator: "==", value: location.id },
              { field: "photoType", operator: "==", value: "location" },
            ],
          });
          const listOfLocationImages = locationImages.map((item) => item.imageUrl);
          
          if (location.state.length < 3) {
            if (CONFIG.abbreviationToState[location.state]) {
              addCityAndId(location.city, CONFIG.abbreviationToState[location.state],location.id, [location.city,location.state]);
            } else {
              addCityAndId(location.city, location.state,location.id,[location.city,location.state]);
            }
          } else {
            addCityAndId(location.city, location.state,location.id,[location.city,location.state]);
          }
          hoursOfOpsToIds= processHours(daysHoursOps)
          

          const teamInfo = await getEntriesByConditions({
            collectionName: "Team",
            conditions: [{ field: "id", operator: "==", value: location.teamId }],
          });
          
           

          return {
            ...location,
            uniqueDays,
            images: listOfLocationImages,
            teamInfo: teamInfo.length > 0 ? teamInfo[0] : null,
          };
        })
      );
      
      setTeamLocations(updatedLocations)
      setLoadingTeams(false)
    }
    
    
    getTeamLocations()
    if(!isFetchingUserInfo){
      setLoadingNewPage(false)
    }
  },[isFetchingUserInfo])
  
  
  const searchTeams = async() => {

    const lessonTypeConditions = ['Private','Semi-Private'].map(item=>
    (
      {
        key:`ApplicableBy${item}LessonTypePrice`,
        queryConfig:{
          collectionName:'LessonType',
          conditions:[{'field':"category",'operator':'==',value:item},{'field':'price','operator':'<=',value:200},{'field':'price','operator':'>=',value:0}]
        }}
    ))
    const skillTypeConditions = ['1 - Beginner','4 - Intermediate'].map(item=>
      (
        {
          key:`ApplicableBy${item}SkillType`,
          queryConfig:{
            collectionName:'SkillLevel',
            conditions:[{'field':"category",'operator':'==',value:item}]
          }}
      ))
    const matchedTeams = await batchedGetEntriesByConditions({
      queriesWithKeys:[
        ...lessonTypeConditions,
        ...skillTypeConditions]
    })

    console.log("MATCHED,", matchedTeams)
    
    console.log("LCOCOC",citiesToUntethered)
  }


  return (
    <div className="flex  justify-center items-center">
      <DynamicScreen className=" ">

        <div className="flex flex-col min-h-screen ">


        <TopBar/>

        {loadingTeams?
          <div className={"h-screen"}>
          <LoadingSubScreen/>
          </div>
          :
        <div className="h-[100%]">
        {(isFetchingUserInfo || loadingNewPage) && !loadingTeams ?
        <div className="h-screen">
          <LoadingSubScreen loadingMessage={loadingNewPage?loadingNewPageMessage:null}/>
        </div>
        :
          <>
        <div
        className="relative flex flex-col items-center justify-center w-full "
        >
          <div className="flex font-bold text-[18px] text-center mb-2 mt-2">
            <div>
            Find Your
            </div>
            <div className="px-[8px] ">
            Swim
            </div>
            <div>
            Team
            </div>
          </div>


            {/* SearchBar with high z-index */}
          <div className="relative z-40 w-full ">
            <SearchBar searchTeams={searchTeams} />
          </div>

          {/* Gray line with lower z-index */}
          <div
            className="relative z-0 w-screen h-[1px] bg-gray-200 mt-[18px]"
          />

        </div>

        <div className="text-[18px] font-semibold mt-[14px] mb-4">
          Partnered Swim Teams
        </div>

        <SwimTeamsMenu teamLocations={teamLocations}/>
        </>}
        </div>}
        
        <div className="h-[50px]"/>

        </div>
      </DynamicScreen>
    </div>
  );
}
