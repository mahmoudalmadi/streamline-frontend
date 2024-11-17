"use client";

import DynamicScreen from "../../components/DynamicScreen";
import BookingPanel from "../../components/TeamPageComps/LessonBookingPanel/BookingPanel";
import TopBar from "../../components/TopBar";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {

    const router = useRouter();
    const {selectedDate, selectedTime,selectedSkillLevel,selectedLessonType}=router.query;

    const [currSelectedDate, setCurrSelectedDate] = useState(null);
    const [currSelectedTime, setCurrSelectedTime] = useState(null);

    // Lesson type dropdown setup
    const [currSelectedLessonType, setCurrSelectedLessonType] = useState("")
    const [currSelectedSkillLevel, setCurrSelectedSkillLevel] = useState("")

    return (
        <div className="flex  justify-center items-center">
            <DynamicScreen className=" h-screen ">

            <TopBar/>

            <div
            className="relative flex flex-col items-center justify-center w-full"
            >
            <div
                className="relative w-screen h-[1px] bg-gray-200 mt-[18px]"
            />  

            </div>

            <div className="flex space-x-[45px] mt-[30px]">
            
            <div className="flex-1 ">
            
            <div
            className="font-bold text-[18px] mb-[15px]"
            >
                Your trial lesson
            </div>

            <div className="flex justify-between">
                <div>
                    Date and time
                </div>
                <div className="font-bold underline cursor-pointer">
                    Edit
                </div>
            </div>
            
            <div
                className="relative w-full h-[1px] bg-gray-200 mt-[20px] mb-[20px]"
            />         

            {/* BOTTOM OF MOBILE PAGE BOOKING PANEL */}
            <div className=" sm:hidden p-[20px] border border-gray-300 rounded-xl
            shadow-[0_0_10px_rgba(0,0,0,0.1)] ">  
                <div className="flex mb-[10px] font-bold space-x-[4px] items-end">
                    <div className="text-[20px]">
                        $30
                    </div>
                    <div className="text-[16px]">
                        trial lesson
                    </div>
                </div>
                
                <div>
                {/* <BookingPanel 
                selectedDate={selectedDate} setSelectedDate={setSelectedDate}
                selectedSkillLevel={selectedSkillLevel} setSelectedSkillLevel={setSelectedSkillLevel}
                selectedLessonType={selectedLessonType} setSelectedLessonType={setSelectedLessonType}
                selectedTime={selectedTime} setSelectedTime={setSelectedTime}
                /> */}
                </div>

            </div>

            <div
                className=" w-full sm:hidden h-[1px] bg-gray-200 mt-[32px] mb-[100px]"
            />  

            </div>

            

            {/* BIGGER SCREEN BOOK LESSON PANEL */}
            <div className={`hidden sm:block p-[20px] w-[35%] border border-gray-300 rounded-xl
            shadow-[0_0_10px_rgba(0,0,0,0.1)] ${currSelectedTime ?"h-[290px]" :"h-[240px]"}`}>
                
                <div className="flex mb-[10px] font-bold space-x-[4px] items-end">
                    <div className="text-[20px]">
                        $30
                    </div>
                    <div className="text-[16px]">
                        trial lesson
                    </div>
                </div>
                
                <div>
                {/* <BookingPanel
                selectedDate={selectedDate} setSelectedDate={setSelectedDate}
                selectedSkillLevel={selectedSkillLevel} setSelectedSkillLevel={setSelectedSkillLevel}
                selectedLessonType={selectedLessonType} setSelectedLessonType={setSelectedLessonType}
                selectedTime={selectedTime} setSelectedTime={setSelectedTime}
                /> */}
                </div>
                

            </div>



            </div>
            
        </DynamicScreen>
        </div>
    );
}
