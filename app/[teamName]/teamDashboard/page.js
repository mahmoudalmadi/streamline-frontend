"use client";

import DynamicScreen from "@/app/components/DynamicScreen";
import TopBar from "@/app/components/TopBarComps/TopBar";
import CONFIG from "@/config";
import { useState } from "react";


export default function TeamDashboard() {

    const [locations, setLocations] = useState([{
        address:"Banana St, Dallas, TX"
    }])
    const [location, setLocation] = useState(locations[0]["address"]) 

    const [weeklyTrialLessons, setWeeklyTrialLessons] = useState([
        {
            name:"Mahmoud Al-Madi",
            age:"15 yo",
            lessonType:"Gold, Intermediate",
            dateTime:"Jan 22nd, 8:30 AM",
            status:"Pending"
        },    
        {
            name:"Mahmoud Al-Madi",
            age:"15 yo",
            lessonType:"Gold, Intermediate",
            dateTime:"Jan 22nd, 8:30 AM",
            status:"Confirmed"
        },
        {
            name:"Mahmoud Al-Madi",
            age:"15 yo",
            lessonType:"Gold, Intermediate",
            dateTime:"Jan 22nd, 8:30 AM",
            status:"Cancelled"
        }
    ])

    const timesOfDay = CONFIG.timesOfDay


    return(

        <div className="flex overflow-x-hidden justify-center items-center">
      <DynamicScreen className=" h-screen">

                <TopBar/>
                <div
                    className="relative z-0 w-[2000px] left-[-100px] h-[1px] bg-gray-200 mt-[18px]"
                />

            <div className="h-[40px]"/>

            <div className="text-[18px] font-bold">
                Weekly Dashboard
            </div>
            <div className="w-full h-[1px] bg-gray-200 mt-[5px] mb-[20px]"/>

            <div className="flex justify-between items-center">
                <div className="flex  space-x-[5px] border border-gray-200 rounded-full shadow-[0_5px_6px_rgba(0,0,0,0.1)] py-[8px] px-[16px] items-center">
                    <div className="font-bold">
                        Location:
                    </div>
                    <div>
                        {location.split(",")[0]}
                    </div>
                    {
                        locations.length>0 &&
                        <div className="text-streamlineBlue font-bold pl-[7px] text-[12px] cursor-pointer">
                            Change
                        </div>
                    }

                </div>                
            </div>

            {/* TRIAL LESSONS LIST */}
            <div className="text-red-500 bg-gray-200 w-full h-[400px] mt-[20px]">
                {/* HEADERS */}
                <div>
                    <div className="font-bold">
                        {weeklyTrialLessons[0].name}
                    </div>
                </div>
            </div>

            <div className="flex">
            <div className="flex space-x-[5px] rounded-full text-white font-bold items-center px-[14px] bg-green-400 py-[8px] mt-[10px] cursor-pointer">
                <div className="text-[15px]">
                +
                </div>
                <div className="text-[15px]">
                Add Availability
                </div>
            </div>
            </div>

            <div className="font-bold text-streamlineBlue text-[15px] mt-[10px]">
                Trial lessons this week
            </div>
            <div className="w-full h-[1px] bg-gray-200 mt-[5px] mb-[15px]"/>
            <div className=" w-full mt-[10px] text-[15px]">
                <div className="">
                    {/* HEADERS */}
                    <div className="flex p-[3px]">
                        <div className="font-bold  w-[25%] p-[3px]">
                            Name
                        </div>
                        <div className="font-bold  w-[15%] p-[3px]">
                            Age
                        </div>
                        <div className="font-bold  w-[20%] p-[3px]">
                            Lesson
                        </div>
                        <div className="font-bold  w-[20%] p-[3px]">
                            Time
                        </div>
                        <div className="font-bold  w-[90px] flex p-[3px]">
                            Status
                        </div>
                    </div>
                    <div className="w-full h-[0.5px] bg-streamlineBlue mt-[3px] mb-[8px]"/>
                    <div className="flex-col">
                        {
                        weeklyTrialLessons.map((item,index) => (
                            <div 
                            key={index}
                            className={`flex items-center w-full rounded-[10px]
                            ${index%2 == 0 ? "bg-gray-100" :""} cursor-pointer
                            hover:bg-gray-200 w-full`}>
                                <div className="w-[25%] p-[5px]">
                                    {item.name}
                                </div>            
                                <div className="w-[15%] p-[5px]">
                                    {item.age}
                                </div>            
                                <div className="w-[20%] p-[5px]">
                                    {item.lessonType}
                                </div>            
                                <div className="w-[20%] p-[5px]">
                                    {item.dateTime}
                                </div>            
                                <div className="w-[90px] flex justify-center items-center">
                                    <div className={`flex  text-white font-bold px-[10px] py-[6px] ${item.status==="Confirmed" ? "bg-green-500" : 
                                    item.status==="Pending" ? "bg-yellow-500" : "bg-red-500"} 
                                    rounded-full`}>
                                    {item.status}
                                    </div>
                                </div>            

                            </div>            
                        ))
                        }
    
                    </div>
                </div>
            </div>

            </DynamicScreen>
            </div>


    )
}