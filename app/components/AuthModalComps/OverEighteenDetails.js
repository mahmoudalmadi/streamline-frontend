"use client";

import { useSignUpContext } from "@/app/contexts/SignUpProvider"
import MultiFieldEntryEditor from "./MultiFieldEntryEditor"
import MultiFieldPhoneEntry from "./MultiFieldPhoneEntry"
import CONFIG from "@/config"
import OverEighteenDateField from "./OverEighteenDateField"
import { useState, useEffect } from "react"
import AdditionalSwimmersSection from "./AdditionalSwimmersSection";
import validateFields from "@/app/hooks/firestoreHooks/validateFields";
import { emailSignUp } from "@/app/hooks/authHooks/firebaseAuth";
import { addAccountDependants, addAccountDetails } from "@/app/hooks/firestoreHooks/createAccount";

export default function OverEighteenDetails({setFinishSignUpDetails}) {

    const {guardianInfo, setGuardianInfo, hasEmail, hasNumber,kids,setErrorMessage} = useSignUpContext()
    const [wannaAddSwimmers,setWannaAddSwimmers] =useState()
    const [incompleteFieldsError, setIncompleteFieldsError] = useState(false)

    const handleSubmit = async() => {
        try{
        validateFields({data:guardianInfo})
        if (wannaAddSwimmers){
            for (const swimmer of kids){
                validateFields({data:swimmer})
            }
        }
        setIncompleteFieldsError(false)
        if (guardianInfo.signUpMethod==="email"){
            console.log("heeee")
        // const userId = await emailSignUp({email:guardianInfo.email,password:guardianInfo.password})

        const accountDetails={
            accountType:"guardian",
            dateJoined:new Date(),
            emailAddress: guardianInfo.emailAddress,
            firebaseId: "24342sadsdasSADasd",
            fullName: guardianInfo.fullName,
            phoneNumber: guardianInfo.phoneNumber,
        }

        addAccountDetails({accountData:accountDetails})
        if (wannaAddSwimmers){
        addAccountDependants({dependantsList: kids, fireBaseId:"2312sadASDAS"})
        }
        console.log("eeddd", userId)
        }
    }catch(error){
            
            if (error.message.includes("auth")){
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
        {incompleteFieldsError &&
        <div className="text-center text-red-500 text-[14px] font-bold">
            {guardianInfo["isValidNum"] ?
            "Please ensure all the fields above are completely filled out":
            "Please ensure you have entered a correct phone number"}
        </div>}

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