import CONFIG from "../../../config"

export default function AmenitiesSection({amenities}){
    return(
        <div className="mt-[15px]">
            <div className="text-[18px] font-bold">
                Swim Team Amenities
            </div>
            <div className="grid grid-cols-2 flex-between ">

            {amenities.map((item,index)=>
            (
                <div>
                    <div className="mt-[10px] flex items-center font-bold space-x-[10px]
                    text-[16px]">
                        <img src={`/amenities/${CONFIG.amenitiesIcons[item]['iconName']}`} className="w-[70px] h-[70px]"/>
                        <div>
                             {CONFIG.amenitiesIcons[item]['name']}
                        </div>
                    </div>
                </div>
            ))
            }
            

            </div>
        </div>
    )
}