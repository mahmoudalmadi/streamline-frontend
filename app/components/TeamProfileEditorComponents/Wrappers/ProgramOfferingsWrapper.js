import CONFIG from "@/config";
import SelectingCategories from "../SelectingCategories";
import DaysHoursOperations from "../DaysHoursOperation";

export default function ProgramOfferingsWrapper({programsOfferedDivRef,isMissingProgramsOffered,programLevels,setProgramLevels,programTypes,setProgramTypes,daysOfWeek,setDaysOfWeek,hourOfOpError}){


    return(
        <>
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
        </>
    )
}