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


export default function TeamPage()  {

    const swimTeamName = "Neptunes Swimming Academy"
    const swimClubDescription="Neptunes Swimming Academy is a vibrant and inclusive swim club dedicated to nurturing swimmers of all ages and skill levels. Located in a picturesque setting, the academy offers comprehensive training programs that cater to children, teens, and adults alike. With a focus on developing essential swimming techniques, the academy emphasizes safety, fitness, and fun in the water. Experienced instructors provide personalized coaching, ensuring that each swimmer maximizes their potential while fostering a love for the sport. Whether you are a beginner looking to learn the basics or an advanced swimmer aiming to refine your skills, Neptunes Swimming Academy is the perfect place to dive in and make a splash."
    const programsAvailable = ["Learn to swim", "Competitive"]
    const classSizes= ["Group (4:1)", "Semi-Private (2:1)"]
    const coachPhoto="https://swimmings.s3.us-east-2.amazonaws.com/poolOne.jpg"
    const coachName="Stefan Todorov"
    const locationAddress="115 Haynes Ave, Toronto, Ontario M3J0L8"
    const locationCoords = {"lat":40.748817,"long": -73.985428}
    const amenities = [1,2,3,4,5,6,7]
    const trialLessonPrice = 30
    const headCoachDescription = "Stefan Todorov is a highly accomplished and dedicated head swim coach at Neptunes Swimming Academy, where he has been instrumental in shaping the future of young swimmers. With over a decade of coaching experience, Stefan combines his passion for swimming with a deep commitment to developing athletes both in and out of the pool.\
    Stefan began his journey in the world of competitive swimming at a young age, quickly rising through the ranks to compete at national levels. His firsthand experience as an athlete informs his coaching philosophy, emphasizing technique, endurance, and mental resilience. Under his leadership, Neptunes Swimming Academy has gained a reputation for excellence, producing numerous champions and fostering a love for the sport among its members.\
    At Neptunes, Stefan focuses on creating a supportive and motivating environment where swimmers can thrive. He believes in personalized training plans tailored to each athlete's unique strengths and areas for improvement. His innovative coaching methods incorporate cutting-edge training techniques and technology, ensuring that his swimmers are always at the forefront of competitive swimming.\
    In addition to his coaching duties, Stefan is actively involved in mentoring young coaches and promoting swimming as a vital life skill. He organizes community outreach programs to encourage youth participation in swimming, highlighting its benefits for health and personal development.\
    Stefan’s dedication to excellence has not gone unnoticed; he has received several accolades for his contributions to the sport. His commitment to nurturing talent and fostering a positive team culture makes him a respected figure in the swimming community.\
    Outside of coaching, Stefan enjoys sharing his knowledge through workshops and seminars, inspiring the next generation of swimmers and coaches alike. His vision for Neptunes Swimming Academy is not just about winning medals but also about building character, discipline, and lifelong friendships among athletes.\
    With Stefan Todorov at the helm, Neptunes Swimming Academy continues to be a beacon of hope and achievement in the world of competitive swimming."

    const pathName = usePathname();
    const teamName = pathName.split('/').pop();

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

    const checkAvailabilityRef = useRef(null)
    const coachRef = useRef(null)
    const [isDivVisible, setIsDivVisible] = useState(true); // Track visibility of the target div

    const images = [
    "https://swimmings.s3.us-east-2.amazonaws.com/poolOne.jpg",
    "https://swimmings.s3.us-east-2.amazonaws.com/neptuneLogo.jpeg",
    "https://swimmings.s3.us-east-2.amazonaws.com/poolThree.jpg",
    "https://swimmings.s3.us-east-2.amazonaws.com/poolTwo.jpeg",
    "https://swimmings.s3.us-east-2.amazonaws.com/poolTwo.jpeg"]

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

        <div
        className="relative flex flex-col items-center justify-center w-full"
        >
        <div
            className="relative w-screen h-[1px] bg-gray-200 mt-[18px]"
          />  

        <div className="w-full mt-[20px] text-[20px] font-bold mb-[10px]">
        {swimTeamName}
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

        <SwimClubDescription swimClubDescription={swimClubDescription}/>

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
                {swimTeamName}'s staff is fully certified and has passed all
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

      </DynamicScreen>
    </div>
  );
}
