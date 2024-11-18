"use client";

import StreamlineLogo from '../../public/streamlineLogo.svg'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';
import AuthModal from './AuthModal';
import { monitorAuthState, logout } from "../hooks/authHooks/firebaseAuth";

const TopBar = () => {

    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLogin, setIsLogin] = useState(false)

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)
    const switchModalType = () => setIsLogin(!isLogin)

    const redirectHome = () => {
        router.push('/')
    }

    const [user, setUser] = useState(null);

    useEffect(() => {
      const unsubscribe = monitorAuthState((currentUser) => {
        if (currentUser) {
          setUser(currentUser);
        } else {
          setUser(null);
        }
      });
  
      return () => unsubscribe();
    }, []);

    return (
        <div className='flex justify-between items-center'>
            <button onClick={redirectHome}>
            <StreamlineLogo className="w-[130px] h-[50px]"/>
            </button>

            {user ?
            <button onClick={()=>{logout()}}>
            <div className=' text-streamlineBlue text-[14px] font-semibold'>
                Log out
            </div>
            </button>
            :
            <div className='flex flex-row space-x-4 items-center'>
                <button onClick={()=>{openModal();setIsLogin(true)}}>
                <div className=' text-streamlineBlue text-[14px] font-semibold'>
                    Log In
                </div>
                </button>

                <button onClick={()=>{openModal();setIsLogin(false)}}>
                <div 
                className=
                'text-white bg-streamlineBlue px-2 py-2 text-[14px] rounded-xl font-semibold'
                >
                    Sign Up
                </div>
                </button>
            </div> 
            }

            <AuthModal isOpen={isModalOpen} onClose={closeModal} isLogin={isLogin}
            switchModalType={switchModalType}/>

        </div>
    )

}


export default TopBar