"use client";

// Modal.js
import React from 'react'
import XCancelIcon from '../../public/XCancelIcon.svg'
import EmailIcon from '../../public/emailIcon.svg'
import RedWarningIcon from "../../public/RedWarningIcon.svg"
import { useState } from 'react';
import { emailSignUp, emailLogin } from '../hooks/authHooks/firebaseAuth';

const PaymentModal = ({ isOpen, onClose, isLogin ,switchModalType, isModal}) => {

    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState('')
    const [errorMessage,setErrorMessage] = useState('')

    function extractContent(str) {
        const match = str.match(/:(.*?)(?=\()/);
        return match ? match[1].trim() : null; // Return the content or null if no match is found
    }

    function extractLatterContent(str) {
        const match = str.match(/\/(.*?)(?=\))/);
        return match ? match[1].trim() : null; // Return the content or null if no match is found
    }

  if (!isOpen && isModal) return null

  return (
    <div className={isModal? "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" 
    : "flex items-center justify-center"}>
      <div className=
      {isModal?"relative flex flex-col bg-white p-6 rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.1)] w-96 items-center":
      "flex flex-col w-full bg-white p-6 rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.1)] items-center"}>
        
        {isModal &&
        <button 
        className=" absolute right-[15px] top-[10px] text-streamlineBlue font-bold float-right" 
        onClick={
            ()=>{onClose(); setErrorMessage("")}}>
        <XCancelIcon className="w-[25px] h-[50px]"/>
        </button>}

        

      </div>
    </div>
  )
}

export default PaymentModal