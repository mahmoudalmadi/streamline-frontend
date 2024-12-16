"use client";

import StreamlineLogo from '../../../public/streamlineLogo.svg'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';
import AuthModal from '../AuthModalComps/AuthModal';
import { monitorAuthState, logout } from "../../hooks/authHooks/firebaseAuth";
import { useAuth } from '../../contexts/AuthContext';
import AccountSection from './AccountSection';
import { SignUpProvider } from '../../contexts/SignUpProvider';

const TopBar = () => {

    const {userInfo} = useAuth();

    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLogin, setIsLogin] = useState(false)

    function openModal() { 
        setIsModalOpen(true)}
    const closeModal = () => setIsModalOpen(false)
    const switchModalType = () => setIsLogin(!isLogin)

    const redirectHome = () => {
        if(!useOtherLogo){
        router.push('/')
        }
    }

    const [useOtherLogo, setUseOtherLogo]=useState(false)
    const [teamLogo, setTeamLogo] = useState(false)
    // useEffect(()=>{
    //     if (userInfo.teamInfo){
    //         setTeamLogo(userInfo.teamInfo.logoPhotoURL)
    //         setUseOtherLogo(true)
    //     }
    // },[userInfo])

    return (
        <SignUpProvider>
        <div className='flex justify-between items-center'>
            <button onClick={redirectHome}>
            {
                !useOtherLogo?
                <StreamlineLogo className="w-[130px] h-[50px]"/>:
                <img
                src={teamLogo}
                className='w-[80px]'
                />
            }
            </button>

            <AccountSection openLogInModal={openModal} setIsLogin={setIsLogin}/>

            <AuthModal isOpen={isModalOpen} onClose={closeModal} isLogin={isLogin}
            switchModalType={switchModalType} isModal={true}/>

        </div>
        </SignUpProvider>
    )

}


export default TopBar