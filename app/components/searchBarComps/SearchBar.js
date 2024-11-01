"use client";

import { FaSearch } from "react-icons/fa";
import LocationDropdown from "./LocationDropdown";
import { useState } from "react";

const SearchBar = () => {

    const [isLocationDropdownVisible, setIsLocationDropdownVisible] = useState(false);
    const [isDropdownClosing, setIsDropdownClosing] = useState(false);
    const toggleLocationDropdownVisibility = () => {
        if (isDropdownClosing) return; // Prevent reopening if in closing state
        setIsLocationDropdownVisible(prev => !prev);
    };
    const handleCloseDropdown = () => {
        setIsDropdownClosing(true); // Set closing flag
        setIsLocationDropdownVisible(false);
        setTimeout(() => setIsDropdownClosing(false), 500); // Reset after a short delay
    };
    const [locations, setLocations] = useState([
        { city: 'New York', state: 'NY' },
        { city: 'Los Angeles', state: 'CA' },
        { city: 'Chicago', state: 'IL' },
        { city: 'Houston', state: 'TX' },
        { city: 'New York', state: 'NY' },
        { city: 'Los Angeles', state: 'CA' },
        { city: 'Chicago', state: 'IL' },
        { city: 'Houston', state: 'TX' }
      ]);


    return(

        <div className="flex shadow-[0_0_10px_rgba(0,0,0,0.1)]
         justify-between border-[0.5px] border-graySubtitle rounded-full w-[100%]">
        
            {/* where box */}

            <div className="relative flex flex-1 flex-col justify-center rounded-full px-3 
            py-1 pl-6 hover:bg-gray-200 cursor-pointer"
            onClick={toggleLocationDropdownVisibility}>
                <div className="font-semibold text-[14px]">
                    Where
                </div>
                <div className=" text-graySubtitle text-[13px]">
                    Search locations 
                </div>

                <LocationDropdown isVisible={isLocationDropdownVisible}
                    onClose={handleCloseDropdown} locations={locations}/>
            </div>

            {/* where box */}
            <div className="relative group flex flex-1 flex-col justify-center rounded-full px-3 py-1 pl-6 hover:bg-gray-200">
                    <div className="absolute right-0 h-[60%] h-full w-[0.5px] bg-gray-200 transform -translate-x-1/2
                    opacity-100  "/>
                    <div className="font-semibold text-[14px]">
                        When
                    </div>
                    <div className=" text-graySubtitle text-[13px]">
                        Lesson times
                    </div>
                    <div className="absolute left-0 h-[60%] h-full w-[1px] bg-gray-200 transform -translate-x-1/2
                    opacity-100  "/>
            </div>

            {/* lesson type box */}
            <div className="relative group flex flex-1 flex-col justify-center rounded-full px-3 py-1
             hover:bg-gray-200 pl-6">
                <div className="absolute right-0 h-[60%] h-full w-[1px] bg-gray-200 transform -translate-x-1/2
                    opacity-100  "/>
                <div className="font-semibold text-[14px]">
                    Type
                </div>
                <div className=" text-graySubtitle text-[13px]">
                    Add Level
                </div>
                <div className="absolute left-0 h-[60%] h-full w-[0.5px] bg-gray-200 transform -translate-x-1/2
                    opacity-100  "/>
            </div>

            {/* lesson type box */}
            <div className="flex flex-1 
            justify-between items-center rounded-full py-1 pr-1 pl-4
            hover:bg-gray-200">
                <div className="flex flex-col">
                    <div className="font-semibold text-[14px]">
                        Price
                    </div>
                    <div className=" text-graySubtitle text-[13px]">
                        Add Level
                    </div>
                </div>

                <button>
                <div className="flex justify-center items-center
                rounded-full w-[42px] h-[42px] mt-1 mb-1 bg-streamlineBlue">
                <FaSearch style={{ color: 'white', fontSize: '20px' }} />
                </div>  
                </button>      
            </div>

        </div>

    )

}

export default SearchBar;