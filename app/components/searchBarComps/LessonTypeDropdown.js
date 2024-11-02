import React, { useEffect, useRef, useState } from 'react';

const LessonTypeDropdown = ({ isVisible, onClose, lessonTypes, selectedLessonType, selectedSkillLevel,
setSelectedLessonType, setSelectedSkillLevel }) => {
    const divRef = useRef(null);

    const handleClickOutside = (event) => {
        if (divRef.current && !divRef.current.contains(event.target)) {
            onClose(); // Trigger the close function
        }
    };

    useEffect(() => {
        console.log("anything changins?")
        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible]);

    return (
        isVisible && (
            <div
                ref={divRef}
                className="absolute flex left-1/2 top-full mt-2 py-2 
                 rounded-3xl shadow-[0_0_12px_rgba(0,0,0,0.1)]
                 transform -translate-x-1/2"
                onClick={(e)=>e.stopPropagation()} // Close on click within the div
            >
                <div className='flex max-h-[256px] overflow-y-scroll pl-3 pr-4 py-2'>
                    <div className='flex flex-col'>
                        <div className='text-[10px] mb-0.5 pl-3  pr-3 whitespace-nowrap 
                        text-streamlineBlue pr-2 font-semibold'>
                            Available lesson types
                        </div>
                        {lessonTypes.map((item, index) => (
                        <div key={index} className="flex flex-1 pl-3  pr-3 w-full py-2
                        rounded-xl whitespace-nowrap hover:bg-gray-200  cursor-pointer"
                        onClick={()=>{setSelectedLessonType(item.lessonType)}}>
                            <div className='flex items-center space-x-2'>
                            <input
                            type='radio' 
                            checked={selectedLessonType==item.lessonType} 
                            onChange={()=>{setSelectedLessonType(item.lessonType)}}
                            />
                                <div className='flex-col'>
                                    <div className='text-[16px] font-semibold'>{item.lessonType}</div>
                                    <div className='text-[14px] text-graySubtitle'>{item.lessonTypeDescription}</div>
                                </div>
                            </div>
                        </div>
                        ))}
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div className='text-[10px] mb-0.5 pl-3  pr-3 whitespace-nowrap 
                        text-streamlineBlue pr-2 font-semibold'>
                            Skill Levels
                        </div>
                        {lessonTypes.map((item, index) => (
                        <div key={index} className="flex flex-1 flex-col pl-3  pr-3 w-full py-2
                        rounded-xl whitespace-nowrap hover:bg-gray-200">
                            <div className='text-[16px] font-semibold'>{item.lessonType}</div>
                            <div className='text-[14px] text-graySubtitle'>{item.lessonTypeDescription}</div>
                        </div>
                        ))}
                        </div>
            </div>
        )
    );
};

export default LessonTypeDropdown;
