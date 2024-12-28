import { useState } from "react"
import ProgramOfferingsWrapper from "../EditorWrappers/ProgramOfferingsWrapper"
import { deleteMatchingEntriesByAllFields } from "@/app/hooks/firestoreHooks/editing/deleteEntriesByMatchingFields"
import { generateJsonList } from "@/app/hooks/firestoreHooks/adding/addInfoAsList"
import { addListOfJsons } from "@/app/hooks/firestoreHooks/adding/addInfoAsList"

export default function ViewProgramsInfo({programsInfo}){

    const [programLevels,setProgramLevels]=useState() //PENDING CHECJIUBG PROGRAMS INFO
    const [programTypes,setProgramTypes]=useState()
    const [daysOfWeek,setDaysOfWeek]=useState()
    const [hourOfOpError,setHourOfOpError]=useState()

    const [defaultProgramLevels,setDefaultProgramLevels]=useState() //PENDING CHECJIUBG PROGRAMS INFO
    const [defaultProgramTypes,setDefaultProgramTypes]=useState()
    const [defaultDaysOfWeek,setDefaultDaysOfWeek]=useState()
    const [defaultHourOfOpError,setDefaultHourOfOpError]=useState()

    const locationId = programsInfo.locationStuffs

    return(
        <>

<EditableInfoSection EditableInfoWrapper={ProgramOfferingsWrapper} GeneralInfoDisplayWrapper={DisplayLocationInfo} 
      fields={{
        isMissingProgramsOffered:isMissingProgramsOffered,
        programLevels:programLevels,
        setProgramLevels:setProgramLevels,
        programTypes:programTypes,
        setProgramTypes:setProgramTypes,
        daysOfWeek:daysOfWeek,
        setDaysOfWeek:setDaysOfWeek,
        hourOfOpError:hourOfOpError,
        noHeader:true
        }
      }
      displayFields={{
        daysOfWeek:daysOfWeek,
        programTypes:programTypes,
        programLevels:programLevels
      }}
      editButtonText={"programs offered"} 
      savingDefaultValuesOnCancel={
        [
          {value:defaultDaysOfWeek,
          setter:setDaysOfWeek
          },
          {
            value:defaultProgramLevels,
            setter:setProgramLevels
          },
          {
            value:defaultProgramTypes,
            setter:setProgramTypes
          }
        ]
    }
    toUpdateDefaultsOnSave={
        [
        {value:daysOfWeek,setter:setDefaultDaysOfWeek},
        {value:programLevels,setter:setDefaultProgramLevels},
        {value:programTypes,setter:setProgramTypes},
        ]
    }
    allStatesJson={
        {daysOfWeek:daysOfWeek,
        programLevels:programLevels,
        programTypes:programTypes
        }}
    headerText={"Programs offered"}
    onEdit={async()=>{

        try{

        if(daysOfWeek!=defaultDaysOfWeek){
            
            for (const dayNum in daysOfWeek){
                let day = daysOfWeek[dayNum]
                if (day.checked){
                  if (day.hoursOfOps.length>0)
                  {console.log('great')
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

            await deleteMatchingEntriesByAllFields({collectionName:"OperationDayTime",matchParams:{locationId:locationId}})

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

        }

        if(programLevels != defaultProgramLevels){
            deleteMatchingEntriesByAllFields({collectionName:'skillLevel',matchParams:{locationId:locationId}})


        }
        

    }catch(error)
    {
        console.log(error)
    }
    }
    }
    />


        </>
    )
}