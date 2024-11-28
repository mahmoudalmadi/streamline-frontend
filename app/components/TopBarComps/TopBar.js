"use client";

import StreamlineLogo from '../../../public/streamlineLogo.svg'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';
import AuthModal from '../AuthModalComps/AuthModal';
import { monitorAuthState, logout } from "../../hooks/authHooks/firebaseAuth";
import { useAuth } from '../../contexts/AuthContext';
import AccountSection from './AccountSection';
import { SignUpProvider } from '../AuthModalComps/SignUpProvider';

const TopBar = () => {

    const {user, setUser} = useAuth();

    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLogin, setIsLogin] = useState(false)

    function openModal() { 
        setIsModalOpen(true)}
    const closeModal = () => setIsModalOpen(false)
    const switchModalType = () => setIsLogin(!isLogin)

    const redirectHome = () => {
        router.push('/')
    }

    return (
        <SignUpProvider>
        <div className='flex justify-between items-center'>
            <button onClick={redirectHome}>
            <StreamlineLogo className="w-[130px] h-[50px]"/>
            </button>

            <AccountSection openLogInModal={openModal} setIsLogin={setIsLogin}/>

            <AuthModal isOpen={isModalOpen} onClose={closeModal} isLogin={isLogin}
            switchModalType={switchModalType} isModal={true}/>

        </div>
        </SignUpProvider>
    )

}


export default TopBar