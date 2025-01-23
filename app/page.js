"use client";

import DynamicScreen from "./components/DynamicScreen";
import TopBar from "./components/TopBarComps/TopBar";
import SearchBar from "./components/searchBarComps/SearchBar";
import SwimTeamsMenu from "./components/SwimTeamsMenu";
import { useAuth } from "./contexts/AuthContext";
import LoadingSubScreen from "./components/loadingSubscreen";
import { useEffect, useState } from "react";
import { getEntriesByConditions } from "./hooks/firestoreHooks/retrieving/getEntriesByConditions";

export default function Home() {
  
  const {isFetchingUserInfo,loadingNewPage,loadingNewPageMessage,setLoadingNewPage}  = useAuth();

  const [teamLocations,setTeamLocations] = useState([])
  const [loadingTeams,setLoadingTeams]=useState(true)
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

      const updatedLocations = await Promise.all(
        locations.map(async (location) => {
          const daysHoursOps = await getEntriesByConditions({
            collectionName: "OperationDayTime",
            conditions: [{ field: "locationId", operator: "==", value: location.id }],
          });
    
          const uniqueDays = getUniqueDays(daysHoursOps);
    
          const locationImages = await getEntriesByConditions({
            collectionName: "Images",
            conditions: [
              { field: "locationId", operator: "==", value: location.id },
              { field: "photoType", operator: "==", value: "location" },
            ],
          });
          const listOfLocationImages = locationImages.map((item) => item.imageUrl);
    
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


  return (
    <div className="flex  justify-center items-center">
      <DynamicScreen className=" h-screen">

        <div className="flex flex-col h-screen">


        <TopBar/>

        {loadingTeams?
          <div className={"h-screen"}>
          <LoadingSubScreen/>
          </div>
          :
        <>
        {(isFetchingUserInfo || loadingNewPage) && !loadingTeams ?
        <div className="h-screen">
          <LoadingSubScreen loadingMessage={loadingNewPage?loadingNewPageMessage:null}/>
        </div>
        :
          <>
        <div
        className="relative flex flex-col items-center justify-center w-full"
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
            <SearchBar />
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
        </>}
        


        </div>
      </DynamicScreen>
    </div>
  );
}
