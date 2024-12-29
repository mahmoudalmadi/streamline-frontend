import CONFIG from "@/config"

export default function DisplayProgramsOffered({daysOfWeek,programTypes,programLevels}){

    return(
        <>
        <div className="h-[10px]"/>
        <div className="font-bold text-[16px] pt-[8px]">Class levels offered</div>    
        <ul className="list-disc pl-5">
          {programLevels.map((item, index) => (
            <li key={index} className="mb-2">
              {item.level} ({item.category})
            </li>
          ))}
        </ul>
        <div className="font-bold text-[16px] pt-[8px]">Class Sizes offered</div>    
        <ul className="list-disc pl-5">
          {programTypes.map((item, index) => (
            <li key={index} className="mb-2">
              {item.level} ({item.category})
            </li>
          ))}
        </ul>
        <div className="font-bold text-[16px] pt-[8px]">Hours of Operation</div>    
        <ul className="list-disc pl-5">
          {daysOfWeek.map((item, index) => (
            item.hoursStringified.length>0 &&
            <>
            {<li key={index} className="mb-2 ">
              <div>
              {item.day}
              </div>
              <ul className="list-disc ">
                {item.hoursStringified.map((item, index) => (
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
    )
}