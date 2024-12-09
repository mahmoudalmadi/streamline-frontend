"use client"

import PasswordEntry from "../AuthModalComps/PasswordEntry";
import ProfileEntryEditor from "./ProfileEntryEditor";
import { useState } from "react";

const EmailSignupWidget = ({setAlternativeSignUpEmail, alternativeSignUpEmail, useDifferentEmailThanContact, setUseDifferentEmailThanContact, emailAddress, setEmailAddress, password, setPassword}) => {

    const [errorMessage, setErrorMessage] = useState("")

    return(
        <div className="flex flex-col w-full bg-white p-[20px] rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.1)] items-center justify-center  space-y-[5px]">


            <div className="font-bold text-streamlineBlue mb-[10px]">
                Sign Up with Email
            </div>

            <div className="flex flex-col w-[60%] space-y-[10px]">
            <ProfileEntryEditor
            prompt={"Email Address"}
            placeholder={"Email Address"}
            response={useDifferentEmailThanContact?alternativeSignUpEmail:emailAddress}
            setResponse={useDifferentEmailThanContact?setAlternativeSignUpEmail:setEmailAddress}
            isLong={false}
            uneditable={!useDifferentEmailThanContact}
            />
            <label className="flex items-center space-x-2">
                <input
                type="checkbox"
                checked={useDifferentEmailThanContact}
                onChange={() => setUseDifferentEmailThanContact(!useDifferentEmailThanContact)}
                className="w-4 h-4"
                />
                <span>Use different email than contact email</span>
            </label>



            <PasswordEntry
            password={password}
            setPassword={setPassword}
            setErrorMessage={setErrorMessage}
            />
            </div>
            <div className="h-[10px]"/>
            <div className="flex justify-center rounded-[20px] font-bold text-white bg-streamlineBlue py-[7px] w-[130px] mt-[20px] cursor-pointer">
                Sign Up
            </div>


        </div>
    )

}

export default EmailSignupWidget;