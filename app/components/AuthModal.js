"use client";

// Modal.js
import React from 'react'
import XCancelIcon from '../../public/XCancelIcon.svg'
import EmailIcon from '../../public/emailIcon.svg'
import RedWarningIcon from "../../public/RedWarningIcon.svg"
import { useState } from 'react';
import { emailSignUp, emailLogin } from '../hooks/authHooks/firebaseAuth';

const AuthModal = ({ isOpen, onClose, isLogin ,switchModalType}) => {

    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState('')
    const [errorMessage,setErrorMessage] = useState('')
      

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center 
    justify-center bg-black bg-opacity-50 z-50">
      <div className="relative flex flex-col bg-white p-6 rounded-xl shadow-lg w-96 
      items-center
      ">
        <button 
        className=" absolute right-[15px] top-[10px] text-streamlineBlue font-bold float-right" onClick={onClose}>
        <XCancelIcon className="w-[25px] h-[50px]"/>
        </button>
        {isLogin ?
        <>
        <div className="flex  font-bold">
          Log In
        </div>

        <div
        className='absolute w-full h-[1px] bg-gray-300 top-[55px]'
        />

        <div className='w-full mt-[40px]'>
        <div className='font-bold '>
            Welcome to Experience Streamline
        </div>

        <div className='border border-gray-200 px-4 mt-[15px]
         py-2 w-full'
         style={{
            borderTopRightRadius:20,
            borderTopLeftRadius:20
        }}>
            <input
            className='w-full outline-none'
            placeholder='Email Address'
            />
        </div>
        <div className='flex border-l border-r border-b
        border-gray-200 px-4 py-2 w-full items-center'
        style={{
            borderBottomLeftRadius:20,
            borderBottomRightRadius:20
        }}>
            <input
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

        </div>

        <div className="flex items-center justify-center py-2 rounded-full
        mt-[20px] font-bold bg-streamlineBlue text-white w-full text-center
        cursor-pointer" onClick={()=>{emailLogin({email:email,password:password});onClose()}}>
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
        </>:
        <>
        <>
        <div className="flex  font-bold">
          Create a New Account
        </div>

        <div
        className='absolute w-full h-[1px] bg-gray-300 top-[55px]'
        />

        <div className='w-full mt-[40px]'>
        <div className='font-bold '>
            Welcome to Experience Streamline
        </div>

        <div className='border border-gray-200 px-4 mt-[15px]
         py-2 w-full'
         style={{
            borderTopRightRadius:20,
            borderTopLeftRadius:20
        }}>
            <input
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

        <div className="flex items-center justify-center py-2 rounded-full
        mt-[20px] font-bold bg-streamlineBlue text-white w-full text-center
        cursor-pointer" onClick={async()=>{
            try
            {await emailSignUp({email:email, password:password});
            onClose()
            }catch(error){
                setErrorMessage(error.message)
            }
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
        </>
        </>
        }

      </div>
    </div>
  )
}

export default AuthModal