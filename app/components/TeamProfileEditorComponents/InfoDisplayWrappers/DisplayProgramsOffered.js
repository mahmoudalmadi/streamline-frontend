

export default function DisplayProgramsOffered(){

    return(
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
    )
}