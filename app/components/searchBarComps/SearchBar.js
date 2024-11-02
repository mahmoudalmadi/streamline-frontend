"use client";

import { FaSearch } from "react-icons/fa";
import LocationDropdown from "./LocationDropdown";
import LessonTypeDropdown from "./LessonTypeDropdown";
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
        {id:1, city: 'New York', state: 'NY', checked:false },
        {id:2, city: 'Los Angeles', state: 'CA', checked:false },
        {id:3, city: 'Chicago', state: 'IL' , checked:false},
        {id:4, city: 'Houston', state: 'TX' , checked:false},
        {id:5, city: 'New York', state: 'NY', checked:false },
        {id:6, city: 'Los Angeles', state: 'CA', checked:false },
        {id:7, city: 'Chicago', state: 'IL' , checked:false},
        {id:8, city: 'Houston', state: 'TX' , checked:false}
      ]);

    const [selectedLessonType, setSelectedLessonType] = useState("")
    const [selectedSkillLevel, setSelectedSkillLevel] = useState("")
    const [isLessonTypeDropdownVisible, setIsLessonTypeDropdownVisible] = useState(false);
    const [isLessonTypeDropdownClosing, setIsLessonTypeDropdownClosing] = useState(false);
    const toggleIsLessonTypeDropdownVisible = () => {
        if (isLessonTypeDropdownClosing) return; // Prevent reopening if in closing state
        setIsLessonTypeDropdownVisible(prev => !prev);
    };
    const handleCloseLessonTypeDropdown = () => {
        setIsLessonTypeDropdownClosing(true); // Set closing flag
        setIsLessonTypeDropdownVisible(false);
        setTimeout(() => setIsLessonTypeDropdownClosing(false), 500); // Reset after a short delay
    };

    const [lessonTypes,setLessonTypes] = useState([
        { lessonType: 'Private', lessonTypeDescription: 'One one one with an instructor' },
        { lessonType: 'Semi-Private', lessonTypeDescription: `I don't remember` },
        { lessonType: 'Group', lessonTypeDescription: 'Group lesson with other swimmers' }
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

                <LocationDropdown isVisible={isLocationDropdownVisible} setLocations={setLocations}
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
             hover:bg-gray-200 pl-6 "
             onClick={toggleIsLessonTypeDropdownVisible}>
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
                <LessonTypeDropdown isVisible={isLessonTypeDropdownVisible}
                    onClose={handleCloseLessonTypeDropdown} 
                    lessonTypes={lessonTypes} selectedLessonType={selectedLessonType}
                    setSelectedLessonType={setSelectedLessonType}
                    selectedSkillLevel={selectedSkillLevel}
                    setSelectedSkillLevel={setSelectedSkillLevel}/>
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