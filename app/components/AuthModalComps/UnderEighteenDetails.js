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
import validateFields from "@/app/hooks/firestoreHooks/validateFields";
import { emailSignUp } from "@/app/hooks/authHooks/firebaseAuth";

export default function UnderEighteenDetails({setFinishSignUpDetails}) {
    
    const {guardianInfo, setGuardianInfo, kids, setKids, hasEmail, hasNumber, setErrorMessage} = useSignUpContext()
    const [guardianFullName, setGuardianFullName] = useState("")
    const [incompleteFieldsError, setIncompleteFieldsError] = useState(false)

    useEffect(()=>{
        setGuardianInfo(prevState => ({
            ...prevState,
            fullName: guardianFullName,
          }));
    },[guardianFullName])

    function extractContent(str) {
        const match = str.match(/:(.*?)(?=\()/);
        return match ? match[1].trim() : null; // Return the content or null if no match is found
    }

    function extractLatterContent(str) {
        const match = str.match(/\/(.*?)(?=\))/);
        return match ? match[1].trim() : null; // Return the content or null if no match is found
    }

    useEffect(()=>{
    if(guardianInfo["isValidNum"]){
        setIncompleteFieldsError(false)
    }
    }
    ,[guardianInfo["isValidNum"]]
    )


    const handleSubmit = async() => {
        try{
            validateFields({data:guardianInfo, isGuardian:guardianInfo.isGuardian})
            for (const swimmer of kids){
                validateFields({data:swimmer})
            }
            setIncompleteFieldsError(false)
            if (guardianInfo.signUpMethod==="email"){
                console.log("heeee")
            const userId = await emailSignUp({email:guardianInfo.email,password:guardianInfo.password})
            console.log("eeddd", userId)
            }
        }catch(error){
            console.log("step 1",error.message)
                if (error.message.includes("auth")){
                    console.log("step 2")
                    const errMessage = extractContent(error.message)
                    const errMessageTwo = extractLatterContent(error.message)
                    const finalErrMessage = errMessage + " (" + errMessageTwo + ")"
                    setErrorMessage(finalErrMessage)
                    setFinishSignUpDetails(false)
                }else{
                setIncompleteFieldsError(true)
                }
            }
        }

    return (
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

        {incompleteFieldsError &&
        <div className="text-center text-red-500 text-[14px] font-bold">
            {guardianInfo["isValidNum"] ?
            "Please ensure all the fields above are completely filled out":
            "Please ensure you have entered a correct phone number"
            }
        </div>}

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