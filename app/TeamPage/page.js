"use client";

import DynamicScreen from "../components/DynamicScreen";
import ImageViewer from "../components/ImageViewer";
import BookingPanel from "../components/TeamPageComps/LessonBookingPanel/BookingPanel";
import SwimClubDescription from "../components/SwimClubDescription";
import Map from "../components/TeamPageComps/Map"
import TopBar from "../components/TopBar";
import SafetyCertified from "../../public/SafetyCertified.svg"
import { useState } from "react";
import AmenitiesSection from "../components/TeamPageComps/AmenitiesSection";

export default function TeamPage() {

    const swimTeamName = "Neptunes Swimming Academy"
    const swimClubDescription="Neptunes Swimming Academy is a vibrant and inclusive swim club dedicated to nurturing swimmers of all ages and skill levels. Located in a picturesque setting, the academy offers comprehensive training programs that cater to children, teens, and adults alike. With a focus on developing essential swimming techniques, the academy emphasizes safety, fitness, and fun in the water. Experienced instructors provide personalized coaching, ensuring that each swimmer maximizes their potential while fostering a love for the sport. Whether you are a beginner looking to learn the basics or an advanced swimmer aiming to refine your skills, Neptunes Swimming Academy is the perfect place to dive in and make a splash."
    const programsAvailable = ["Learn to swim", "Competitive"]
    const classSizes= ["Group (4:1)", "Semi-Private (2:1)"]
    const coachPhoto="https://swimmings.s3.us-east-2.amazonaws.com/poolOne.jpg"
    const coachName="Coach Stefan Todorov"
    const locationAddress="115 Haynes Ave, Toronto, Ontario M3J0L8"
    const locationCoords = {"lat":40.748817,"long": -73.985428}
    const amenities = [1,2,4,5]

    const images = ["https://swimmings.s3.us-east-2.amazonaws.com/neptuneLogo.jpeg",
    "https://swimmings.s3.us-east-2.amazonaws.com/poolOne.jpg",
    "https://swimmings.s3.us-east-2.amazonaws.com/poolThree.jpg",
    "https://swimmings.s3.us-east-2.amazonaws.com/poolTwo.jpeg"]

    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slideDirection, setSlideDirection] = useState(null);
  
    const openModal = (index) => {
      setCurrentIndex(index);
      setIsOpen(true);
    };
  
    const closeModal = () => {
        console.log("HELLLO")
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
                    src={images[1]}
                    onClick={()=>{openModal(0)}}
                    className=
                    "  object-cover w-full h-full cursor-pointer
                    rounded-[15px]"

                    
                />
                </div>
            
                <div className="hidden sm:block w-[50%] h-full">
                <div className="grid grid-cols-2 gap-[10px] h-full">
                    {images.slice(0,4).map((image, index) => (
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

        <div className="flex space-x-[20px]">
        
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

        <div className="flex items-center space-x-[10px] mt-[10px]">
        <img
                    src={coachPhoto}
                    className=
                    " w-[50px] h-[50px] rounded-[100px]"
                />
            <div className="font-bold">
            {coachName}
            </div>
        </div>

        <div
            className="relative w-full h-[1px] bg-gray-200 mt-[18px]"
          />  

        <SwimClubDescription swimClubDescription={swimClubDescription}/>

        <div
            className="relative w-full h-[1px] bg-gray-200 mt-[8px]"
          />  

        {/* SAFETY CERTIFICATION SECTION */}
        <div className="flex items-center mt-[5px]">
        <SafetyCertified className="
        md:w-[180px]
        w-[180px] h-[100px] mt-[12px]"/>
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
            className="relative w-full h-[1px] bg-gray-200 mt-[12px]"
          />  

        {/* AMENITIES SECTION */}

        <AmenitiesSection amenities={amenities}/>

        <div
            className="relative w-full h-[1px] bg-gray-200 mt-[12px]"
          />  


        {/* MAP SECTION */}
        <div className="flex flex-col w-full mt-[20px]"/>
            <Map address={locationAddress} locationCoords={locationCoords}/>
        
        <div
            className=" w-full h-[1px] bg-gray-200 mt-[18px] mb-[20px]"
          />  
        
        <div className=" sm:hidden p-[20px] border border-gray-300 rounded-xl
        shadow-[0_0_10px_rgba(0,0,0,0.1)] ">
            
            <div className="mb-[10px] font-bold">
                Book your trial lesson
            </div>
            
            <div>
            <BookingPanel 
            />
            </div>

        </div>

        <div
            className=" w-full h-[1px] bg-gray-200 mt-[22px] mb-[100px]"
          />  

        </div>

        

        <div className="hidden sm:block p-[20px] w-[35%] border border-gray-300 rounded-xl
        shadow-[0_0_10px_rgba(0,0,0,0.1)] h-[260px]">
            
            <div className="mb-[10px] font-bold">
                Book your trial lesson
            </div>
            
            <div>
            <BookingPanel 
            />
            </div>
            

        </div>



        </div>
        
        

      </DynamicScreen>
    </div>
  );
}
