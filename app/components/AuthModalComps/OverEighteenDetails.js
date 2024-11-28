"use client";

import { useSignUpContext } from "@/app/contexts/SignUpProvider"
import MultiFieldEntryEditor from "./MultiFieldEntryEditor"
import MultiFieldPhoneEntry from "./MultiFieldPhoneEntry"
import CONFIG from "@/config"
import OverEighteenDateField from "./OverEighteenDateField"
import { useState } from "react"
import AdditionalSwimmersSection from "./AdditionalSwimmersSection";

export default function OverEighteenDetails() {

    const {guardianInfo, setGuardianInfo, hasEmail, hasNumber} = useSignUpContext()
    const [wannaAddSwimmers,setWannaAddSwimmers] =useState()

    const handleSubmit = () => {
        console.log("HIE")
    }

    return(
        <div>

            <div className="w-full mx-auto space-y-[10px] mt-[10px]">
            <MultiFieldEntryEditor
            prompt={"Your Full Name"}
            placeholder={"Full Name"}
            field={"fullName"}
            fieldResponse={guardianInfo}
            setFieldResponse={setGuardianInfo}
            />
            {
            !hasEmail&&
            <MultiFieldEntryEditor
            prompt={"Your Email"}
            placeholder={"Email Address"}
            field={"emailAddress"}
            fieldResponse={guardianInfo}
            setFieldResponse={setGuardianInfo}
            />
            }


            <div className="flex w-full space-x-[8px]">

            {!hasNumber&&
            <MultiFieldPhoneEntry
            prompt={"Your Phone Number"}
            placeholder={"Enter Phone Number"}
            fieldResponse={guardianInfo}
            setFieldResponse={setGuardianInfo}
            field={"phoneNumber"}
            />}

            
            <OverEighteenDateField/>
            </div>

            <div className="text-[12px] text-streamlineBlue leading-[14px]">
                {CONFIG.contactInfoDisclaimer}
            </div>

            <div>
        {!wannaAddSwimmers  &&
        <button
            onClick={()=>{setWannaAddSwimmers(true)}}
            className=" flex rounded  items-center align-center w-full mr-0"
        >
            <div className="text-streamlineBlue font-bold mr-[5px]">
                    +
                </div>
                <div className="text-streamlineBlue text-[14px] font-bold">
                    Add Another Swimmer (optional, can be done later)
                </div>
        </button>}
        </div>

        {wannaAddSwimmers && 
        <>
        <AdditionalSwimmersSection isMinor={false}/>
        <button
            onClick={()=>{setWannaAddSwimmers(false)}}
            className=" flex rounded  items-center align-center w-full mr-0 cursor-pointer"
        >
                <div className="text-red-500 text-[14px] font-bold mb-[3px]">
                    I don't want to add another swimmer right now
                </div>
        </button>
        </>
        }

        <div className="flex w-full justify-center">
        <button
            onClick={handleSubmit}
            className="bg-streamlineBlue font-bold text-white py-2 px-6 rounded-full shadow hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
            Create account
        </button>
        </div>


            </div>
        </div>
    )
}