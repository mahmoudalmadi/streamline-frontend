

export default function DaysHoursOperations({daysOfWeek,setDaysOfWeek,timesOfDay,setTimesOfDay}){

    const handleDaysCheckboxChange = (id) => {
        setDaysOfWeek(daysOfWeek.map(item => 
          item.id === id ? { ...item, checked: !item.checked } : item
        ));
      };

    const handleTimingCheckboxChange = (id) => {
    setTimesOfDay(timesOfDay.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
    ));
    };

    return(
        <div>
            <div className="text-[15px]  font-bold">
            Days and Hours of Operation
            </div>
            <div className="flex mt-2 pr-1.5">
                <div className="flex space-x-[30px] ">
                    {/* Preferred Days */}
                    <div className="flex flex-col">

                    {daysOfWeek.map((item, index) => (
                        <div
                        key={index}
                        className={`flex pl-3 pr-3 w-full py-[5px] mb-[10px]  rounded-xl whitespace-nowrap items-center space-x-1.5
                        ${
                            item.checked
                            ? "border-2 border-streamlineBlue text-streamlineBlue font-bold"
                            : "border-2 border-gray-300"
                        } hover:border-streamlineBlue cursor-pointer justify-center`}
                        onClick={() => {
                            handleDaysCheckboxChange(item.id);
                        }}
                        >
                        <div className="text-[15px]">{item.day}</div>
                        </div>
                    ))}
                    </div>

                    {/* Preferred Time of Day */}
                    <div className="flex flex-col justify-center">

                    {timesOfDay.map((item, index) => (
                        <div
                        key={index}
                        className={`flex pl-3 pr-3 w-full py-[5px] mb-[10px]  rounded-xl whitespace-nowrap items-center space-x-1.5
                        ${
                            item.checked
                            ? "border-2 border-streamlineBlue text-streamlineBlue font-bold"
                            : "border-2 border-gray-300"
                        } hover:border-streamlineBlue cursor-pointer justify-center`}
                        onClick={() => {
                            handleTimingCheckboxChange(item.id);
                        }}
                        >
                        <div className="text-[15px]">{item.timeOfDay}</div>
                        </div>
                    ))}
                    </div>
                </div>
                </div>

        </div>        
    )
}