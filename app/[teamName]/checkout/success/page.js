"use client";

import { useRouter } from "next/navigation";
import DynamicScreen from "../../../components/DynamicScreen";
import TopBar from "../../../components/TopBarComps/TopBar";
import EquipmentSection from "@/app/components/EquipmentMenu/EquipmentSection";


export default function SuccessfulCheckout() {


    const swimTeamPhoto="https://swimmings.s3.us-east-2.amazonaws.com/poolOne.jpg"
    const swimTeamName = "Neptunes Swimming Academy"
    const currSelectedLessonType = "Private"
    const currSelectedSkillLevel = "Intermediate"
    const router = useRouter();

    const handleRedirect = () => {
        router.push(`/`)
    }
  return (
    <div className="flex  justify-center items-center">
      <DynamicScreen className=" h-screen">

        <TopBar/>

        <div
        className="relative flex flex-col items-center justify-center w-full"
        >
        <div
            className="relative w-screen h-[1px] bg-gray-200 mt-[18px]"
          />  

        <div className="flex flex-col w-full">

        <div className="
        text-streamlineBlue
        font-bold items-start mt-[20px] mb-[15px] leading-[18px]">
          Your trial lesson has been requested. You will receive an email from {swimTeamName} within 24 hrs to confirm
        </div>

        <div className="mb-[25px] p-[20px] border border-gray-300 rounded-xl
            shadow-[0_0_10px_rgba(0,0,0,0.1)] ">  
                <div className="flex items-center  mb-[10px] space-x-[4px] items-end">
                        <img
                            src={swimTeamPhoto}
                            className=
                            " w-[100px] h-[100px] rounded-[10px]"
                        />
                    <div className="pl-[10px]">
                    
                    <div className="font-bold">
                    {swimTeamName}
                    </div>

                    <div className="leading-1.25 text-[15px]">
                    {currSelectedSkillLevel} {currSelectedLessonType.toLowerCase()} trial lesson
                    </div>
                    <div className="leading-1.25 text-[15px]">
                    1 Swimmer
                    </div>
                    </div>
                </div>

            </div>


        <EquipmentSection/>
        
        </div>
        
        </div>        

      </DynamicScreen>
    </div>
  );
}
