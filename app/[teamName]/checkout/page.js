"use client";

import DynamicScreen from "../../components/DynamicScreen";

import CONFIG from "@/config";
import TopBar from "../../components/TopBarComps/TopBar";
import { useState, useRef, useEffect } from "react";
import { useRouter,usePathname } from "next/navigation";
import { useCheckout } from "../../contexts/CheckoutContext";
import DateTimePicker from "@/app/components/TeamPageComps/LessonBookingPanel/DateTimePicker";
import BlackMoveLeft from "../../../public/BlackMoveLeft.svg"
import LessonTypeDropdown from "@/app/components/searchBarComps/LessonTypeDropdown";
import AuthModal from "@/app/components/AuthModalComps/AuthModal";
import PaymentModal from "@/app/components/PaymentModal";
import { useAuth } from "@/app/contexts/AuthContext";
import { SignUpProvider } from "@/app/contexts/SignUpProvider";
import LoadingSubScreen from "@/app/components/loadingSubscreen";

export default function CheckoutPage() {

    const {user, setUser,setLoadingNewPage,loadingNewPage} = useAuth();

    const [isNewPageLoading,setIsNewPageLoading]=useState(true)
    const router = useRouter();
    
    const switchModalType = () => {
    setIsLoginOptions(!isLoginOption)
    }

    const pathName = usePathname();
    const { checkoutData, setCheckoutData } = useCheckout();

    const [teamName,setTeamName]=useState("")
    const [prevPage,setPrevPage]=useState("")
    const currency = "CAD"
    const [isLoginOption,setIsLoginOptions] = useState(false)
    const [locationInfo,setLocationInfo]=useState(null)

    const [lessonType,setLessonType]=useState(null)
    const [skillLevel,setSkillLevel]=useState(null)
    const [teamPhoto,setTeamPhoto]=useState(null)
    
        useEffect(()=>{
        const pathStop = pathName.split('/')[1];
        
        const name = pathStop.split('-')[0]
        
        setPrevPage(pathStop)
        if(!checkoutData){
            router.push(`/${pathStop}`)
        }else{
            console.log(checkoutData)
            setIsNewPageLoading(false)
            setLoadingNewPage(false)
            setTeamName(checkoutData.teamInfo[0].teamName)
            setTeamPhoto(checkoutData.images[0])
            setLessonType(checkoutData.selectedLessonType)
            setSkillLevel(checkoutData.selectedSkillLevel)
            setLocationInfo(checkoutData.locationInfo[0])
        }

    },[])

    const [lessonTypes,setLessonTypes] = useState([
        { lessonType: 'Private', lessonTypeDescription: 'One one one with an instructor' },
        { lessonType: 'Semi-Private', lessonTypeDescription: `I don't remember` },
        { lessonType: 'Group', lessonTypeDescription: 'Group lesson with other swimmers' }
    ]);
    const [skillLevels,setSkillLevels] = useState([
        { skillLevel: 'Beginner', skillLevelDescription: 'Learning swimming for the first time' },
        { skillLevel: 'Intermediate', skillLevelDescription: `Has some swimming experience` },
        { skillLevel: 'Advanced', skillLevelDescription: 'Already a proficient swimmer' }
    ]);

    const [currSelectedDate, setCurrSelectedDate] = useState(checkoutData!=null ? checkoutData.lessonDate : "");
    const [currSelectedTime, setCurrSelectedTime] = useState(checkoutData!=null ? checkoutData.lessonTime : "");

    // Lesson type dropdown setup
    const [currSelectedLessonType, setCurrSelectedLessonType] = useState(checkoutData!=null ? checkoutData.lessonType : "")
    const [currSelectedSkillLevel, setCurrSelectedSkillLevel] = useState(checkoutData!=null ? checkoutData.skillLevel : "")

    const [isDateTimeDropdownVisible, setIsDateTimeDropdownVisible] = useState(false);
    const [isDateTimeDropdownClosing, setIsDateTimeDropdownClosing] = useState(false);

    const toggleIsDateTimeDropdownVisible = () => {
        if (isDateTimeDropdownClosing) return; // Prevent reopening if in closing state
        setIsDateTimeDropdownVisible(prev => !prev);
    };
    const handleCloseDateTimeDropdown = () => {
        setIsDateTimeDropdownClosing(true); // Set closing flag
        setIsDateTimeDropdownVisible(false);
        setTimeout(() => setIsDateTimeDropdownClosing(false), 500); // Reset after a short delay
    };

    // const [isLessonTypeDropdownVisible, setIsLessonTypeDropdownVisible] = useState(false);
    // const [isLessonTypeDropdownClosing, setIsLessonTypeDropdownClosing] = useState(false);
    // const toggleIsLessonTypeDropdownVisible = () => {
    //     if (isLessonTypeDropdownClosing) return; // Prevent reopening if in closing state
    //     setIsLessonTypeDropdownVisible(prev => !prev);
    // };
    // const handleCloseLessonTypeDropdown = () => {
    //     setIsLessonTypeDropdownClosing(true); // Set closing flag
    //     setIsLessonTypeDropdownVisible(false);
    //     setTimeout(() => setIsLessonTypeDropdownClosing(false), 500); // Reset after a short delay
    // };  

    const handleRedirect = () => {
        setLoadingNewPage(true)
        router.push(pathName+`/success`)
        }

    return (
        <SignUpProvider>
            <div className="flex  justify-center items-center">
                <DynamicScreen className=" h-screen ">

                <TopBar/>

                {isNewPageLoading||loadingNewPage?
                <div className="h-screen">
                    <LoadingSubScreen/>
                </div>   
                :
                <div className="h-screen">
                <div
                className="relative flex flex-col items-center justify-center w-full"
                >
                <div
                    className="relative w-screen h-[1px] bg-gray-200 mt-[18px]"
                />  

                </div>

                <div className="flex space-x-[43px] mt-[30px]">
                
                <div className="flex-1 ">
                
                <div
                className="flex items-center text-[21px] mb-[15px] space-x-[5px]"
                >
                    <div className="justify-center items-center hover:bg-gray-100 p-[10px] rounded-full
                    cursor-pointer" onClick={()=>{
                        setLoadingNewPage(true)
                        router.push(`/${prevPage}`)
                    }}>
                    <BlackMoveLeft />
                    </div>
                    <div className="font-bold">
                    Review and confirm
                    </div>
                </div>

                {/* TOP OF MOBILE PAGE BOOKING PANEL */}
                <div className=" sm:hidden p-[20px] border border-gray-300 rounded-xl
                shadow-[0_0_10px_rgba(0,0,0,0.1)] ">  
                    <div className="flex items-center  mb-[10px] space-x-[4px] items-end">
                            <img
                                src={teamPhoto}
                                className=
                                " w-[100px] h-[100px] rounded-[10px]"
                            />
                        <div className="pl-[10px]">
                        
                        <div className="font-bold">
                        {teamName}
                        </div>

                        <div className="flex-col leading-1.25 text-[14px] flex">
                        <div className=" mr-[3px]">Trial lesson, 1 {CONFIG.athleteType.toLowerCase()}
                        </div>
                        <div className="flex">
                        <div className="flex font-bold mr-[3px]">Skill level: </div> {currSelectedSkillLevel}
                        </div>
                        <div className="flex">
                        <div className="flex font-bold mr-[3px]">Lesson type: </div> {currSelectedLessonType}
                        </div>
                        </div>

                        </div>
                    </div>

                </div>

                <div
                    className=" w-full sm:hidden h-[1px] bg-gray-200 mt-[27px] mb-[20px]"
                />  

                <div
                className="font-bold text-[18px] mb-[15px]"
                >
                    Your trial lesson details
                </div>

                <div className="font-bold">
                        Address
                </div>
                <div>
                    {locationInfo.address}
                </div>

                <div className="relative flex justify-between mb-[5px]"
                style={{
                    zIndex:25
                }}>
                    <div className="font-bold mt-[8px]">
                        Time and date
                    </div>
                    {/* <div className="font-bold underline cursor-pointer"
                    onClick={toggleIsDateTimeDropdownVisible}>
                        Edit
                    <DateTimePicker
                    selectedDate={currSelectedDate}
                    setSelectedDate={setCurrSelectedDate}
                    isVisible={isDateTimeDropdownVisible}
                    onClose={handleCloseDateTimeDropdown}
                    selectedTime={currSelectedTime}
                    setSelectedTime={setCurrSelectedTime}
                    toggleIsDateTimeDropdownVisible={toggleIsDateTimeDropdownVisible}
                    dateTimePositioning={"right-0"}
                    />
                    </div> */}

                </div>
                

                <div className="leading-none text-[14px]">
                    {currSelectedTime}
                </div>
                <div className="leading-1.25 text-[15px]">
                    {currSelectedDate!=""?currSelectedDate.toDateString():""}
                </div>
                
                

                {/* <div
                className="font-bold text-[18px] mb-[15px]"
                >
                    Price details
                </div>

                <div className="relative flex justify-between mb-[5px]"
                style={{
                    zIndex:20
                }}>
                    <div>
                        Trial lesson fee
                    </div>

                    <div>
                        ${lessonPrice}
                    </div>

                </div>
                
                <div
                    className="relative w-full h-[1px] bg-gray-500 mt-[5px] mb-[5px]"
                />         

                <div className="relative flex justify-between mb-[5px]"
                style={{
                    zIndex:20
                }}>
                    <div>
                        Total ({currency})
                    </div>

                    <div>
                        ${lessonPrice}
                    </div>

                </div>
                
                <div
                    className="relative w-full h-[1px] bg-gray-200 mt-[20px] mb-[20px]"
                />          */}
                {!user?
                <>
                <div
                    className="relative w-full h-[1px] bg-gray-200 mt-[15px] mb-[20px]"
                />         
                <div
                className="font-bold text-[18px] mb-[15px]"
                >
                    {user?"Pay with":"Login or signup to book"}
                </div>

                <div className="flex justify-center">
                { 
                user?
                // <PaymentModal lessonPrice={lessonPrice} currency={currency.toLowerCase()}/>
                <div>
                    MAKE RESERVATION
                </div>
                :
                <AuthModal
                isOpen={true}
                onClose={null}
                isLogin={isLoginOption}
                switchModalType={switchModalType}
                isModal={false}
                />}

                </div>
                </>:
                <>
                <div className="w-full mt-[30px] flex items-center justify-center">

                    <div className="flex font-bold text-white bg-streamlineBlue py-[7px] px-[16px] rounded-full items-center cursor-pointer" onClick={()=>{handleRedirect()}}>
                        Confirm free trial lesson reservation
                    </div>
                </div>
                </>
                }
                
                <div
                    className="relative w-full h-[1px]  mt-[20px] mb-[20px]"
                />         

            {/* <div className="relative flex justify-between mb-[5px]"
                style={{
                    zIndex:15
                }}>
                    <div className="font-bold">
                        Lesson type
                    </div>
                    <div className="font-bold underline cursor-pointer"
                    onClick={toggleIsLessonTypeDropdownVisible}>
                        Edit
                    <LessonTypeDropdown isVisible={isLessonTypeDropdownVisible}
                    onClose={handleCloseLessonTypeDropdown} 
                    lessonTypes={lessonTypes} skillLevels={skillLevels}
                    selectedLessonType={currSelectedLessonType}
                    setSelectedLessonType={setCurrSelectedLessonType}
                    selectedSkillLevel={currSelectedSkillLevel}
                    setSelectedSkillLevel={setCurrSelectedSkillLevel}
                    additionalStyling={"right-0"}/>
                    </div>

                </div> */}
                
                {/* <div className="leading-1.25 text-[15px]">
                {currSelectedSkillLevel} {currSelectedLessonType.toLowerCase()} lesson
                </div>
                
                <div
                    className="relative w-full h-[1px] bg-gray-200 mt-[15px] mb-[20px]"
                />          */}


                </div>

                
                {/* BIGGER SCREEN BOOK LESSON PANEL */}
                <div className={`hidden sm:block p-[20px] w-[35%] border 
                flex flex-col justify-center border-gray-300 rounded-xl h-[200px]
                shadow-[0_0_10px_rgba(0,0,0,0.1)] }`}>
                    
                    <div className="flex items-center mt-[10px]">
                            <img
                                src={teamPhoto}
                                className=
                                " w-[100px] h-[100px] rounded-[10px]"
                            />
                        <div className="pl-[10px]">
                        
                        <div className="font-bold">
                        {teamName}
                        </div>

                        <div className="leading-1.25 text-[15px]">
                        {currSelectedSkillLevel} {currSelectedLessonType.toLowerCase()} trial lesson
                        </div>
                        <div className="leading-1.25 text-[15px]">
                        1 Swimmer
                        </div>
                        </div>
                    </div>

                </div>



                </div>
                </div>}
                
            </DynamicScreen>
            </div>
        </SignUpProvider>
    );
}
