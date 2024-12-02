import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { logout } from '@/app/hooks/authHooks/firebaseAuth';
import { useRouter } from 'next/navigation';

const OptionsDropdown = ({isVisible, onClose, setIsLogin, openLogInModal}) => {

    const divRef = useRef(null);
    const {user, userInfo} = useAuth();
    const router = useRouter();

    const teamName = "Neptunes Swimming Academy";

    const handleClickOutside = (event) => {
        if (divRef.current && !divRef.current.contains(event.target)) {
            onClose(); // Trigger the close function
        }
    };

    useEffect(() => {
        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible]);

    return (
        isVisible && (
            <div
                ref={divRef}
                className="absolute flex flex-col bg-white 
                  top-full mt-[5px] right-0 py-[8px] 
                 rounded-[10px] shadow-[0_0_15px_rgba(0,0,0,0.2)] z-[200]"
                onClick={(e)=>e.stopPropagation()} // Close on click within the div
            >
                <div className=''
                style={{
                    fontWeight:525
                }}> 
                    {
                    user ? 
                    <div>
                        <div className='w-[150px]'>
                        <div className='px-[10px] text-[14px] text-gray-700 w-full hover:bg-gray-100 
                        py-[7px]' 
                        onClick={()=>{
                            if(userInfo.userData.accountType==="team"){
                            router.push(`/${teamName.replace(/\s+/g, '').toLowerCase()}/profile`)
                            }
                            else{
                            router.push(`/user/${userInfo.userData.firebaseId}`)
                            }
                            onClose()
                        }
                    }   
                        >
                            Profile
                        </div>
                        <div className='w-full bg-gray-200 h-[1px]'/>
                        <div className='py-[7px] px-[8px] text-[14px] text-gray-700 w-full hover:bg-gray-100'
                        onClick={()=>{logout(); onClose()}}>
                            Log out
                        </div>
                    </div>

                    </div>
                    :
                    <div className='w-[150px]'>
                        <div className='px-[10px] text-[14px] text-gray-700 w-full hover:bg-gray-100 
                        py-[10px]' onClick={()=>{openLogInModal();setIsLogin(true),onClose()}}>
                            Log in
                        </div>
                        <div className='py-[10px] px-[10px] text-[14px] text-gray-700 w-full hover:bg-gray-100'
                        onClick={()=>{openLogInModal();setIsLogin(false); onClose()}}>
                            Sign up
                        </div>
                    </div>
                    }
                </div>
            </div>
        )
    );
};

export default OptionsDropdown;
