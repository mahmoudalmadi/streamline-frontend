"use client"

import { useState, useEffect } from "react";
import LessonTypeDropdown from "./LessonTypeDropdown";
import DateTimePicker from "./DateTimePicker";
import { useRouter } from "next/navigation";

export default function BookingPanel({lessonTypes, skillLevels,
selectedDate, setSelectedDate, selectedTime,setSelectedTime,
selectedLessonType,setSelectedLessonType,selectedSkillLevel,
setSelectedSkillLevel}) {

        const router = useRouter();

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
        
        const [isDateTimeDropdownVisible, setIsDateTimeDropdownVisible] = useState(false);
        const [isDateTimeDropdownClosing, setIsDateTimeDropdownClosing] = useState(false);
        const toggleIsDateTimeDropdownVisible = () => {
            if (isDateTimeDropdownClosing) return; // Prevent reopening if in closing state
            setIsDateTimeDropdownVisible(prev => !prev);
        };
        const handleCloseDateTimeDropdown = () => {
            setIsDateTimeDropdownClosing(true); // Set closing flag
            setIsDateTimeDropdownVisible(false);
            setTimeout(() => setIsDateTimeDropdownClosing(false), 500); // Reset after a short delay
        };

        useEffect(()=>{
            if(selectedLessonType!="" && selectedSkillLevel!=""){
                toggleIsLessonTypeDropdownVisible()
                toggleIsDateTimeDropdownVisible()
            }
        },[selectedLessonType, selectedSkillLevel])

        const handleRedirect = () => {
            router.push('/CheckoutPage')
        }

    return(
        <>
        <div className="relative flex flex-col w-full  border border-gray-300 rounded-xl cursor-pointer">

                <div className="relative border-b border-gray-300 p-2"
                onClick={toggleIsLessonTypeDropdownVisible}
                >
                    <div className="relative font-bold text-[11px]"
                    style={{zIndex:20}}
                    
                    >
                        LESSON TYPE
                    </div>
                    <div className="text-gray-500 text-[12px]">
                        {selectedLessonType!=""&&selectedSkillLevel!="" ? 
                        selectedLessonType + ", " + selectedSkillLevel :
                         "Select lesson type"}
                    </div>
                    <LessonTypeDropdown isVisible={isLessonTypeDropdownVisible}
                    onClose={handleCloseLessonTypeDropdown} 
                    lessonTypes={lessonTypes} skillLevels={skillLevels}
                    selectedLessonType={selectedLessonType}
                    setSelectedLessonType={setSelectedLessonType}
                    selectedSkillLevel={selectedSkillLevel}
                    setSelectedSkillLevel={setSelectedSkillLevel}/>
                </div>
                <div className=" flex">
                <div className="w-[50%] p-2 border-r border-gray-300"
                onClick={toggleIsDateTimeDropdownVisible}>
                    <div className="font-bold text-[11px]">
                        DATE
                    </div>
                    <div className="text-gray-500 text-[12px]">
                        {selectedDate?
                        selectedDate.toDateString().slice(0,
                            selectedDate.toDateString().length -4):"Add date"}
                    </div>
                    <DateTimePicker
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    isVisible={isDateTimeDropdownVisible}
                    onClose={handleCloseDateTimeDropdown}
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                    toggleIsDateTimeDropdownVisible={toggleIsDateTimeDropdownVisible}
                    />
                </div>
                <div className="w-[50%] p-2" onClick={toggleIsDateTimeDropdownVisible}>
                    <div className="font-bold text-[11px]">
                        TIME
                    </div>
                    <div className="text-gray-500 text-[12px]">
                        {selectedTime?selectedTime:"Add time"}
                    </div>
                </div>


                </div>

            </div>
    
                <div className="flex w-full justify-center items-center mt-[13px]
                bg-streamlineBlue py-[10px] rounded-xl cursor-pointer"
                    onClick={
                        ()=>{
                            if(selectedSkillLevel!="" && selectedLessonType!="" && !selectedDate
                            && !selectedTime){
                                toggleIsDateTimeDropdownVisible()
                            }else if(selectedSkillLevel==="" || selectedLessonType ===""){
                                toggleIsLessonTypeDropdownVisible()
                            }else{
                                handleRedirect()
                            }
                        }
                    }>

                    <div className="text-white font-bold text-[15px] ">
                        {selectedTime?"Book lesson":"Check availability"}
                    </div>
                </div>

                {selectedTime &&
                <div className="flex w-full justify-center items-center mt-[15px] text-[14px]">
                    You won't be charged yet
                </div>}
        
        </>
    )
}