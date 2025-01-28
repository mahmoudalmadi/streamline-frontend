import { useTeamSignUpContext } from "@/app/contexts/TeamSignUpProvider";
import { useState } from "react";
import EmailIcon from '../../../public/emailIcon.svg'
import RedWarningIcon from "../../../public/RedWarningIcon.svg"
import { checkAccountExists } from "@/app/hooks/firestoreHooks/user/getUser";
import { useRouter } from "next/navigation";
import { emailLogin } from "@/app/hooks/authHooks/firebaseAuth";
import { useAuth } from "@/app/contexts/AuthContext";

export default function TeamLogin({switchModalType}){

    const router=useRouter();
    const isModal=false;
    const teamName="Neptunes Swimming Academy"

    const {loadingNewPage,setLoadingNewPage} = useAuth()

    const {handleTeamRegistrantInfo, teamRegistrantInfo,errorMessage,setErrorMessage} = useTeamSignUpContext();
    const [showPassword,setShowPassword] = useState(false);

    function extractContent(str) {
        const match = str.match(/:(.*?)(?=\()/);
        return match ? match[1].trim() : null; // Return the content or null if no match is found
    }

    function extractLatterContent(str) {
        const match = str.match(/\/(.*?)(?=\))/);
        return match ? match[1].trim() : null; // Return the content or null if no match is found
    }

    return(
        <div className="flex flex-col w-full px-[20px] py-[15px]">
        
        <div className="flex w-full text-streamlineBlue font-bold justify-center">
          Log Into Team Account
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
            value={teamRegistrantInfo.emailAddress}
            className='w-full outline-none'
            placeholder='Email Address'
            onChange={(e)=>{handleTeamRegistrantInfo(
                {field:"emailAddress", value:e.target.value}
            );setErrorMessage("")}}
            />
        </div>
        <div className='flex border-l border-r border-b
        border-gray-200 px-4 py-2 w-full items-center'
        style={{
            borderBottomLeftRadius:20,
            borderBottomRightRadius:20
        }}>
            <input
            value={teamRegistrantInfo.password}
            placeholder="Password"
            className='w-full outline-none'
            onChange={(e)=>{handleTeamRegistrantInfo(
                {field:"password", value:e.target.value}
            );setErrorMessage("")}}
            type={showPassword?'':"password"}
            />

            {teamRegistrantInfo.password.length>0 &&
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
        ${teamRegistrantInfo.emailAddress.length>0 && teamRegistrantInfo.password.length>3 ? 'cursor-pointer':'opacity-50 '}`}
        onClick={async()=>{
            if(teamRegistrantInfo.emailAddress.length>0 && teamRegistrantInfo.password.length>3){
            try{
                
            setLoadingNewPage(true)
            
            const accountExists = await checkAccountExists({valueType:"emailAddress",value:teamRegistrantInfo.emailAddress,accountType:"team"})
            if (!accountExists){
                throw("ExistenceError")
            }
            await emailLogin({email:teamRegistrantInfo.emailAddress,password:teamRegistrantInfo.password});
            
            router.push(`/${teamName}/dashboard`)
            if(isModal){onClose()}
            }
            catch(error){
            setLoadingNewPage(false)
            let finalErrMessage    
            if (error === "ExistenceError"){
                finalErrMessage="A team account with the following credentials does not exist"
            }else{
            const errMessage = extractContent(error.message)
            const errMessageTwo = extractLatterContent(error.message)
            finalErrMessage = errMessage + " (" + errMessageTwo + ")"
            
            }
            setErrorMessage(finalErrMessage)
            }
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
        onClick={()=>{switchModalType()}}>
            {/* <div className='absolute left-[20px] top-[9px]'>
                <EmailIcon className="w-[40px] h-[30px]"/>
            </div> */}
            Create a New Team Account
            </div>
        </div>

        </div>
    )
}