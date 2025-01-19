"use client";

import DynamicScreen from "../components/DynamicScreen";
import ImageViewer from "../components/ImageViewer";
import BookingPanel from "../components/TeamPageComps/LessonBookingPanel/BookingPanel";
import SwimClubDescription from "../components/SwimClubDescription";
import Map from "../components/TeamPageComps/Map"
import TopBar from "../components/TopBarComps/TopBar";
import SafetyCertified from "../../public/SafetyCertified.svg"
import { useState, useRef, useEffect, useContext } from "react";
import AmenitiesSection from "../components/TeamPageComps/AmenitiesSection";
import HeadCoachSection from "../components/TeamPageComps/HeadCoachSection";
import { useRouter, useSearchParams,usePathname } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import LoadingSubScreen from "../components/loadingSubscreen";
import { getEntriesByConditions } from "../hooks/firestoreHooks/retrieving/getEntriesByConditions";
import { batchedGetEntriesByConditions } from "../hooks/firestoreHooks/retrieving/batchedGetEntriesByConditions";
import CONFIG from "@/config";


export default function TeamPage()  {

    const {loadingNewPage,loadingNewPageMessage,setLoadingNewPage}=useAuth()

    // useEffect(()=>{
    //   setLoadingNewPage(false)
    // },[])

    const pathName = usePathname();
    const teamNameId = pathName.split('/').pop();

    const [teamName,setTeamName] = useState("Hello")
    const [teamDescription,setTeamDescription] = useState("Hi")
    const [programsAvailable,setProgramsAvailable]=useState([])
    const [classSizes,setClassSizes]=useState([])
    const [coachPhoto,setCoachPhoto]=useState([])
    const [coachName,setCoachName]=useState("")
    const [locationAddress,setLocationAddress]=useState("")
    const [locationCoords,setLocationCoords]=useState({"lat":"n/a","long":"n/a"})
    const [amenities,setAmenities]=useState([])
    const [headCoachDescription,setHeadCoachDescription]=useState([])

    const lessonTypes = CONFIG.lessonTypes
    const skillLevels = CONFIG.skillLevels

    const [images,setImages]=useState([])

    useEffect(()=>{

      const getTeamPageInfo = async() => {

        const flattenedName = teamNameId.split("-")[0];
        const locationId = teamNameId.split("-")[1];

        const allLocationInfo = await batchedGetEntriesByConditions({queriesWithKeys:
        [{
          key:"teamInfo",
          queryConfig:{
            collectionName:'Team',
            conditions:[{field:"flattenedTeamName",operator:"==",value:flattenedName}]
          }}
          ,
          {
            key:"locationInfo",
            queryConfig:{
              collectionName:'Location',
              conditions:[{field:"id",operator:"==",value:locationId}]
            },
          },
          {
            key:"locationImages",
            queryConfig:{
              collectionName:'Images',
              conditions:[{field:"locationId",operator:"==",value:locationId},
              {field:"photoType",operator:"==",value:'location'}]
            },
          },
          {
            key:"locationOpsDays",
            queryConfig:{
              collectionName:'OperationDayTime',
              conditions:[{field:"locationId",operator:"==",value:locationId}]
            },
          },
          {
            key:"locationLessonSkills",
            queryConfig:{
              collectionName:'SkillLevel',
              conditions:[{field:"locationId",operator:"==",value:locationId}]
            },
          },
          {
            key:"locationLessonTypes",
            queryConfig:{
              collectionName:'LessonType',
              conditions:[{field:"locationId",operator:"==",value:locationId}]
            },
          },
          {
            key:"locationCoachInfo",
            queryConfig:{
              collectionName:'Coach',
              conditions:[{field:"locationId",operator:"==",value:locationId},
              {field:"coachType",operator:"==",value:"Head Coach"}]
            },
          },{
            key:"locationAvailibility",
            queryConfig:{
              collectionName:'TimeBlock',
              conditions:[{field:"locationId",operator:"==",value:locationId}]
            },
          },{
            key:"locationAmenities",
            queryConfig:{
              collectionName:'Amenities',
              conditions:[{field:"locationId",operator:"==",value:locationId}]
            },
          }

          ]})
        
        

        setTeamName(allLocationInfo.teamInfo.teamName)
        setTeamDescription(allLocationInfo.teamInfo.teamDescription)
        setProgramsAvailable(allLocationInfo.locationLessonSkills.map(item=>item.level))
        setClassSizes(allLocationInfo.locationLessonTypes.map(item=>item.level))
        setCoachPhoto(allLocationInfo.locationCoachInfo[0].photoUrl)
        setCoachName()


      }

      getTeamPageInfo()
      setLoadingNewPage(false)

    },[])

  
    const trialLessonPrice = 30

    const checkAvailabilityRef = useRef(null)
    const coachRef = useRef(null)
    const [isDivVisible, setIsDivVisible] = useState(true); // Track visibility of the target div

    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    // Lesson type dropdown setup
    const [selectedLessonType, setSelectedLessonType] = useState("")
    const [selectedSkillLevel, setSelectedSkillLevel] = useState("")

    const openModal = (index) => {
      setCurrentIndex(index);
      setIsOpen(true);
    };
  
    const closeModal = () => {
      setIsOpen(false);
    };

    const formatProgramsList = (items) => {
        if (items.length === 1) {
          // One item: Display the name followed by "programs"
          return `${items[0]} programs`;
        } else if (items.length === 2) {
          // Two items: Display items with "and" between them, and the second item in lowercase
          return `${items[0]} and ${items[1].toLowerCase()} programs`;
        } else if (items.length >= 3) {
          // Three or more items:
          const lastItem = items[items.length - 1].toLowerCase();
          const middleItems = items.slice(1, -1).map((item,index) => item.toLowerCase()).join(', ');
          return `${items[0]}, ${middleItems}, and ${lastItem} programs`;
        }
        return '';
      };
      
      const ProgramsList = ({ items }) => {
        return <div className="">{formatProgramsList(items)}</div>;
      };

    

    // KEEP TRACK OF LOWER SCREEN BOOKING PANEL
    useEffect(() => {
    // Observer callback to check visibility
    const observerCallback = (entries) => {
        
        const [entry] = entries; // There will be only one entry for this div
        setIsDivVisible(entry.isIntersecting);
    };

    // Create an Intersection Observer
    const observer = new IntersectionObserver(observerCallback, {
        root: null, // Observe within the viewport
        threshold: 0.1, // Trigger if 10% of the div is visible
    });
    
    // Observe the target div
    if (checkAvailabilityRef.current) {
        observer.observe(checkAvailabilityRef.current);
    }

    return () => {
        // Cleanup the observer on unmount
        if (checkAvailabilityRef.current) {
        observer.unobserve(checkAvailabilityRef.current);
        }
    };
    }, []);

    // Scroll to the target div when the button is clicked
    const scrollToDiv = () => {
    checkAvailabilityRef.current?.scrollIntoView({ behavior: "smooth",block:'center' });
    };

    const scrollToCoachDiv = () => {
        coachRef.current?.scrollIntoView({ behavior: "smooth",block:'center' });
    };
    
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
      const handleScroll = () => {
        setScrollY(window.scrollY);
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

  return (
    <div className="flex  justify-center items-center ">
      <DynamicScreen className=" h-screen ">

        <TopBar/>

        {loadingNewPage ? 
          <div className="h-screen">
            <LoadingSubScreen loadingMessage={loadingNewPageMessage.length>0 ? loadingNewPageMessage:null}/>
          </div>
          :
          <>
        <div
        className="relative flex flex-col items-center justify-center w-full"
        >
        <div
            className="relative w-screen h-[1px] bg-gray-200 mt-[18px]"
          />  

        <div className="w-full mt-[20px] text-[20px] font-bold mb-[10px]">
        {teamName}
        </div>

        <div className="flex space-x-[10px] pb-[25px]">
            
                <div className="flex-1">
                <img
                    src={images[0]}
                    onClick={()=>{openModal(0)}}
                    className=
                    "  object-cover w-full h-full cursor-pointer rounded-[15px]"
                />
                </div>
            
                <div className="hidden sm:block w-[50%] h-full">
                <div className="grid grid-cols-2 gap-[10px] h-full">
                    {images.slice(1,5).map((image, index) => (
                    <div
                    className=""
                    >
                    <img
                        key={index}
                        src={image}
                        className=
                        {
                        `w-full h-full object-cover transition-transform 
                        aspect-square cursor-pointer`
                        }
                        style={{
                            borderTopRightRadius:index==1?15:0,
                            borderBottomRightRadius:index==3?15:0,
                            borderTopLeftRadius:index==0?15:0,
                            borderBottomLeftRadius:index==2?15:0
                        }}
                        onClick={()=>{openModal(index+1)}}
                    />
                    </div>
                    ))} 

                </div>


        </div>
                <div className="absolute bottom-[40px] right-[20px] bg-white
                cursor-pointer text-[12px] font-bold border border-black
                px-2 py-2 rounded-full" onClick={()=>{openModal(0)}}>
                    Show all photos
                </div>

        </div>

                {isOpen &&
                <ImageViewer currentIndex={currentIndex} images={images}
                closeModal={closeModal} setCurrentIndex={setCurrentIndex}/>
                }
        </div>

        <div className="flex space-x-[20px]"
        style={{
            position:"sticky"
        }}>
        
        <div className="flex-1 ">
        
        <div
        className="font-bold text-[18px]"
        >
            Swim team in Abu Dhabi, UAE
        </div>
        
        <ProgramsList items={programsAvailable}/>

        <div className="flex space-x-[5px]">
        <div>
            Class size{classSizes.length>1?"s":""}:
        </div>
        <div className="font-bold">
            {classSizes.join(', ')}
        </div>

        </div>

        <div className="flex items-center space-x-[10px] mt-[15px]"
        >
        <img
                    src={coachPhoto}
                    className=
                    " w-[50px] h-[50px] rounded-[100px] cursor-pointer"
                    onClick={scrollToCoachDiv}
                />
            <div className="font-bold cursor-pointer" onClick={scrollToCoachDiv} >
            Coach {coachName}
            </div>
        </div>

        <div
            className="relative w-full h-[1px] bg-gray-200 mt-[30px]"
          />  
        <div className="h-[25px]"/>
        <SwimClubDescription swimClubDescription={teamDescription}/>

        <div
            className="relative w-full h-[1px] bg-gray-200 mt-[20px]"
          />  

        {/* SAFETY CERTIFICATION SECTION */}
        <div className="flex items-center mt-[15px]">
        <div>
        <SafetyCertified className="
        md:w-[180px]
        w-[180px] h-[100px] mt-[12px]"/>
        </div>
        <div className="flex flex-col text-[18px] font-bold ml-[10px]">
            <div>
                Safety Certified
            </div>
            <div className="text-[15px] text-gray-400 leading-5 ">
                {teamName}'s staff is fully certified and has passed all
                our rigorous safety checks
            </div>
        </div>
        </div>

        <div
            className="relative w-full h-[1px] bg-gray-200 mt-[20px]"
          />  

        {/* AMENITIES SECTION */}

        <AmenitiesSection amenities={amenities}/>

        <div
            className="relative w-full h-[1px] bg-gray-200 mt-[18px]"
          />  


        {/* MAP SECTION */}
        <div className="flex flex-col w-full mt-[25px]"/>
            <Map address={locationAddress} locationCoords={locationCoords}/>
        
        <div
            className=" w-full h-[1px] bg-gray-200 mt-[18px] mb-[30px]"
          />  


        {/* Head coach section */}
        <div className="flex flex-col w-full mt-[25px]"
        ref={coachRef}
        />
            <HeadCoachSection coachName={coachName} coachPhoto={coachPhoto} coachBio={headCoachDescription}/>
        
        <div
            
            className=" w-full h-[1px] bg-gray-200 mt-[18px] mb-[30px]"
          />  
        

        {/* BOTTOM OF MOBILE PAGE BOOKING PANEL */}
        <div className="relative p-[20px] border border-gray-300 rounded-xl
        shadow-[0_0_10px_rgba(0,0,0,0.1)] "
        style={{zIndex:10}}
        >
            
            <div className="flex mb-[10px] font-bold space-x-[4px] items-end">
                <div className="text-[20px]">
                    ${trialLessonPrice}
                </div>
                <div className="text-[16px]">
                    trial lesson
                </div>
            </div>
            
            <div>
            <BookingPanel lessonTypes={lessonTypes} skillLevels={skillLevels}
            selectedDate={selectedDate} setSelectedDate={setSelectedDate}
            selectedSkillLevel={selectedSkillLevel} setSelectedSkillLevel={setSelectedSkillLevel}
            selectedLessonType={selectedLessonType} setSelectedLessonType={setSelectedLessonType}
            selectedTime={selectedTime} setSelectedTime={setSelectedTime} 
            dateTimePositioning={"left-1/2 transform -translate-x-1/2 "}
            teamName={teamName} lessonPrice={trialLessonPrice}
            />
            </div>

        </div>

        <div
            ref={checkAvailabilityRef}
            className=" w-full sm:hidden h-[1px] bg-gray-200 mt-[32px] mb-[100px]"
          />  

        </div>
        

        {/* BIGGER SCREEN BOOK LESSON PANEL */}
        <div className={`
        hidden sm:block p-[20px] w-[35%] border border-gray-300 rounded-xl
        
        shadow-[0_0_10px_rgba(0,0,0,0.1)] ${selectedTime ?"h-[290px]" :"h-[240px]"}`}
        style={{
            position: "sticky",
            // marginTop: `${scrollY}px`, // Adjust max height for stopping
            // transition: "top 0.2s ease-in-out",
          }}
        >
            
            <div className="flex mb-[10px] font-bold space-x-[4px] items-end">
                <div className="text-[20px]">
                    ${trialLessonPrice}
                </div>
                <div className="text-[16px]">
                    trial lesson
                </div>
            </div>
            
            <div>
            <BookingPanel lessonTypes={lessonTypes}
            skillLevels={skillLevels}
            selectedDate={selectedDate} setSelectedDate={setSelectedDate}
            selectedSkillLevel={selectedSkillLevel} setSelectedSkillLevel={setSelectedSkillLevel}
            selectedLessonType={selectedLessonType} setSelectedLessonType={setSelectedLessonType}
            selectedTime={selectedTime} setSelectedTime={setSelectedTime}
            dateTimePositioning={"right-0"} teamName={teamName}
            lessonPrice={trialLessonPrice}
            />
            </div>
            

        </div>



        </div>
        
         {/* Fixed button that appears when the target div is out of view */}
        {!isDivVisible && (
            <button
            onClick={()=>{scrollToDiv();}}
            className="sm:hidden fixed font-bold bottom-[30px] px-[30px] py-[10px] left-1/2 transform -translate-x-1/2 bg-streamlineBlue text-white px-4 py-2 rounded-full
            shadow-[0_0_20px_rgba(0,0,0,0.15)]"
            >
            Check trial lesson availability
            </button>
        )}

        </>}
      </DynamicScreen>
    </div>
  );
}
