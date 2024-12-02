"use client";

// Modal.js
import React, { useEffect } from 'react'
import XCancelIcon from '../../../public/XCancelIcon.svg'
import EmailIcon from '../../../public/emailIcon.svg'
import RedWarningIcon from "../../../public/RedWarningIcon.svg"
import { useState } from 'react';
import { emailSignUp, emailLogin } from '../../hooks/authHooks/firebaseAuth';
import CompleteSignUpDetails from './CompleteSignUpDetails';
import {  useSignUpContext } from '../../contexts/SignUpProvider';
import BlackMoveLeft from "../../../public/BlackMoveLeft.svg";

const AuthModal = ({ isOpen, onClose, isLogin ,switchModalType, isModal}) => {

    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState('')
    
    const [finishSignUpDetails, setFinishSignUpDetails] = useState(false)
    const [isEmailCollected, setIsEmailCollected] = useState(false)
    const [isPhoneNumberCollected, setIsPhoneNumberCollected] = useState(false)
    const [underEighteen, setUnderEighteen] = useState(null)

    const {guardianInfo, setGuardianInfo, kids, setKids,errorMessage,setErrorMessage} = useSignUpContext();

    function extractContent(str) {
        const match = str.match(/:(.*?)(?=\()/);
        return match ? match[1].trim() : null; // Return the content or null if no match is found
    }

    function extractLatterContent(str) {
        const match = str.match(/\/(.*?)(?=\))/);
        return match ? match[1].trim() : null; // Return the content or null if no match is found
    }

    useEffect(()=>{
        setGuardianInfo(prevState => ({
            ...prevState,
            emailAddress: email,
          }));
    },[email])
    useEffect(()=>{
        setGuardianInfo(prevState => ({
            ...prevState,
            password: password,
          }));
    },[password])

    useEffect(()=>{
        setGuardianInfo(prevState => ({
            ...prevState,
            signUpMethod: "email",
          }));
    },[])

  if (!isOpen && isModal) return null

  return (
    <div className={isModal? "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" 
    : "flex items-center justify-center"}>
      <div className=
      {isModal?"relative flex flex-col bg-white p-[25px] px-[10px] max-h-[650px] overflow-y-auto rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.1)] w-[440px] items-center":
      "flex flex-col w-full bg-white p-6 rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.1)] items-center"}>
        
        {isModal &&
        <button 
        className=" absolute right-[15px] top-[10px] text-streamlineBlue font-bold float-right" 
        onClick={
            ()=>{onClose(); setErrorMessage("")}}>
        <XCancelIcon className="w-[25px] h-[50px]"/>
        </button>}
        {finishSignUpDetails?
        <CompleteSignUpDetails
        setFinishSignUpDetails={setFinishSignUpDetails}
        underEighteen={underEighteen}
        setUnderEighteen={setUnderEighteen}
        onClose={onClose}
        />  
        :
        <>        
        {isLogin ?
        <>
        <div className="flex text-streamlineBlue font-bold">
          Log In
        </div>
        
        {isModal && 
        <div
        className={isModal?'absolute w-full h-[1px] bg-gray-300 top-[55px]':
                        "absolute w-full h-[1px] bg-gray-300 top-[10px]"}
        />}

        <div className='px-[13px]'>
        <div className={isModal?'w-full mt-[40px]':'w-full'}>
        {isModal && <div className='font-bold '>
            Welcome to Experience Streamline
        </div>}

        <div className='border border-gray-200 px-4 mt-[15px]
         py-2 w-full'
         style={{
            borderTopRightRadius:20,
            borderTopLeftRadius:20
        }}>
            <input
            value={email}
            className='w-full outline-none'
            placeholder='Email Address'
            onChange={(e)=>{setEmail(e.target.value);setErrorMessage("")}}
            />
        </div>
        <div className='flex border-l border-r border-b
        border-gray-200 px-4 py-2 w-full items-center'
        style={{
            borderBottomLeftRadius:20,
            borderBottomRightRadius:20
        }}>
            <input
            value={password}
            placeholder="Password"
            className='w-full outline-none'
            onChange={(e)=>{setPassword(e.target.value); setErrorMessage("")}}
            type={showPassword?'':"password"}
            />

            {password.length>0 &&
            <div className='font-bold text-[14px] text-streamlineBlue cursor-pointer'
            onClick={(e)=>{setShowPassword(!showPassword);e.stopPropagation();
            setErrorMessage("")}}>
                {!showPassword? "Show" : "Hide"}
            </div>}

        </div>

        {errorMessage.length>0 &&
        <div className='flex mt-[7px] items-center'>
            <div className='w-[20px]'>
            <RedWarningIcon/>
            </div>
            <div className='text-[11px] mt-[3px] ml-[5px]'
            style={{color:'#FF0000'}}>
                {errorMessage}
            </div>
        </div>}
        </div>

        <div className={`flex items-center justify-center py-2 rounded-full
        mt-[20px] font-bold bg-streamlineBlue text-white w-full text-center
        ${email.length>0 && password.length>3 ? 'cursor-pointer':'opacity-50 '}`}
        onClick={async()=>{
            try{
                
            await emailLogin({email:email,password:password});
            
            if(isModal){onClose()}
            }
            catch(error){
                
            const errMessage = extractContent(error.message)
            const errMessageTwo = extractLatterContent(error.message)
            const finalErrMessage = errMessage + " (" + errMessageTwo + ")"
            setErrorMessage(finalErrMessage)
            }
            }}>
            Log In
        </div>


        <div className="flex items-center justify-center mt-[45px] space-x-4">
        <div className="flex-1 bg-streamlineBlue h-[1px] w-[130px]" />
        <span className="text-black font-semibold">or Sign Up</span>
        <div className="flex-1 bg-streamlineBlue h-[1px] w-[130px]" />
        </div>

        <div className="flex py-2 rounded-2xl
        items-center justify-center relative
        border border-gray-300 px-3 text-[14px]
        mt-[20px] font-bold  w-full text-center cursor-pointer"
        onClick={switchModalType}>
            <div className='absolute left-[20px] top-[9px]'>
                <EmailIcon className="w-[40px] h-[30px]"/>
            </div>
            Sign Up with Email
        </div>
        </div>
        </>:
        <>
        <div className="relative flex text-streamlineBlue w-full items-center justify-center">
            <div className='font-bold'>
              Create a New Account
            </div>
        </div>
        
        {isModal&& <div
        className='absolute w-full h-[1px] bg-gray-300 top-[55px]'
        />}

        <div >
        <div className={isModal?'w-full mt-[40px]':'w-full'}>
        {isModal && <div className='font-bold '>
            Welcome to Experience Streamline
        </div>}

        <div className='border border-gray-200 px-4 mt-[15px]
         py-2 w-full'
         style={{
            borderTopRightRadius:20,
            borderTopLeftRadius:20
        }}>
            <input
            value={guardianInfo.emailAddress}
            className='w-full outline-none'
            placeholder='Email Address'
            onChange={(e)=>{setEmail(e.target.value);setErrorMessage("")}}
            />
        </div>
        <div className='flex border-l border-r border-b
        border-gray-200 px-4 py-2 w-full items-center'
        style={{
            borderBottomLeftRadius:20,
            borderBottomRightRadius:20
        }}>
            <input
            value={password}
            placeholder="Password"
            className='w-full outline-none'
            onChange={(e)=>{setPassword(e.target.value); setErrorMessage("")}}
            type={showPassword?'':"password"}
            />

            {password.length>0 &&
            <div className='font-bold text-[14px] text-streamlineBlue cursor-pointer'
            onClick={(e)=>{setShowPassword(!showPassword);e.stopPropagation();
            setErrorMessage("")}}>
                {!showPassword? "Show" : "Hide"}
            </div>}

        </div>

        {errorMessage.length>0 &&
        <div className='flex mt-[7px] items-center'>
            <div className='w-[20px]'>
            <RedWarningIcon/>
            </div>
            <div className='text-[11px] mt-[3px] ml-[5px]'
            style={{color:'#FF0000'}}>
                {errorMessage}
            </div>
        </div>}
        </div>

        <div className={`flex items-center justify-center py-2 rounded-full
        mt-[20px] font-bold bg-streamlineBlue text-white w-full text-center
        ${email.length>0 && password.length>3 ? 'cursor-pointer':'opacity-50  '}
        `} onClick={async()=>{
            if(email.length>0 && password.length>3){
            try
            {
                setFinishSignUpDetails(true)
                // await emailSignUp({email:email, password:password});
                // if(isModal){onClose()}
            }catch(error){
                const errMessage = extractContent(error.message)
                const errMessageTwo = extractLatterContent(error.message)
                const finalErrMessage = errMessage + " (" + errMessageTwo + ")"
                setErrorMessage(finalErrMessage)
            }}
            }}>
            Sign Up
        </div>


        <div className="flex items-center justify-center mt-[45px] space-x-4">
        <div className="flex-1 bg-streamlineBlue h-[1px] w-[130px]" />
        <span className="text-black font-semibold">or Log In</span>
        <div className="flex-1 bg-streamlineBlue h-[1px] w-[130px]" />
        </div>

        <div className="flex py-2 rounded-2xl
        items-center justify-center relative
        border border-gray-300 px-3 text-[14px]
        mt-[20px] font-bold  w-full text-center cursor-pointer"
        onClick={switchModalType}>
            <div className='absolute left-[20px] top-[9px]'>
                <EmailIcon className="w-[40px] h-[30px]"/>
            </div>
            Log In with Email
        </div>
        </div>
        </>
        }
        </>
        }
      </div>
    </div>
  )
}

export default AuthModal