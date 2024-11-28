"use client";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import ProfileEntryEditor from "../TeamProfileEditorComponents/ProfileEntryEditor";
import { useSignUpContext } from "../../contexts/SignUpProvider";
import MultiFieldEntryEditor from "./MultiFieldEntryEditor";
import "react-datepicker/dist/react-datepicker.css";
import "react-day-picker/style.css";
import ChildBirthDatePicker from "./BirthDatePicker";
import MultiFieldPhoneEntry from "./MultiFieldPhoneEntry";
import AdditionalSwimmersSection from "./AdditionalSwimmersSection";
import CONFIG from "@/config";

export default function UnderEighteenDetails() {
    
    const {guardianInfo, setGuardianInfo, kids, setKids, hasEmail, hasNumber} = useSignUpContext()
    const [guardianFullName, setGuardianFullName] = useState("")

    useEffect(()=>{
        setGuardianInfo(prevState => ({
            ...prevState,
            fullName: guardianFullName,
          }));
    },[guardianFullName])

    const handleSubmit = () => {
        console.log("Kids Information:", kids);
        alert("Kids Information Saved! Check the console for details.");
    };

    return (
        <div className="w-full mx-auto space-y-[10px] mt-[10px]">
        
        <ProfileEntryEditor 
        prompt={"Guardian Full Name"} 
        placeholder={"Full name"}
        response={guardianFullName}
        setResponse={setGuardianFullName}
        />

        {
            !hasEmail&&
            <MultiFieldEntryEditor
            prompt={"Guardian Email"}
            placeholder={"Email Address"}
            field={"emailAddress"}
            fieldResponse={guardianInfo}
            setFieldResponse={setGuardianInfo}
            />
        }

        {!hasNumber&&
            <MultiFieldPhoneEntry
            prompt={"Guardian Phone Number"}
            placeholder={"Enter Phone Number"}
            fieldResponse={guardianInfo}
            setFieldResponse={setGuardianInfo}
            field={"phoneNumber"}
            />
        }
        <div className="text-[12px] text-streamlineBlue leading-[14px]">
            {CONFIG.contactInfoDisclaimer}
        </div>
        
        <AdditionalSwimmersSection isMinor={true}/>

        <div>
        <div className="flex w-full align-center justify-center mt-[10px]">
        <button
            onClick={handleSubmit}
            className="bg-streamlineBlue font-bold text-white py-2 px-6 rounded-full shadow hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
            Create account
        </button>
        </div>
        </div>
        </div>
    );
}