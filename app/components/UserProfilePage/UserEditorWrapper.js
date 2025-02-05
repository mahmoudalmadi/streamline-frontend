"use client";

import CONFIG from "@/config";
import AdditionalSwimmersSection from "../AuthModalComps/AdditionalSwimmersSection";
import AdditionalAthletesEditor from "./AdditionalAthletesEditor";
import MultiFieldPhoneEntry from "../AuthModalComps/MultiFieldPhoneEntry";
import { useState } from "react";
import MultiFieldEntryEditor from "../AuthModalComps/MultiFieldEntryEditor";


export default function UserEditorWrapper({accountHolderEmailAddress,setAccountHolderEmailAddress,accountFullName,setAccountFullName,accountPhoneNumber,setAccountPhoneNumber,otherAthletes,setOtherAthletes}){

    console.log("OOIOIOl,,,,",accountHolderEmailAddress,accountFullName,accountPhoneNumber)

    return(

        <div>

            <div className="w-full mx-auto space-y-[10px] mt-[10px]">

            <MultiFieldEntryEditor
                prompt={"Account holder full name"}
                placeholder={"Full Name"}
                field={"fullName"}
                fieldResponse={accountFullName}
                setFieldResponse={setAccountFullName}
            />

                <MultiFieldEntryEditor
                prompt={"Account holder Email"}
                placeholder={"Email Address"}
                field={"emailAddress"}
                fieldResponse={accountHolderEmailAddress}
                setFieldResponse={setAccountHolderEmailAddress}
                />

                <MultiFieldPhoneEntry
                prompt={"Account holder phone number"}
                placeholder={"Enter Phone Number"}
                fieldResponse={accountPhoneNumber}
                setFieldResponse={setAccountPhoneNumber}
                field={"phoneNumber"}
                />
            
            <div className="text-[12px] text-streamlineBlue leading-[14px]">
                {CONFIG.contactInfoDisclaimer}
            </div>

            {/* {incompleteFieldsError &&
            <div className="text-center text-red-500 text-[14px] font-bold">
                {accountPhoneNumber["isValid"] ?
                "Please ensure all the fields above are completely filled out":
                "Please ensure you have entered a correct phone number"
                }
            </div>} */}

            </div>

            <div className="h-[15px]"/>
            <AdditionalAthletesEditor kids={otherAthletes} setKids={setOtherAthletes}/>

        </div>


    )


}